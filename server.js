const http = require("http");
const fs = require("fs");
const path = require("path");
const players = require("./players");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const LOBBY_TTL_MS = Number(process.env.LOBBY_TTL_MS || 1000 * 60 * 60 * 3);
const FINISHED_LOBBY_TTL_MS = Number(process.env.FINISHED_LOBBY_TTL_MS || 1000 * 60 * 2);
const CLEANUP_INTERVAL_MS = Number(process.env.CLEANUP_INTERVAL_MS || 1000 * 60 * 10);
const AUCTION_COUNTDOWN_MS = Number(process.env.AUCTION_COUNTDOWN_MS || 10000);
const AUCTION_DURATION_MS = Number(process.env.AUCTION_DURATION_MS || 10000);
const AUCTION_EXTEND_MS = Number(process.env.AUCTION_EXTEND_MS || 5000);
const botDifficultyRanges = {
  easy: [68, 76],
  normal: [72, 82],
  hard: [78, 88]
};
const tacticProfiles = {
  balanced: { attack: 1, defense: 1, shots: 1, cards: 1, penaltyMiss: 1 },
  pressing: { attack: 1.08, defense: 0.96, shots: 1.12, cards: 1.35, penaltyMiss: 1.02 },
  counter: { attack: 1.04, defense: 1.06, shots: 0.9, cards: 0.95, penaltyMiss: 0.95 },
  possession: { attack: 1.02, defense: 1.08, shots: 1.04, cards: 0.82, penaltyMiss: 0.9 },
  direct: { attack: 1.1, defense: 0.93, shots: 1.18, cards: 1.08, penaltyMiss: 1.1 },
  wide: { attack: 1.06, defense: 0.98, shots: 1.1, cards: 0.96, penaltyMiss: 1 },
  lowblock: { attack: 0.9, defense: 1.16, shots: 0.78, cards: 1.05, penaltyMiss: 0.92 }
};
const formationNeeds = {
  "4-3-3": ["POR", "DC", "DC", "TS", "TD", "MED", "CC", "CC", "AS", "AD", "ATT"],
  "4-4-2": ["POR", "DC", "DC", "TS", "TD", "CC", "CC", "AS", "AD", "ATT", "ATT"],
  "3-5-2": ["POR", "DC", "DC", "DC", "MED", "CC", "CC", "AS", "AD", "ATT", "ATT"],
  "4-2-3-1": ["POR", "DC", "DC", "TS", "TD", "MED", "MED", "AS", "COC", "AD", "ATT"],
  "3-4-3": ["POR", "DC", "DC", "DC", "CC", "CC", "AS", "AD", "AS", "AD", "ATT"]
};

const roleWeights = {
  POR: { goals: 0.02, assists: 0.02 },
  DC: { goals: 0.2, assists: 0.12 },
  TS: { goals: 0.18, assists: 0.38 },
  TD: { goals: 0.18, assists: 0.38 },
  MED: { goals: 0.42, assists: 0.55 },
  CC: { goals: 0.62, assists: 0.68 },
  COC: { goals: 0.92, assists: 1.02 },
  AS: { goals: 1.05, assists: 0.88 },
  AD: { goals: 1.05, assists: 0.88 },
  ATT: { goals: 1.35, assists: 0.46 }
};

const generatedNames = {
  first: ["Alex", "Marco", "Leo", "Samir", "Diego", "Nico", "Lucas", "Enzo", "Ivan", "Noah", "Milo", "Toni"],
  last: ["Rossi", "Costa", "Ferreira", "Marin", "Silva", "Moretti", "Kovac", "Ramos", "Greco", "Conti", "Bianchi", "Santos"]
};

const lobbies = new Map();
const PLAYER_INACTIVE_MS = Number(process.env.PLAYER_INACTIVE_MS || 1000 * 60 * 2);
const colors = ["#1e8e4d", "#2f80ed", "#d64545", "#f2a900", "#9b51e0", "#00a6a6", "#f26b38", "#5b6ee1"];
const botTeamNames = [
  "Bot City",
  "Virtual United",
  "Pixel Rovers",
  "AFC Algorithm",
  "Real Random",
  "Sporting Script",
  "Dynamic Eleven",
  "Synthetic FC",
  "Code Rangers",
  "Node Athletic",
  "Render Town",
  "Draft County",
  "Loop Wanderers",
  "Array Albion",
  "Binary Boca",
  "Cloud Dynamo",
  "Stack United",
  "Quantum Kickers",
  "Prompt FC",
  "Lambda Lions"
];

function now() {
  return Date.now();
}

function touchLobby(lobby) {
  lobby.updatedAt = now();
}

function cleanupLobbies() {
  const cutoff = now() - LOBBY_TTL_MS;
  const finishedCutoff = now() - FINISHED_LOBBY_TTL_MS;
  for (const [code, lobby] of lobbies.entries()) {
    if (lobby.status === "results" && (lobby.finishedAt || lobby.updatedAt || lobby.createdAt || 0) < finishedCutoff) {
      lobbies.delete(code);
      continue;
    }
    if ((lobby.updatedAt || lobby.createdAt || 0) < cutoff) {
      lobbies.delete(code);
    }
  }
}

function json(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function clamp(value, min, max) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return min;
  return Math.min(max, Math.max(min, parsed));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

const starPlayerChance = 0.2;
const starOverallMultiplier = 1.15;
const starRepartoBonus = 0.03;

function applyStarPlayerTrait(player, isStarPlayer) {
  const baseOverall = player.baseOverall || player.overall;
  if (!isStarPlayer) return { ...player, baseOverall, starPlayer: false };
  return {
    ...player,
    baseOverall,
    overall: Math.min(100, Math.round(baseOverall * starOverallMultiplier)),
    starPlayer: true,
    starBonus: starRepartoBonus
  };
}

function applyStarPlayersToPool(pool) {
  const maxNonConsecutive = Math.ceil(pool.length / 2);
  const starCount = Math.min(maxNonConsecutive, Math.max(pool.length >= 8 ? 1 : 0, Math.round(pool.length * starPlayerChance)));
  const starIndexes = new Set();
  shuffle([...pool.keys()]).forEach((index) => {
    if (starIndexes.size >= starCount) return;
    if (starIndexes.has(index - 1) || starIndexes.has(index + 1)) return;
    starIndexes.add(index);
  });
  return pool.map((player, index) => applyStarPlayerTrait(player, starIndexes.has(index)));
}

function repartoForRole(role) {
  if (["POR", "DC", "TS", "TD"].includes(role)) return "defense";
  if (["MED", "CC", "COC"].includes(role)) return "midfield";
  return "attack";
}

function buildBalancedAuctionPool(sourcePlayers, rounds, formations = []) {
  const target = Math.min(rounds, sourcePlayers.length);
  const guidedTarget = Math.max(0, Math.min(target, Math.round(target * 0.7)));
  const selected = [];
  const selectedNames = new Set();
  const validFormations = formations.filter((formation) => formationNeeds[formation]);
  const roleDemand = {};
  const demandRoles = validFormations.length
    ? validFormations.flatMap((formation) => formationNeeds[formation])
    : formationNeeds["4-3-3"];

  demandRoles.forEach((role) => {
    roleDemand[role] = (roleDemand[role] || 0) + 1;
  });

  const demandTotal = Object.values(roleDemand).reduce((sum, count) => sum + count, 0);
  const roleTargets = Object.fromEntries(
    Object.entries(roleDemand).map(([role, count]) => [role, Math.max(0, Math.round((count / demandTotal) * guidedTarget))])
  );

  while (Object.values(roleTargets).reduce((sum, count) => sum + count, 0) > guidedTarget) {
    const role = Object.entries(roleTargets).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (!role) break;
    roleTargets[role] -= 1;
  }
  while (Object.values(roleTargets).reduce((sum, count) => sum + count, 0) < guidedTarget) {
    const role = Object.entries(roleDemand).sort((a, b) => b[1] - a[1])[0][0];
    roleTargets[role] += 1;
  }

  Object.entries(roleTargets).forEach(([role, desired]) => {
    const pool = shuffle(sourcePlayers.filter((player) => player.role === role));
    while (pool.length && selected.filter((player) => player.role === role).length < desired) {
      const player = pool.pop();
      if (!selectedNames.has(player.name)) {
        selected.push(player);
        selectedNames.add(player.name);
      }
    }
  });

  shuffle(sourcePlayers).forEach((player) => {
    if (selected.length < target && !selectedNames.has(player.name)) {
      selected.push(player);
      selectedNames.add(player.name);
    }
  });
  return applyStarPlayersToPool(shuffle(selected));
}

function code() {
  let value = "";
  do {
    value = Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (lobbies.has(value));
  return value;
}

function nextColor(lobby) {
  const used = new Set((lobby?.managers || []).map((manager) => manager.color));
  return colors.find((color) => !used.has(color)) || colors[Math.floor(Math.random() * colors.length)];
}

function newPlayer(name, credits, formation, isHost = false, color = colors[0]) {
  return {
    id: Math.random().toString(36).slice(2, 12),
    name: String(name || "Manager").slice(0, 18),
    credits,
    squad: [],
    lineup: {},
    formation,
    tactic: "balanced",
    ready: false,
    isHost,
    isBot: false,
    color,
    lastSeen: now(),
    stats: emptyStats()
  };
}

function emptyStats() {
  return { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 };
}

function emptyPlayerStats() {
  return { goals: 0, assists: 0 };
}

function publicLobby(lobby, playerId) {
  if (lobby.status !== "results") touchLobby(lobby);
  markSeen(lobby, playerId);
  updateAuction(lobby);
  if (lobby.status === "results" && playerId) {
    if (!Array.isArray(lobby.resultSeenBy)) lobby.resultSeenBy = [];
    if (!lobby.resultSeenBy.includes(playerId)) lobby.resultSeenBy.push(playerId);
  }
  const snapshot = {
    code: lobby.code,
    status: lobby.status,
    settings: lobby.settings,
    playerId,
    hostId: lobby.hostId,
    auction: lobby.auction,
    currentPlayer: lobby.auction.index < lobby.pool.length ? lobby.pool[lobby.auction.index] : null,
    managers: lobby.managers.map((manager) => ({
      ...manager,
      isUser: manager.id === playerId,
      online: manager.isBot || now() - (manager.lastSeen || 0) < PLAYER_INACTIVE_MS
    })),
    log: lobby.log.slice(-30).reverse(),
    results: lobby.results
  };
  if (lobby.status === "results") {
    const humanIds = lobby.managers.filter((manager) => !manager.isBot).map((manager) => manager.id);
    const deliveredToAll = humanIds.every((id) => lobby.resultSeenBy?.includes(id));
    if (deliveredToAll) lobbies.delete(lobby.code);
  }
  return snapshot;
}

function markSeen(lobby, playerId) {
  const manager = lobby.managers.find((item) => item.id === playerId);
  if (manager) manager.lastSeen = now();
}

function startAuction(lobby) {
  lobby.status = "countdown";
  lobby.finishedAt = null;
  lobby.auction.index = 0;
  lobby.auction.currentBid = 0;
  lobby.auction.leaderId = null;
  lobby.auction.countdownEndsAt = Date.now() + AUCTION_COUNTDOWN_MS;
  lobby.auction.endsAt = 0;
  lobby.log.push("Countdown asta avviato dall'host");
}

function updateAuction(lobby) {
  if (lobby.status === "countdown" && Date.now() >= lobby.auction.countdownEndsAt) {
    lobby.status = "auction";
    lobby.auction.endsAt = Date.now() + AUCTION_DURATION_MS;
    lobby.log.push("Asta iniziata");
  }
  if (lobby.status !== "auction") return;
  while (lobby.status === "auction" && Date.now() >= lobby.auction.endsAt) {
    closeAuction(lobby);
  }
}

function closeAuction(lobby) {
  const player = lobby.pool[lobby.auction.index];
  if (!player) {
    lobby.status = "squad";
    lobby.log.push("Asta terminata. Preparare la rosa.");
    return;
  }

  if (lobby.auction.leaderId) {
    const winner = lobby.managers.find((manager) => manager.id === lobby.auction.leaderId);
    if (winner) {
      winner.credits -= lobby.auction.currentBid;
      winner.squad.push({ ...player, uid: `p-${Math.random().toString(36).slice(2, 10)}`, price: lobby.auction.currentBid, generated: false, stats: emptyPlayerStats() });
      lobby.log.push(`${player.name} venduto a ${winner.name} per ${lobby.auction.currentBid}`);
    }
  } else {
    lobby.log.push(`${player.name} resta senza squadra`);
  }

  lobby.auction.index += 1;
  lobby.auction.currentBid = 0;
  lobby.auction.leaderId = null;

  if (lobby.auction.index >= lobby.pool.length) {
    lobby.status = "squad";
    lobby.log.push("Asta terminata. Preparare la rosa.");
  } else {
    lobby.auction.endsAt = Date.now() + AUCTION_DURATION_MS;
  }
}

function placeBid(lobby, playerId, increment) {
  updateAuction(lobby);
  if (lobby.status !== "auction") return false;
  const manager = lobby.managers.find((item) => item.id === playerId);
  const amount = lobby.auction.currentBid + clamp(increment, 1, 25);
  if (!manager || lobby.auction.leaderId === playerId || amount > manager.credits) return false;
  lobby.auction.currentBid = amount;
  lobby.auction.leaderId = playerId;
  if (lobby.auction.endsAt - Date.now() < AUCTION_EXTEND_MS) {
    lobby.auction.endsAt = Date.now() + AUCTION_EXTEND_MS;
  }
  return true;
}

function buildLineup(manager, formation) {
  if (manager.lineup && Object.keys(manager.lineup).length) {
    const used = new Set(Object.values(manager.lineup));
    return formationNeeds[formation].map((role, index) => {
      const priorSameRole = formationNeeds[formation].slice(0, index).filter((slotRole) => slotRole === role).length;
      const slotId = `${role}-${priorSameRole + 1}`;
      const playerId = manager.lineup[slotId];
      return manager.squad.find((player) => player.uid === playerId || player.name === playerId) || null;
    });
  }
  const available = [...manager.squad].sort((a, b) => b.overall - a.overall);
  return formationNeeds[formation].map((role) => {
    const index = available.findIndex((player) => player.role === role);
    if (index === -1) return null;
    return available.splice(index, 1)[0];
  });
}

function buildLineupSlots(manager, formation) {
  const slots = getLineupSlots(formation);
  const players = buildLineup(manager, formation);
  return slots.map((slot, index) => ({ ...slot, player: players[index] || null }));
}

function getLineupSlots(formation) {
  return formationNeeds[formation].map((role, index) => {
    const priorSameRole = formationNeeds[formation].slice(0, index).filter((slotRole) => slotRole === role).length;
    return { id: `${role}-${priorSameRole + 1}`, role };
  });
}

function fillVacancies(lobby, playerId) {
  const manager = lobby.managers.find((item) => item.id === playerId);
  if (!manager) return 0;
  const formation = manager.formation || lobby.settings.formation;
  if (!manager.lineup || !Object.keys(manager.lineup).length) {
    const starters = buildLineup(manager, formation);
    manager.lineup = {};
    getLineupSlots(formation).forEach((slot, index) => {
      const player = starters[index];
      if (player) manager.lineup[slot.id] = player.uid || player.name;
    });
  }
  const starters = buildLineup(manager, formation);
  const slots = getLineupSlots(formation);
  const missing = [];
  starters.forEach((player, index) => {
    if (!player) missing.push(slots[index]);
  });
  missing.forEach((slot) => {
    const player = makeGenerated(slot.role);
    manager.squad.push(player);
    manager.lineup[slot.id] = player.uid;
  });
  manager.ready = false;
  return missing.length;
}

function makeGenerated(role) {
  const first = generatedNames.first[Math.floor(Math.random() * generatedNames.first.length)];
  const last = generatedNames.last[Math.floor(Math.random() * generatedNames.last.length)];
  return {
    name: `${first} ${last}`,
    role,
    uid: `gen-${Math.random().toString(36).slice(2, 10)}`,
    nation: "Academy",
    age: 18 + Math.floor(Math.random() * 15),
    overall: 60 + Math.floor(Math.random() * 16),
    price: 0,
    generated: true,
    stats: emptyPlayerStats()
  };
}

function markReady(lobby, playerId, tactic, lineup = null) {
  const manager = lobby.managers.find((item) => item.id === playerId);
  if (!manager) return;
  fillVacancies(lobby, playerId);
  manager.tactic = tactic || "balanced";
  manager.lineup = lineup && typeof lineup === "object" ? lineup : manager.lineup || {};
  manager.ready = true;
}

function simulate(lobby) {
  addSimulationBots(lobby);
  lobby.managers.forEach((manager) => {
    manager.stats = emptyStats();
    manager.squad.forEach((player) => {
      player.stats = emptyPlayerStats();
    });
  });

  const rounds = [];
  buildCalendarRounds(lobby.managers).forEach((matches, index) => {
    const playedMatches = matches.map(([home, away]) => playMatch(lobby, home, away));
    rounds.push({ round: index + 1, matches: playedMatches, standings: tableSnapshot(lobby.managers) });
  });

  const standings = [...lobby.managers].sort((a, b) => {
    const gdA = a.stats.gf - a.stats.ga;
    const gdB = b.stats.gf - b.stats.ga;
    return b.stats.points - a.stats.points || gdB - gdA || b.stats.gf - a.stats.gf;
  });
  const playerStats = lobby.managers
    .flatMap((manager) => manager.squad.map((player) => ({ ...player, team: manager.name })))
    .sort((a, b) => b.stats.goals - a.stats.goals || b.stats.assists - a.stats.assists || b.overall - a.overall)
    .slice(0, 10);
  lobby.results = { standings, playerStats, rounds, skipResolved: false };
  lobby.status = "results";
  lobby.finishedAt = now();
  lobby.resultSeenBy = [];
  lobby.log.push("Campionato simulato. Risultati disponibili.");
}

function buildCalendarRounds(managers) {
  const teams = [...managers];
  if (teams.length % 2 === 1) teams.push(null);
  const roundsPerLeg = teams.length - 1;
  const half = teams.length / 2;
  const firstLeg = [];
  let rotation = [...teams];

  for (let round = 0; round < roundsPerLeg; round += 1) {
    const matches = [];
    for (let i = 0; i < half; i += 1) {
      const a = rotation[i];
      const b = rotation[rotation.length - 1 - i];
      if (a && b) {
        matches.push(round % 2 === 0 ? [a, b] : [b, a]);
      }
    }
    firstLeg.push(matches);
    rotation = [rotation[0], rotation[rotation.length - 1], ...rotation.slice(1, rotation.length - 1)];
  }

  const secondLeg = firstLeg.map((matches) => matches.map(([home, away]) => [away, home]));
  return [...firstLeg, ...secondLeg];
}

function addSimulationBots(lobby) {
  if (lobby.botsAdded) return;
  const botCount = clamp(lobby.settings.botCount || 0, 0, 20);
  for (let i = 0; i < botCount; i += 1) {
    const bot = newPlayer(botTeamNames[i] || `Bot ${i + 1}`, lobby.settings.credits, lobby.settings.formation, false, colors[i % colors.length]);
    bot.id = `bot-${i + 1}-${Math.random().toString(36).slice(2, 7)}`;
    bot.isBot = true;
    bot.ready = true;
    bot.squad = formationNeeds[lobby.settings.formation].map((role) => makeBotPlayer(role, lobby.settings.botDifficulty));
    lobby.managers.push(bot);
  }
  lobby.botsAdded = true;
}

function makeBotPlayer(role, difficulty = "normal") {
  const generated = makeGenerated(role);
  const [min, max] = botDifficultyRanges[difficulty] || botDifficultyRanges.normal;
  generated.overall = min + Math.floor(Math.random() * (max - min + 1));
  generated.name = `Bot ${generated.name}`;
  return generated;
}

function playMatch(lobby, home, away) {
  const homeStrength = teamStrength(lobby, home);
  const awayStrength = teamStrength(lobby, away);
  const homeTactic = tacticProfiles[home.tactic] || tacticProfiles.balanced;
  const awayTactic = tacticProfiles[away.tactic] || tacticProfiles.balanced;
  const homeGap = homeStrength.attack - awayStrength.defense;
  const awayGap = awayStrength.attack - homeStrength.defense;
  const homeTotalGap = homeGap + (homeStrength.midfield - awayStrength.midfield) * 0.16;
  const awayTotalGap = awayGap + (awayStrength.midfield - homeStrength.midfield) * 0.16;
  const homeGoals = sampleGoals(clampExpectedGoals(1.05 + homeTotalGap / 38 + 0.25), homeTotalGap);
  const awayGoals = sampleGoals(clampExpectedGoals(0.92 + awayTotalGap / 38), awayTotalGap);
  const events = [];
  for (let i = 0; i < homeGoals; i += 1) events.push(assignGoal(lobby, home, home.name));
  for (let i = 0; i < awayGoals; i += 1) events.push(assignGoal(lobby, away, away.name));
  updateStats(home, homeGoals, awayGoals);
  updateStats(away, awayGoals, homeGoals);
  return {
    home: home.name,
    away: away.name,
    homeGoals,
    awayGoals,
    events: events.filter(Boolean).sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10)),
    shots: {
      home: Math.max(homeGoals + 2, sampleShots(homeStrength.attack, homeTactic)),
      away: Math.max(awayGoals + 2, sampleShots(awayStrength.attack, awayTactic))
    }
  };
}

function teamStrength(lobby, manager) {
  const formation = manager.formation || lobby.settings.formation;
  const lineup = buildLineupSlots(manager, formation);
  const starters = lineup.filter((slot) => slot.player);
  if (!starters.length) return { attack: 50, midfield: 50, defense: 50, keeper: 50, base: 50 };
  const repartoBonuses = { attack: 0, midfield: 0, defense: 0 };
  starters.forEach((slot) => {
    if (slot.player.starPlayer) repartoBonuses[repartoForRole(slot.role)] += slot.player.starBonus || starRepartoBonus;
  });
  const ratedSlots = starters.map((slot) => {
    const reparto = repartoForRole(slot.role);
    return { ...slot, effective: effectiveOverall(slot.player, slot.role) * (1 + repartoBonuses[reparto]) };
  });
  const values = ratedSlots.map((slot) => slot.effective);
  const avg = values.reduce((sum, value) => sum + value, 0) / starters.length;
  const used = new Set(starters.map((slot) => slot.player.uid || slot.player.name));
  const bench = manager.squad.filter((player) => !used.has(player.uid || player.name)).sort((a, b) => b.overall - a.overall).slice(0, 7);
  const depth = bench.length ? bench.reduce((sum, player) => sum + player.overall, 0) / bench.length : avg;
  const attackingRoles = ["ATT", "AS", "AD", "COC"];
  const attackSlots = ratedSlots.filter((slot) => attackingRoles.includes(slot.role));
  const midfieldSlots = ratedSlots.filter((slot) => ["MED", "CC", "COC"].includes(slot.role));
  const defenseSlots = ratedSlots.filter((slot) => ["DC", "TS", "TD"].includes(slot.role));
  const keeperSlot = ratedSlots.find((slot) => slot.role === "POR");
  const averageOr = (items, fallback) => (items.length ? items.reduce((sum, item) => sum + item.effective, 0) / items.length : fallback);
  const attackLine = averageOr(attackSlots, avg);
  const midfieldLine = averageOr(midfieldSlots, avg);
  const defenseLine = averageOr(defenseSlots, avg);
  const keeper = keeperSlot?.effective || defenseLine;
  const individualPeak = Math.max(...attackSlots.map((slot) => slot.effective), avg);
  const tactic = tacticProfiles[manager.tactic] || tacticProfiles.balanced;
  const base = avg * 0.76 + depth * 0.09 + individualPeak * 0.15;
  return {
    attack: (attackLine * 0.62 + midfieldLine * 0.23 + individualPeak * 0.15) * tactic.attack,
    midfield: midfieldLine,
    defense: (defenseLine * 0.62 + keeper * 0.25 + midfieldLine * 0.13) * tactic.defense,
    keeper,
    base
  };
}

function effectiveOverall(player, slotRole) {
  if (!player) return 0;
  if (player.role === slotRole) return player.overall;
  const compatible = {
    TS: ["DC", "AS"],
    TD: ["DC", "AD"],
    DC: ["TS", "TD", "MED"],
    MED: ["CC", "DC"],
    CC: ["MED", "COC"],
    COC: ["CC", "ATT"],
    AS: ["AD", "ATT", "TS"],
    AD: ["AS", "ATT", "TD"],
    ATT: ["AS", "AD", "COC"],
    POR: []
  };
  return Math.max(45, player.overall - (compatible[player.role]?.includes(slotRole) ? 5 : 12));
}

function clampExpectedGoals(value) {
  return Math.min(2.65, Math.max(0.25, value));
}

function sampleGoals(expected, strengthGap = 0) {
  const limit = strengthGap > 22 ? 5 : strengthGap > 12 ? 4 : 3;
  const lambda = Math.min(expected, limit === 3 ? 2.05 : 2.45);
  let goals = 0;
  let probability = Math.exp(-lambda);
  let cumulative = probability;
  const roll = Math.random();
  while (roll > cumulative && goals < limit) {
    goals += 1;
    probability *= lambda / goals;
    cumulative += probability;
  }
  return goals;
}

function assignGoal(lobby, manager, teamName) {
  const starters = buildLineupSlots(manager, manager.formation || lobby.settings.formation).filter((slot) => slot.player && slot.role !== "POR");
  const scorer = weightedPick(starters, "goals");
  if (!scorer) return;
  scorer.stats.goals += 1;
  const minute = 1 + Math.floor(Math.random() * 90);
  const text = `${minute}' ${scorer.name}`;
  const assistPool = starters.filter((slot) => slot.player !== scorer && slot.role !== "POR");
  if (assistPool.length && Math.random() < 0.78) {
    const assister = weightedPick(assistPool, "assists");
    assister.stats.assists += 1;
  }
  return text;
}

function sampleShots(strength, tactic = tacticProfiles.balanced) {
  return Math.max(1, Math.round((5 + Math.random() * 8 + Math.max(0, strength - 70) / 5) * tactic.shots));
}

function tableSnapshot(managers) {
  return [...managers]
    .sort((a, b) => b.stats.points - a.stats.points || (b.stats.gf - b.stats.ga) - (a.stats.gf - a.stats.ga) || b.stats.gf - a.stats.gf)
    .map((manager) => ({ id: manager.id, name: manager.name, color: manager.color, isBot: manager.isBot, stats: { ...manager.stats } }));
}

function weightedPick(items, type) {
  const weighted = items.map((item) => {
    const player = item.player || item;
    const role = item.role || player.role;
    const effective = item.player ? effectiveOverall(player, role) : player.overall;
    const roleWeight = roleWeights[role]?.[type] || 0.4;
    const ratingFactor = Math.max(0.25, Math.pow(effective / 82, type === "goals" ? 3.1 : 2.4));
    return { player, weight: Math.max(0.02, roleWeight * ratingFactor) };
  });
  let cursor = Math.random() * weighted.reduce((sum, item) => sum + item.weight, 0);
  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.player;
  }
  return weighted[0]?.player;
}

function updateStats(manager, gf, ga) {
  manager.stats.played += 1;
  manager.stats.gf += gf;
  manager.stats.ga += ga;
  if (gf > ga) {
    manager.stats.won += 1;
    manager.stats.points += 3;
  } else if (gf === ga) {
    manager.stats.drawn += 1;
    manager.stats.points += 1;
  } else {
    manager.stats.lost += 1;
  }
  manager.squad.forEach((player) => {
    if (!player.stats) player.stats = emptyPlayerStats();
  });
}

async function handleApi(req, res, parts, url) {
  const body = await readBody(req);
  if (req.method === "POST" && parts[1] === "lobbies" && parts.length === 2) {
    const settings = {
      credits: clamp(body.credits || 650, 250, 1200),
      rounds: clamp(body.rounds || 24, 12, players.length),
      formation: formationNeeds[body.formation] ? body.formation : "4-3-3",
      botCount: clamp(body.botCount || 0, 0, 20),
      botDifficulty: botDifficultyRanges[body.botDifficulty] ? body.botDifficulty : "normal"
    };
    const lobbyCode = code();
    const host = newPlayer(body.name, settings.credits, settings.formation, true, colors[0]);
    const lobby = {
      code: lobbyCode,
      hostId: host.id,
      status: "lobby",
      settings,
      managers: [host],
      pool: buildBalancedAuctionPool(players, settings.rounds, [host.formation]),
      auction: { index: 0, currentBid: 0, leaderId: null, endsAt: 0 },
      log: [],
      results: null,
      finishedAt: null,
      resultSeenBy: [],
      skipVotes: [],
      createdAt: now(),
      updatedAt: now()
    };
    lobbies.set(lobbyCode, lobby);
    return json(res, 200, { code: lobbyCode, playerId: host.id });
  }

  const lobby = lobbies.get(parts[2]);
  if (!lobby) return json(res, 404, { error: "Lobby non trovata" });
  if (lobby.status !== "results") touchLobby(lobby);

  if (req.method === "POST" && parts[3] === "join") {
    if (lobby.status !== "lobby") return json(res, 400, { error: "Asta gia iniziata" });
    const managerFormation = formationNeeds[body.formation] ? body.formation : lobby.settings.formation;
    const manager = newPlayer(body.name, lobby.settings.credits, managerFormation, false, nextColor(lobby));
    lobby.managers.push(manager);
    lobby.log.push(`${manager.name} entra in lobby`);
    return json(res, 200, { code: lobby.code, playerId: manager.id });
  }

  if (req.method === "GET" && parts.length === 3) {
    return json(res, 200, publicLobby(lobby, url.searchParams.get("playerId")));
  }

  const playerId = body.playerId;
  if (req.method === "POST" && parts[3] === "start") {
    if (playerId !== lobby.hostId) return json(res, 403, { error: "Solo host" });
    const humanManagers = lobby.managers.filter((manager) => !manager.isBot);
    if (humanManagers.length < 2 && (lobby.settings.botCount || 0) <= 0) return json(res, 400, { error: "Serve almeno un amico o un bot" });
    const notReady = humanManagers.filter((manager) => !manager.ready);
    if (notReady.length) return json(res, 400, { error: `Non pronti: ${notReady.map((manager) => manager.name).join(", ")}` });
    lobby.managers.forEach((manager) => {
      manager.ready = false;
      manager.squad = [];
      manager.lineup = {};
      manager.tactic = "balanced";
      manager.credits = lobby.settings.credits;
    });
    lobby.skipVotes = [];
    lobby.results = null;
    lobby.pool = buildBalancedAuctionPool(players, lobby.settings.rounds, lobby.managers.filter((manager) => !manager.isBot).map((manager) => manager.formation || lobby.settings.formation));
    startAuction(lobby);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "settings") {
    if (playerId !== lobby.hostId || lobby.status !== "lobby") return json(res, 403, { error: "Solo host in lobby" });
    lobby.settings.credits = clamp(body.credits, 250, 1200);
    lobby.settings.rounds = clamp(body.rounds, 12, players.length);
    lobby.settings.botCount = clamp(body.botCount || 0, 0, Math.max(0, 20 - lobby.managers.filter((manager) => !manager.isBot).length));
    lobby.settings.botDifficulty = botDifficultyRanges[body.botDifficulty] ? body.botDifficulty : lobby.settings.botDifficulty || "normal";
    lobby.settings.formation = formationNeeds[body.formation] ? body.formation : lobby.settings.formation;
    lobby.pool = buildBalancedAuctionPool(players, lobby.settings.rounds, lobby.managers.filter((manager) => !manager.isBot).map((manager) => manager.formation || lobby.settings.formation));
    lobby.managers.forEach((manager) => {
      manager.credits = lobby.settings.credits;
      manager.ready = false;
      if (!formationNeeds[manager.formation]) manager.formation = lobby.settings.formation;
    });
    lobby.log.push("Impostazioni lobby aggiornate");
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "profile") {
    const manager = lobby.managers.find((item) => item.id === playerId);
    if (!manager || lobby.status !== "lobby") return json(res, 400, { error: "Manager non valido" });
    const colorTaken = lobby.managers.some((item) => item.id !== manager.id && item.color === body.color);
    if (colors.includes(body.color) && !colorTaken) manager.color = body.color;
    if (formationNeeds[body.formation] && body.formation !== manager.formation) {
      manager.formation = body.formation;
      lobby.pool = buildBalancedAuctionPool(players, lobby.settings.rounds, lobby.managers.filter((item) => !item.isBot).map((item) => item.formation || lobby.settings.formation));
      manager.ready = false;
    }
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "lobby-ready") {
    const manager = lobby.managers.find((item) => item.id === playerId);
    if (!manager || lobby.status !== "lobby") return json(res, 400, { error: "Manager non valido" });
    manager.ready = Boolean(body.ready);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "bid") {
    placeBid(lobby, playerId, body.increment);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "fill") {
    if (lobby.status !== "squad") return json(res, 400, { error: "Asta non ancora terminata" });
    fillVacancies(lobby, playerId);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "ready") {
    if (lobby.status !== "squad") return json(res, 400, { error: "Asta non ancora terminata" });
    markReady(lobby, playerId, body.tactic, body.lineup);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "lineup") {
    if (lobby.status !== "squad") return json(res, 400, { error: "Asta non ancora terminata" });
    const manager = lobby.managers.find((item) => item.id === playerId);
    if (!manager) return json(res, 400, { error: "Manager non valido" });
    manager.lineup = body.lineup && typeof body.lineup === "object" ? body.lineup : manager.lineup || {};
    if (body.tactic) manager.tactic = body.tactic;
    manager.ready = false;
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "simulate") {
    if (playerId !== lobby.hostId) return json(res, 403, { error: "Solo host" });
    if (lobby.status !== "squad") return json(res, 400, { error: "Rosa non pronta" });
    if (!lobby.managers.every((manager) => manager.ready)) return json(res, 400, { error: "Tutti devono essere pronti" });
    simulate(lobby);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "skip") {
    if (!lobby.skipVotes.includes(playerId)) lobby.skipVotes.push(playerId);
    const required = Math.floor(lobby.managers.filter((manager) => !manager.isBot).length / 2) + 1;
    if (lobby.results && lobby.skipVotes.length >= required) {
      lobby.results.skipResolved = true;
      lobby.log.push("Skip simulazione approvato");
    }
    return json(res, 200, { skipVotes: lobby.skipVotes.length, required, skipResolved: Boolean(lobby.results?.skipResolved) });
  }
  return json(res, 404, { error: "Endpoint non trovato" });
}

function serveStatic(req, res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(ROOT, safePath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end();
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    const mimeTypes = {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".svg": "image/svg+xml"
    };
    const type = mimeTypes[ext] || "application/octet-stream";
    const cacheControl = ext === ".html" ? "no-cache, no-store, must-revalidate" : "public, max-age=3600";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": cacheControl });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  cleanupLobbies();
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "api") {
    handleApi(req, res, parts, url);
    return;
  }
  serveStatic(req, res, url.pathname);
});

setInterval(cleanupLobbies, CLEANUP_INTERVAL_MS).unref();

server.listen(PORT, "0.0.0.0", () => {
  console.log(`FTBALL Friends multiplayer server: http://0.0.0.0:${PORT}`);
  console.log(`Temporary lobby TTL: ${Math.round(LOBBY_TTL_MS / 60000)} minutes`);
});


