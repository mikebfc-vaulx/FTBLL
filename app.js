const players = playerDatabase;

const difficulties = {
  easy: { label: "Facile", credits: 720, rivals: 2, aiAggression: 0.78, rounds: 20 },
  normal: { label: "Normale", credits: 650, rivals: 3, aiAggression: 0.96, rounds: 24 },
  hard: { label: "Difficile", credits: 590, rivals: 4, aiAggression: 1.08, rounds: 28 },
  expert: { label: "Esperto", credits: 540, rivals: 5, aiAggression: 1.16, rounds: 32 }
};

const formationNeeds = {
  "4-3-3": ["POR", "DC", "DC", "TS", "TD", "MED", "CC", "CC", "AS", "AD", "ATT"],
  "4-4-2": ["POR", "DC", "DC", "TS", "TD", "CC", "CC", "AS", "AD", "ATT", "ATT"],
  "3-5-2": ["POR", "DC", "DC", "DC", "MED", "CC", "CC", "AS", "AD", "ATT", "ATT"],
  "4-2-3-1": ["POR", "DC", "DC", "TS", "TD", "MED", "MED", "AS", "COC", "AD", "ATT"],
  "3-4-3": ["POR", "DC", "DC", "DC", "CC", "CC", "AS", "AD", "AS", "AD", "ATT"]
};

const formationSlots = {
  "4-3-3": [
    ["POR", 50, 91], ["TS", 19, 72], ["DC", 39, 72], ["DC", 61, 72], ["TD", 81, 72],
    ["MED", 50, 55], ["CC", 34, 43], ["CC", 66, 43], ["AS", 24, 22], ["ATT", 50, 14], ["AD", 76, 22]
  ],
  "4-4-2": [
    ["POR", 50, 91], ["TS", 19, 72], ["DC", 39, 72], ["DC", 61, 72], ["TD", 81, 72],
    ["AS", 21, 45], ["CC", 42, 45], ["CC", 58, 45], ["AD", 79, 45], ["ATT", 40, 18], ["ATT", 60, 18]
  ],
  "3-5-2": [
    ["POR", 50, 91], ["DC", 30, 72], ["DC", 50, 75], ["DC", 70, 72], ["AS", 17, 47],
    ["MED", 50, 55], ["CC", 37, 42], ["CC", 63, 42], ["AD", 83, 47], ["ATT", 40, 18], ["ATT", 60, 18]
  ],
  "4-2-3-1": [
    ["POR", 50, 91], ["TS", 19, 72], ["DC", 39, 72], ["DC", 61, 72], ["TD", 81, 72],
    ["MED", 42, 55], ["MED", 58, 55], ["AS", 24, 34], ["COC", 50, 31], ["AD", 76, 34], ["ATT", 50, 14]
  ],
  "3-4-3": [
    ["POR", 50, 91], ["DC", 30, 72], ["DC", 50, 75], ["DC", 70, 72], ["AS", 22, 47],
    ["CC", 42, 47], ["CC", 58, 47], ["AD", 78, 47], ["AS", 25, 20], ["ATT", 50, 13], ["AD", 75, 20]
  ]
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

const playerColors = ["#1e8e4d", "#2f80ed", "#d64545", "#f2a900", "#9b51e0", "#00a6a6", "#f26b38", "#5b6ee1"];
const tacticProfiles = {
  balanced: { attack: 1, defense: 1, shots: 1, cards: 1, penaltyMiss: 1 },
  pressing: { attack: 1.08, defense: 0.96, shots: 1.12, cards: 1.35, penaltyMiss: 1.02 },
  counter: { attack: 1.04, defense: 1.06, shots: 0.9, cards: 0.95, penaltyMiss: 0.95 },
  possession: { attack: 1.02, defense: 1.08, shots: 1.04, cards: 0.82, penaltyMiss: 0.9 },
  direct: { attack: 1.1, defense: 0.93, shots: 1.18, cards: 1.08, penaltyMiss: 1.1 },
  wide: { attack: 1.06, defense: 0.98, shots: 1.1, cards: 0.96, penaltyMiss: 1 },
  lowblock: { attack: 0.9, defense: 1.16, shots: 0.78, cards: 1.05, penaltyMiss: 0.92 }
};

const state = {
  view: "home",
  mode: "single",
  config: null,
  managers: [],
  auctionPool: [],
  playerIndex: 0,
  calledCount: 0,
  currentBid: 0,
  leaderId: null,
  timeLeft: 10,
  running: false,
  tickId: null,
  simulation: null,
  lineupAssignments: {},
  liveSimulation: {
    timer: null,
    roundIndex: 0,
    rounds: []
  },
  lobbyUsedColors: [],
  lobbySettingsDirty: false,
  lobbySettingsSaving: false,
  selectedLineupPlayerId: null,
  pendingTactic: null,
  multiplayer: {
    code: null,
    playerId: null,
    hostId: null,
    isHost: false,
    pollId: null
  }
};

const $ = (id) => document.getElementById(id);

const views = {
  home: $("homeView"),
  multi: $("multiView"),
  lobby: $("lobbyView"),
  setup: $("setupView"),
  game: $("gameView"),
  squad: $("squadView"),
  results: $("resultsView"),
  live: $("liveSimView")
};

function showView(name) {
  Object.values(views).forEach((view) => view.classList.remove("active"));
  views[name].classList.add("active");
  state.view = name;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

const starPlayerChance = 0.1;
const starOverallMultiplier = 1.15;
const starRepartoBonus = 0.03;

function applyStarPlayerChance(player) {
  const baseOverall = player.baseOverall || player.overall;
  if (Math.random() >= starPlayerChance) return { ...player, baseOverall, starPlayer: false };
  return {
    ...player,
    baseOverall,
    overall: Math.min(100, Math.round(baseOverall * starOverallMultiplier)),
    starPlayer: true,
    starBonus: starRepartoBonus
  };
}

function repartoForRole(role) {
  if (["POR", "DC", "TS", "TD"].includes(role)) return "defense";
  if (["MED", "CC", "COC"].includes(role)) return "midfield";
  return "attack";
}

function buildBalancedAuctionPool(sourcePlayers, rounds, formations = []) {
  const target = Math.min(rounds, sourcePlayers.length);
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
    Object.entries(roleDemand).map(([role, count]) => [role, Math.max(1, Math.round((count / demandTotal) * target))])
  );

  while (Object.values(roleTargets).reduce((sum, count) => sum + count, 0) > target) {
    const role = Object.entries(roleTargets).sort((a, b) => b[1] - a[1])[0][0];
    roleTargets[role] -= 1;
  }
  while (Object.values(roleTargets).reduce((sum, count) => sum + count, 0) < target) {
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
  return shuffle(selected).map(applyStarPlayerChance);
}

function currentPlayer() {
  return state.auctionPool[state.playerIndex];
}

function currentUserId() {
  return state.mode === "multi" ? state.multiplayer.playerId : "user";
}

function createManagers(config) {
  const names = [
    "Mister Nova",
    "FC Blitz",
    "Real Snack",
    "Atletico Byte",
    "Dinamo Sprint",
    "Sporting Pixel",
    "United Flash",
    "Lokomotiv Draft"
  ];
  const user = {
    id: "user",
    name: "Tu",
    credits: config.credits,
    squad: [],
    formation: config.formation,
    stats: createEmptyStats(),
    isUser: true
  };

  const rivals = names.slice(0, config.rivals).map((name, index) => ({
    id: `ai-${index}`,
    name,
    credits: config.credits,
    squad: [],
    formation: config.formation,
    stats: createEmptyStats(),
    isUser: false
  }));

  return [user, ...rivals];
}

function managerById(id) {
  return state.managers.find((manager) => manager.id === id);
}

function getUser() {
  return managerById(currentUserId());
}

function maxBidFor(manager) {
  return Math.max(0, manager.credits);
}

function clampNumber(value, min, max) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return min;
  return Math.min(max, Math.max(min, parsed));
}

function playerBasePrice(player) {
  const ratingDelta = Math.max(0, player.overall - 58);
  return Math.round(8 + ratingDelta * 1.15 + Math.max(0, player.overall - 84) * 2.1);
}

function roleCountNeeded(formation, role) {
  return formationNeeds[formation].filter((neededRole) => neededRole === role).length;
}

function roleCountOwned(manager, role) {
  return manager.squad.filter((player) => player.role === role).length;
}

function managerMissingSlots(manager) {
  const formation = manager.formation || state.config.formation;
  const uniqueRoles = [...new Set(formationNeeds[formation])];
  return uniqueRoles.reduce((missing, role) => {
    const owned = roleCountOwned(manager, role);
    const needed = roleCountNeeded(formation, role);
    return missing + Math.max(0, needed - owned);
  }, 0);
}

function aiMaxBid(manager, player) {
  const formation = manager.formation || state.config.formation;
  const neededForRole = roleCountNeeded(formation, player.role);
  const ownedForRole = roleCountOwned(manager, player.role);
  const fillsNeed = ownedForRole < neededForRole;
  const missingSlots = Math.max(0, managerMissingSlots(manager));
  const reserveForVacancies = Math.max(0, missingSlots - (fillsNeed ? 1 : 0)) * 18;
  const spendable = Math.max(0, manager.credits - reserveForVacancies);
  const urgency = Math.max(0, 6 - manager.squad.length) * 0.05 + Math.max(0, missingSlots - 6) * 0.035;

  let value = playerBasePrice(player);
  value *= fillsNeed ? 1.12 : 0.58;
  value *= state.config.aiAggression;
  value *= 1 + urgency;

  if (manager.squad.length < 5 && fillsNeed) value *= 1.08;
  if (!fillsNeed && player.overall < 86) value *= 0.72;
  if (manager.credits < state.config.credits * 0.28) value *= 0.78;

  const budgetCap = fillsNeed ? manager.credits * (0.24 + Math.min(0.1, urgency)) : manager.credits * 0.14;
  return Math.max(0, Math.floor(Math.min(value, spendable, budgetCap)));
}

function createEmptyStats() {
  return { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 };
}

function createEmptyPlayerStats() {
  return { apps: 0, goals: 0, assists: 0 };
}

function slotId(role, index, formation = state.config.formation) {
  const priorSameRole = formationSlots[formation].slice(0, index).filter(([slotRole]) => slotRole === role).length;
  return `${role}-${priorSameRole + 1}`;
}

function getSlots(formation = state.config.formation) {
  return formationSlots[formation].map(([role, x, y], index) => ({
    id: slotId(role, index, formation),
    role,
    x,
    y
  }));
}

function buildLineup(manager) {
  if (manager.lineup && Object.keys(manager.lineup).length) {
    const used = new Set(Object.values(manager.lineup));
    const starters = getSlots(manager.formation || state.config.formation).map((slot) => ({
      ...slot,
      player: manager.squad.find((player) => player.uid === manager.lineup[slot.id] || player.name === manager.lineup[slot.id]) || null
    }));
    return {
      starters,
      bench: manager.squad.filter((player) => !used.has(player.uid) && !used.has(player.name)).sort((a, b) => b.overall - a.overall)
    };
  }
  const available = [...manager.squad].sort((a, b) => b.overall - a.overall);
  const starters = getSlots(manager.formation || state.config.formation).map((slot) => {
    const index = available.findIndex((player) => player.role === slot.role);
    if (index === -1) return { ...slot, player: null };
    const [player] = available.splice(index, 1);
    return { ...slot, player };
  });

  return {
    starters,
    bench: available.sort((a, b) => b.overall - a.overall)
  };
}

function showSquadBuilder() {
  showView("squad");
  $("tacticSelect").value = state.config.tactic || "balanced";
  renderSquadBuilder();
}

function vacantSlots(manager = getUser()) {
  return buildLineup(manager).starters.filter((slot) => !slot.player);
}

function makeGeneratedPlayer(role) {
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
    stats: createEmptyPlayerStats()
  };
}

function fillVacantSlots(manager = getUser()) {
  const missing = vacantSlots(manager);
  ensureLineupAssignments(manager);
  missing.forEach((slot) => {
    const player = makeGeneratedPlayer(slot.role);
    manager.squad.push(player);
    manager.lineup[slot.id] = player.uid;
  });
  return missing.length;
}

function ensurePlayerStats(manager) {
  manager.squad.forEach((player) => {
    if (!player.stats) {
      player.stats = createEmptyPlayerStats();
    }
  });
}

function resetSeasonStats() {
  state.managers.forEach((manager) => {
    manager.stats = createEmptyStats();
    manager.squad.forEach((player) => {
      player.stats = createEmptyPlayerStats();
    });
  });
}

function clearMatchState() {
  clearInterval(state.tickId);
  clearInterval(state.liveSimulation.timer);
  state.running = false;
  state.auctionPool = [];
  state.playerIndex = 0;
  state.calledCount = 0;
  state.currentBid = 0;
  state.leaderId = null;
  state.timeLeft = 10;
  state.simulation = null;
  state.liveSimulation.roundIndex = 0;
  state.liveSimulation.rounds = [];
  state.selectedLineupPlayerId = null;
  $("auctionLog").innerHTML = "";
  $("auctionMessage").textContent = "Preparati al primo nome.";
  $("playerName").textContent = "Nome giocatore";
  $("playerRole").textContent = "-";
  $("playerNation").textContent = "";
  $("playerAge").textContent = "";
  $("playerOverall").textContent = "-";
  $("currentBid").textContent = "0";
  $("currentLeader").textContent = "Nessuna offerta";
}

function startSinglePlayer() {
  stopMultiplayerPolling();
  clearMatchState();
  state.mode = "single";
  const difficultyKey = $("difficultySelect").value;
  const difficulty = difficulties[difficultyKey];
  const credits = clampNumber($("creditsInput").value, 250, 1200);
  const rounds = clampNumber($("auctionPlayersInput").value, 12, Math.min(300, players.length));
  const rivals = clampNumber($("aiPlayersInput").value, 1, 8);
  state.config = {
    ...difficulty,
    key: difficultyKey,
    credits,
    rounds,
    rivals,
    formation: $("formationSelect").value,
    tactic: "balanced"
  };
  state.managers = createManagers(state.config);
  state.auctionPool = buildBalancedAuctionPool(players, state.config.rounds, state.managers.map((manager) => manager.formation || state.config.formation));
  state.playerIndex = 0;
  state.simulation = null;
  showView("game");
  beginAuction();
}

async function api(path, payload = null) {
  const options = payload
    ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
    : { method: "GET" };
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Errore server");
  return data;
}

function setMultiplayerStatus(message) {
  $("multiStatusText").textContent = message;
}

async function createMultiplayerLobby() {
  try {
    stopMultiplayerPolling();
    clearMatchState();
    state.mode = "multi";
    const payload = {
      name: $("hostNameInput").value
    };
    const result = await api("/api/lobbies", payload);
    state.multiplayer.code = result.code;
    state.multiplayer.playerId = result.playerId;
    state.multiplayer.isHost = true;
    state.lobbySettingsDirty = false;
    showView("lobby");
    startMultiplayerPolling();
  } catch (error) {
    setMultiplayerStatus(error.message);
  }
}

async function joinMultiplayerLobby() {
  try {
    stopMultiplayerPolling();
    clearMatchState();
    state.mode = "multi";
    const code = $("joinCodeInput").value.trim().toUpperCase();
    const result = await api(`/api/lobbies/${code}/join`, { name: $("joinNameInput").value });
    state.multiplayer.code = result.code;
    state.multiplayer.playerId = result.playerId;
    state.multiplayer.isHost = false;
    state.lobbySettingsDirty = false;
    showView("lobby");
    startMultiplayerPolling();
  } catch (error) {
    setMultiplayerStatus(error.message);
  }
}

function startMultiplayerPolling() {
  stopMultiplayerPolling();
  pollMultiplayer();
  state.multiplayer.pollId = setInterval(pollMultiplayer, 300);
}

function stopMultiplayerPolling() {
  if (state.multiplayer.pollId) clearInterval(state.multiplayer.pollId);
  state.multiplayer.pollId = null;
}

async function pollMultiplayer() {
  if (!state.multiplayer.code || !state.multiplayer.playerId) return;
  try {
    const snapshot = await api(`/api/lobbies/${state.multiplayer.code}?playerId=${state.multiplayer.playerId}`);
    applyMultiplayerSnapshot(snapshot);
  } catch (error) {
    setMultiplayerStatus(error.message);
  }
}

function applyMultiplayerSnapshot(snapshot) {
  state.mode = "multi";
  state.multiplayer.hostId = snapshot.hostId;
  state.multiplayer.isHost = snapshot.hostId === state.multiplayer.playerId;
  const currentManager = snapshot.managers.find((manager) => manager.id === state.multiplayer.playerId);
  if (state.pendingTactic && currentManager?.tactic === state.pendingTactic) {
    state.pendingTactic = null;
  }
  state.config = {
    label: "Multiplayer",
    credits: snapshot.settings.credits,
    rounds: snapshot.settings.rounds,
    rivals: Math.max(0, snapshot.managers.length - 1),
    formation: currentManager?.formation || snapshot.settings.formation,
    tactic: state.pendingTactic || currentManager?.tactic || "balanced"
  };
  state.managers = snapshot.managers;
  state.auctionPool = snapshot.currentPlayer ? [snapshot.currentPlayer] : [];
  state.playerIndex = 0;
  state.calledCount = snapshot.auction?.index || 0;
  state.currentBid = snapshot.auction?.currentBid || 0;
  state.leaderId = snapshot.auction?.leaderId || null;
  state.timeLeft = snapshot.auction?.endsAt ? Math.max(0, (snapshot.auction.endsAt - Date.now()) / 1000) : 0;
  if (snapshot.status === "countdown") {
    state.timeLeft = Math.max(0, (snapshot.auction.countdownEndsAt - Date.now()) / 1000);
  }
  state.running = snapshot.status === "auction";
  $("auctionLog").innerHTML = (snapshot.log || []).map((item) => `<div>${item}</div>`).join("");

  if (snapshot.status === "lobby") {
    renderLobby(snapshot);
    if (state.view !== "lobby") showView("lobby");
  } else if (snapshot.status === "countdown" || snapshot.status === "auction") {
    if (state.view !== "game") showView("game");
    $("rivalsTitle").textContent = "Giocatori lobby";
    snapshot.status === "countdown" ? renderCountdownAuction() : renderGame();
  } else if (snapshot.status === "squad") {
    if (state.view !== "squad") showView("squad");
    if (document.activeElement !== $("tacticSelect")) {
      $("tacticSelect").value = state.pendingTactic || getUser()?.tactic || "balanced";
    }
    renderSquadBuilder();
  } else if (snapshot.status === "results") {
    if (snapshot.results) {
      state.managers = snapshot.results.standings.map((manager) => ({ ...manager, isUser: manager.id === state.multiplayer.playerId }));
      if (snapshot.results.skipResolved) {
        state.simulation = snapshot.results;
        clearInterval(state.liveSimulation.timer);
        showResults();
        return;
      }
      if (state.view === "live") {
        return;
      }
      if (snapshot.results.rounds?.length && state.view !== "results") {
        startLiveSimulation(snapshot.results);
        return;
      }
    }
    showResults();
  }
}

function startLiveSimulation(results) {
  clearInterval(state.liveSimulation.timer);
  state.liveSimulation.roundIndex = 0;
  state.liveSimulation.rounds = results.rounds || [];
  state.simulation = results;
  $("liveMatchFeed").innerHTML = "";
  showView("live");
  renderNextLiveRound();
  state.liveSimulation.timer = setInterval(renderNextLiveRound, 2000);
}

function renderNextLiveRound() {
  const round = state.liveSimulation.rounds[state.liveSimulation.roundIndex];
  if (!round) {
    clearInterval(state.liveSimulation.timer);
    showResults();
    return;
  }
  $("liveRoundTitle").textContent = `Giornata ${round.round}`;
  const html = round.matches
    .map(
      (match) => `
        <div class="live-match-card">
          <strong>${match.home} ${match.homeGoals}-${match.awayGoals} ${match.away}</strong>
          ${(match.events || []).length ? (match.events || []).map((event) => `<span>${event}</span>`).join("") : "<small>Nessun gol</small>"}
        </div>
      `
    )
    .join("");
  $("liveMatchFeed").insertAdjacentHTML("afterbegin", html);
  renderLiveTable(round.standings || []);
  state.liveSimulation.roundIndex += 1;
}

function renderLiveTable(standings) {
  $("liveTable").classList.add("compact-league-table", "live-league-table");
  $("liveTable").innerHTML = `
    <div class="league-header">
      <span>#</span><span>Squadra</span><span>PG</span><span>PTS</span>
    </div>
    ${standings
      .map((manager, index) => {
        const isRealMultiplayer = state.mode === "multi" && !manager.isBot;
        const rowStyle = isRealMultiplayer ? `style="--team-color:${manager.color || "#1e8e4d"}"` : "";
        return `<div class="league-row ${isRealMultiplayer ? "real-player-row" : ""}" ${rowStyle}><span>${index + 1}</span><strong>${manager.name}</strong><span>${manager.stats.played}</span><strong>${manager.stats.points}</strong></div>`;
      })
      .join("")}
  `;
}

function renderLobby(snapshot) {
  const shareLink = `${window.location.origin}?join=${snapshot.code}`;
  const user = snapshot.managers.find((manager) => manager.id === state.multiplayer.playerId);
  state.lobbyUsedColors = snapshot.managers.filter((manager) => manager.id !== state.multiplayer.playerId).map((manager) => manager.color);
  $("lobbyCodeLabel").textContent = snapshot.code;
  $("lobbyShareLink").textContent = shareLink;
  $("lobbySettingsLabel").textContent = `${snapshot.settings.credits} crediti - ${snapshot.settings.rounds} giocatori in asta - ${snapshot.settings.botCount || 0} bot - CPU ${botDifficultyLabel(snapshot.settings.botDifficulty)}`;
  renderColorPicker(user?.color || playerColors[0]);
  $("lobbyFormationSelect").value = user?.formation || snapshot.settings.formation;
  $("lobbyReadyBtn").textContent = user?.ready ? "Non pronto" : "Pronto";
  if (!state.lobbySettingsDirty || !state.multiplayer.isHost) {
    setLobbyInputValue("lobbyCreditsInput", snapshot.settings.credits);
    setLobbyInputValue("lobbyRoundsInput", snapshot.settings.rounds);
    setLobbyInputValue("lobbyBotsInput", snapshot.settings.botCount || 0);
    $("lobbyBotDifficultySelect").value = snapshot.settings.botDifficulty || "normal";
  }
  renderBotDifficultyField();
  ["lobbyCreditsInput", "lobbyRoundsInput", "lobbyBotsInput", "lobbyBotDifficultySelect"].forEach((id) => {
    $(id).disabled = !state.multiplayer.isHost || state.lobbySettingsSaving;
  });
  renderLobbySettingsSaveState();
  renderLobbyPlayers(snapshot.managers, snapshot.hostId);
  const hasOpponent = snapshot.managers.length >= 2 || (snapshot.settings.botCount || 0) > 0;
  $("startLobbyAuctionBtn").disabled = !state.multiplayer.isHost || !hasOpponent || !snapshot.managers.every((manager) => manager.ready);
}

function renderLobbyPlayers(managers, hostId) {
  $("lobbyPlayersList").innerHTML = managers
    .map((manager) => {
      const color = manager.color || "#1e8e4d";
      return `
        <div class="rival-card lobby-player-card" style="--team-color:${color}">
          <div class="rival-card-head">
            <strong><span class="player-color-dot"></span>${manager.name}</strong>
            <span>${manager.ready ? "V" : "-"} ${manager.id === hostId ? "Host" : ""}</span>
          </div>
          <div class="rival-metrics"><span>${manager.formation}</span></div>
        </div>
      `;
    })
    .join("");
}

function renderColorPicker(selectedColor) {
  $("lobbyColorInput").value = selectedColor;
  $("lobbyColorButton").style.background = selectedColor;
}

function botDifficultyLabel(value) {
  return { easy: "facile", normal: "media", hard: "difficile" }[value] || "media";
}

function renderBotDifficultyField() {
  const field = $("lobbyBotDifficultyField");
  if (!field) return;
  const botCount = Number($("lobbyBotsInput").value || 0);
  field.classList.toggle("is-hidden", botCount <= 0);
}

function nextAvailableColor(currentColor) {
  const unavailable = new Set(state.lobbyUsedColors);
  const start = Math.max(0, playerColors.indexOf(currentColor));
  for (let offset = 1; offset <= playerColors.length; offset += 1) {
    const color = playerColors[(start + offset) % playerColors.length];
    if (!unavailable.has(color)) return color;
  }
  return playerColors[(start + 1) % playerColors.length];
}

function cycleLobbyColor() {
  const nextColor = nextAvailableColor($("lobbyColorInput").value || playerColors[0]);
  $("lobbyColorInput").value = nextColor;
  $("lobbyColorButton").style.background = nextColor;
  const user = getUser();
  if (user) {
    user.color = nextColor;
    renderLobbyPlayers(state.managers, state.multiplayer.hostId);
  }
  updateLobbyProfile();
}

function setLobbyInputValue(id, value) {
  const element = $(id);
  if (document.activeElement === element) return;
  element.value = value;
}

function displaySeconds(value) {
  return Math.max(0, Math.floor(Number(value) || 0));
}

function markLobbySettingsDirty() {
  if (!state.multiplayer.isHost) return;
  state.lobbySettingsDirty = true;
  renderBotDifficultyField();
  renderLobbySettingsSaveState();
}

function renderLobbySettingsSaveState() {
  const button = $("saveLobbySettingsBtn");
  if (!button) return;
  const disabled = !state.multiplayer.isHost || state.lobbySettingsSaving || !state.lobbySettingsDirty;
  button.disabled = disabled;
  button.classList.toggle("dirty", state.lobbySettingsDirty);
  button.textContent = state.lobbySettingsSaving
    ? "Salvataggio..."
    : state.lobbySettingsDirty
      ? "Salva modifiche"
      : "Settaggi salvati";
}

function renderCountdownAuction() {
  const seconds = displaySeconds(state.timeLeft);
  $("roundLabel").textContent = "Partenza asta";
  $("timerLabel").textContent = String(seconds);
  $("timerLabel").classList.add("hot");
  $("playerRole").textContent = "GO";
  $("playerName").textContent = `Si parte tra ${seconds}`;
  $("playerNation").textContent = "Preparati";
  $("playerAge").textContent = "";
  $("playerOverall").textContent = "-";
  $("currentBid").textContent = "0";
  $("currentLeader").textContent = "Countdown iniziale";
  $("auctionMessage").textContent = "L'asta iniziera appena finisce il countdown.";
  renderManagers();
  document.querySelectorAll("[data-bid]").forEach((button) => {
    button.disabled = true;
  });
}

async function startMultiplayerAuction() {
  const button = $("startLobbyAuctionBtn");
  button.disabled = true;
  button.textContent = "Avvio...";
  try {
    const snapshot = await api(`/api/lobbies/${state.multiplayer.code}/start`, { playerId: state.multiplayer.playerId });
    applyMultiplayerSnapshot(snapshot);
  } catch (error) {
    setMultiplayerStatus(error.message);
    button.textContent = "Avvia asta host";
    pollMultiplayer();
  }
}

async function multiplayerBid(increment) {
  await api(`/api/lobbies/${state.multiplayer.code}/bid`, { playerId: state.multiplayer.playerId, increment });
  pollMultiplayer();
}

async function multiplayerFill() {
  await api(`/api/lobbies/${state.multiplayer.code}/fill`, { playerId: state.multiplayer.playerId });
  pollMultiplayer();
}

async function multiplayerReady() {
  const user = getUser();
  await api(`/api/lobbies/${state.multiplayer.code}/ready`, {
    playerId: state.multiplayer.playerId,
    tactic: state.pendingTactic || user?.tactic || $("tacticSelect").value,
    lineup: user?.lineup || {}
  });
  state.pendingTactic = null;
  pollMultiplayer();
}

async function multiplayerStartSimulation() {
  await api(`/api/lobbies/${state.multiplayer.code}/simulate`, { playerId: state.multiplayer.playerId });
  pollMultiplayer();
}

async function syncLobbyProfile() {
  if (!state.multiplayer.code || !state.multiplayer.playerId) return null;
  return api(`/api/lobbies/${state.multiplayer.code}/profile`, {
    playerId: state.multiplayer.playerId,
    color: $("lobbyColorInput").value,
    formation: $("lobbyFormationSelect").value
  });
}

async function updateLobbyProfile() {
  const snapshot = await syncLobbyProfile();
  if (snapshot) applyMultiplayerSnapshot(snapshot);
}

async function toggleLobbyReady() {
  await syncLobbyProfile();
  const user = getUser();
  await api(`/api/lobbies/${state.multiplayer.code}/lobby-ready`, {
    playerId: state.multiplayer.playerId,
    ready: !user?.ready
  });
  pollMultiplayer();
}

async function saveLobbySettings() {
  if (!state.lobbySettingsDirty || state.lobbySettingsSaving) return;
  state.lobbySettingsSaving = true;
  renderLobbySettingsSaveState();
  try {
    const snapshot = await api(`/api/lobbies/${state.multiplayer.code}/settings`, {
      playerId: state.multiplayer.playerId,
      credits: $("lobbyCreditsInput").value,
      rounds: $("lobbyRoundsInput").value,
      botCount: $("lobbyBotsInput").value,
      botDifficulty: $("lobbyBotDifficultySelect").value
    });
    state.lobbySettingsDirty = false;
    applyMultiplayerSnapshot(snapshot);
  } finally {
    state.lobbySettingsSaving = false;
    renderLobbySettingsSaveState();
  }
}

function beginAuction() {
  state.currentBid = 0;
  state.leaderId = null;
  state.timeLeft = 10;
  state.running = true;
  renderGame();
  $("auctionMessage").textContent = "Nuovo giocatore sul mercato. Scegli se entrare nell'asta.";
  clearInterval(state.tickId);
  state.tickId = setInterval(tickAuction, 100);
}

function tickAuction() {
  state.timeLeft = Math.max(0, state.timeLeft - 0.1);
  maybeAiBid();
  renderAuction();

  if (state.timeLeft <= 0) {
    closeAuction();
  }
}

function maybeAiBid() {
  const player = currentPlayer();
  if (!player || state.timeLeft <= 0) return;

  const pressure = state.timeLeft < 3.5 ? 0.24 : 0.08;
  const leastCovered = Math.max(
    0,
    ...state.managers.filter((manager) => !manager.isUser).map((manager) => managerMissingSlots(manager))
  );
  const scarcityBoost = Math.min(0.18, leastCovered * 0.012);
  const randomGate = pressure * state.config.aiAggression + scarcityBoost;
  const forceLateBaseBid = !state.leaderId && state.timeLeft < 1.4;
  if (!forceLateBaseBid && Math.random() > randomGate) return;

  const aiManagers = state.managers.filter((manager) => !manager.isUser && manager.credits > state.currentBid);
  const interested = aiManagers
    .map((manager) => {
      const maxValue = aiMaxBid(manager, player);
      return { manager, maxValue };
    })
    .filter(({ maxValue }) => maxValue > state.currentBid + 1);

  if (!interested.length) return;

  const pick = forceLateBaseBid
    ? interested.sort((a, b) => managerMissingSlots(b.manager) - managerMissingSlots(a.manager) || a.manager.squad.length - b.manager.squad.length)[0]
    : interested[Math.floor(Math.random() * interested.length)];
  const increment = forceLateBaseBid ? Math.max(1, Math.min(5, Math.floor(playerBasePrice(player) * 0.18))) : [1, 2, 3, 5, 7][Math.floor(Math.random() * 5)];
  const bid = Math.min(pick.manager.credits, state.currentBid + increment, pick.maxValue);

  if (bid > state.currentBid && pick.manager.id !== state.leaderId) {
    placeBid(pick.manager.id, bid);
  }
}

function roleNeed(manager, role) {
  const needs = formationNeeds[state.config.formation];
  const owned = manager.squad.filter((player) => player.role === role).length;
  const wanted = needs.filter((neededRole) => neededRole === role).length;
  return owned < wanted;
}

function placeBid(managerId, amount) {
  const manager = managerById(managerId);
  if (!manager || amount <= state.currentBid || amount > manager.credits) return false;

  state.currentBid = amount;
  state.leaderId = managerId;
  if (state.timeLeft < 5) {
    state.timeLeft = 5;
  }
  renderGame();
  return true;
}

function closeAuction() {
  clearInterval(state.tickId);
  state.running = false;
  const player = currentPlayer();

  if (state.leaderId) {
    const winner = managerById(state.leaderId);
    winner.credits -= state.currentBid;
    winner.squad.push({ ...player, uid: `p-${Math.random().toString(36).slice(2, 10)}`, price: state.currentBid, generated: false, stats: createEmptyPlayerStats() });
    addLog(`${player.name} venduto a ${winner.name} per ${state.currentBid}`);
    $("auctionMessage").textContent = `${player.name} venduto a ${winner.name}.`;
  } else {
    addLog(`${player.name} resta senza squadra`);
    $("auctionMessage").textContent = `${player.name} non ha ricevuto offerte.`;
  }

  state.playerIndex += 1;
  renderGame();

  if (state.playerIndex >= state.auctionPool.length) {
    setTimeout(showSquadBuilder, 900);
  } else {
    setTimeout(beginAuction, 900);
  }
}

function userBid(increment) {
  if (state.mode === "multi") {
    multiplayerBid(increment);
    return;
  }
  if (!state.running) return;
  const user = getUser();
  const nextBid = state.currentBid + increment;
  if (state.leaderId === user.id) {
    $("auctionMessage").textContent = "Sei gia in vantaggio su questa asta.";
    return;
  }
  if (nextBid > maxBidFor(user)) {
    $("auctionMessage").textContent = "Crediti insufficienti per questo rilancio.";
    return;
  }
  placeBid(user.id, nextBid);
}

function teamRating(manager) {
  if (!manager.squad.length) return 0;
  const sorted = [...manager.squad].sort((a, b) => b.overall - a.overall);
  const starters = sorted.slice(0, 11);
  const average = starters.reduce((total, player) => total + player.overall, 0) / starters.length;
  const coverage = formationCoverage(starters);
  const depthBonus = Math.min(4, Math.max(0, manager.squad.length - 11) * 0.6);
  return Math.round(average * (0.78 + coverage * 0.22) + depthBonus);
}

function formationCoverage(starters) {
  const user = getUser();
  const formation = user?.formation || state.config.formation;
  const remainingRoles = starters.map((player) => player.role);
  const covered = formationNeeds[formation].filter((role) => {
    const index = remainingRoles.indexOf(role);
    if (index === -1) return false;
    remainingRoles.splice(index, 1);
    return true;
  });
  return covered.length / formationNeeds[formation].length;
}

function renderSquadBuilder() {
  const user = getUser();
  if (!user) return;
  ensurePlayerStats(user);
  ensureLineupAssignments(user);
  const lineup = buildLineup(user);
  const missing = lineup.starters.filter((slot) => !slot.player).length;
  const generated = user.squad.filter((player) => player.generated).length;
  const allReady = state.mode === "multi" && state.managers.length > 0 && state.managers.every((manager) => manager.ready);

  $("lineupSummary").textContent = state.selectedLineupPlayerId
    ? `${user.formation || state.config.formation} - giocatore selezionato: clicca uno slot o la panchina per spostarlo.`
    : `${user.formation || state.config.formation} - ${lineup.starters.length - missing}/11 titolari pronti. Giocatori generati: ${generated}.`;
  if (state.mode === "multi") {
    $("simulateBtn").disabled = missing > 0 || (allReady ? !state.multiplayer.isHost : user.ready);
    $("simulateBtn").textContent = allReady
      ? (state.multiplayer.isHost ? "Avvia simulazione" : "In attesa dell'host")
      : (user.ready ? "In attesa degli altri" : "Pronto");
  } else {
    $("simulateBtn").disabled = missing > 0;
    $("simulateBtn").textContent = "Simula stagione";
  }

  $("footballPitch").innerHTML = lineup.starters
    .map((slot) => {
      const player = slot.player;
      const statusClass = player ? "filled" : "vacant";
      const name = player ? player.name : "Posto vacante";
      const effective = player ? effectiveOverall(player, slot.role) : "--";
      const source = player && player.generated ? "Auto" : player ? "Asta" : "Serve giocatore";
      return `
        <div class="pitch-slot ${statusClass} ${player?.starPlayer ? "star-card" : ""} ${player && state.selectedLineupPlayerId === player.uid ? "selected-player" : ""}" data-slot-id="${slot.id}" ${player ? `draggable="true" data-player-id="${player.uid}"` : ""} style="left:${slot.x}%; top:${slot.y}%;">
          <strong>${slot.role}</strong>
          <span class="${player?.starPlayer ? "star-player-name" : ""}">${player?.starPlayer ? "STAR " : ""}${name}</span>
          <small>${source} - OVR ${effective}${player?.starPlayer ? " - bonus reparto +3%" : ""}${player && player.role !== slot.role ? " fuori ruolo" : ""}</small>
        </div>
      `;
    })
    .join("");

  $("benchList").innerHTML = lineup.bench.length
    ? lineup.bench
        .map(
          (player) => `
            <div class="bench-item ${player.starPlayer ? "star-card" : ""} ${state.selectedLineupPlayerId === player.uid ? "selected-player" : ""}" draggable="true" data-player-id="${player.uid}">
              <strong>${player.role}</strong>
              <span class="${player.starPlayer ? "star-player-name" : ""}">${player.starPlayer ? "STAR " : ""}${player.name}<small>${player.generated ? "Auto" : "Asta"} - OVR ${player.overall}${player.starPlayer ? " - bonus +3%" : ""}</small></span>
            </div>
          `
        )
        .join("")
    : `<p class="muted">Nessun giocatore in panchina. Trascina qui chi vuoi togliere dal campo.</p>`;
  $("benchList").dataset.benchDrop = "true";
  renderSquadStats(lineup);
  bindLineupDragDrop();
}

function ensureLineupAssignments(manager) {
  if (manager.lineup && Object.keys(manager.lineup).length) return;
  const lineup = buildLineup({ ...manager, lineup: null });
  manager.lineup = {};
  lineup.starters.forEach((slot) => {
    if (slot.player) manager.lineup[slot.id] = slot.player.uid || slot.player.name;
  });
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

function renderSquadStats(lineup) {
  const groups = {
    Attacco: ["ATT", "AS", "AD", "COC"],
    Centrocampo: ["MED", "CC", "COC"],
    Difesa: ["POR", "DC", "TS", "TD"]
  };
  const values = Object.entries(groups).map(([label, roles]) => {
    const players = lineup.starters.filter((slot) => slot.player && roles.includes(slot.role));
    const avg = players.length ? Math.round(players.reduce((sum, slot) => sum + effectiveOverall(slot.player, slot.role), 0) / players.length) : 0;
    return { label, avg };
  });
  const starters = lineup.starters.filter((slot) => slot.player);
  const totalAvg = starters.length ? Math.round(starters.reduce((sum, slot) => sum + effectiveOverall(slot.player, slot.role), 0) / starters.length) : 0;
  $("squadStatsBox").innerHTML = [...values, { label: "Media 11", avg: totalAvg }]
    .map((item) => `<div class="squad-stat"><span>${item.label}</span><strong>${item.avg}</strong></div>`)
    .join("");
}

function bindLineupDragDrop() {
  document.querySelectorAll("[draggable='true'][data-player-id]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.stopPropagation();
      state.selectedLineupPlayerId = state.selectedLineupPlayerId === element.dataset.playerId ? null : element.dataset.playerId;
      renderSquadBuilder();
    });
    element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", element.dataset.playerId);
      event.dataTransfer.effectAllowed = "move";
    });
  });
  document.querySelectorAll("[data-slot-id], [data-bench-drop]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (!state.selectedLineupPlayerId) return;
      event.preventDefault();
      movePlayerToSlot(state.selectedLineupPlayerId, event.currentTarget.dataset.slotId || null);
    });
    element.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      element.classList.add("drop-target");
    });
    element.addEventListener("dragleave", () => {
      element.classList.remove("drop-target");
    });
    element.addEventListener("drop", (event) => {
      event.preventDefault();
      element.classList.remove("drop-target");
      movePlayerToSlot(event.dataTransfer.getData("text/plain"), event.currentTarget.dataset.slotId || null);
    });
  });
}

function movePlayerToSlot(playerId, slotId) {
  const user = getUser();
  if (!user || !playerId) return;
  ensureLineupAssignments(user);
  Object.keys(user.lineup).forEach((key) => {
    if (user.lineup[key] === playerId) delete user.lineup[key];
  });
  if (slotId) {
    user.lineup[slotId] = playerId;
  }
  state.selectedLineupPlayerId = null;
  user.ready = false;
  renderSquadBuilder();
  saveLineupDraft();
}

function updateSquadTactic() {
  const user = getUser();
  if (!user) return;
  user.tactic = $("tacticSelect").value;
  state.pendingTactic = user.tactic;
  user.ready = false;
  renderSquadBuilder();
  saveLineupDraft();
}

async function saveLineupDraft() {
  if (state.mode !== "multi" || !state.multiplayer.code) return;
  const user = getUser();
  if (!user) return;
  try {
    const snapshot = await api(`/api/lobbies/${state.multiplayer.code}/lineup`, {
      playerId: state.multiplayer.playerId,
      tactic: state.pendingTactic || user.tactic || $("tacticSelect").value,
      lineup: user.lineup || {}
    });
    applyMultiplayerSnapshot(snapshot);
  } catch (error) {
    $("lineupSummary").textContent = error.message;
  }
}

function renderGame() {
  renderAuction();
  renderManagers();
  renderMiniFormation();
  renderSquad();
}

function renderAuction() {
  const player = currentPlayer();
  if (!player) return;
  const leader = state.leaderId ? managerById(state.leaderId) : null;

  $("roundLabel").textContent = state.mode === "multi" ? `Chiamati ${state.calledCount}/${state.config.rounds}` : `Asta ${state.playerIndex + 1}/${state.auctionPool.length}`;
  $("timerLabel").textContent = String(displaySeconds(state.timeLeft));
  $("timerLabel").classList.toggle("hot", state.timeLeft < 3.5);
  $("playerRole").textContent = player.role;
  $("playerName").textContent = player.starPlayer ? `STAR ${player.name}` : player.name;
  $("playerName").classList.toggle("star-player-name", Boolean(player.starPlayer));
  $("playerNation").textContent = player.nation;
  $("playerAge").textContent = player.starPlayer ? `${player.age} anni - bonus reparto +3%` : `${player.age} anni`;
  $("playerOverall").textContent = player.overall;
  $("playerOverall").classList.toggle("star-overall", Boolean(player.starPlayer));
  $("currentBid").textContent = state.currentBid;
  $("currentLeader").textContent = leader ? `In vantaggio: ${leader.name}` : "Nessuna offerta";

  document.querySelectorAll("[data-bid]").forEach((button) => {
    const increment = Number(button.dataset.bid);
    button.disabled = !state.running || state.currentBid + increment > getUser().credits || state.leaderId === currentUserId();
  });
}

function renderManagers() {
  const user = getUser();
  $("userPanelTitle").textContent = user?.name || "Manager";
  $("userCredits").textContent = user.credits;
  $("userFormation").textContent = user.formation || state.config.formation;
  $("teamRating").textContent = teamRating(user);

  $("rivalsList").innerHTML = state.managers
    .filter((manager) => !manager.isUser)
    .map(
      (manager) => {
        const missing = managerMissingSlots(manager);
        const covered = 11 - missing;
        return `
        <div class="rival-card">
          <div class="rival-card-head">
            <strong>${manager.name}</strong>
            <span>${manager.credits} cr</span>
          </div>
          <div class="rival-metrics">
            <span>Acq. <strong>${manager.squad.length}</strong></span>
            <span>Titolari <strong>${covered}/11</strong></span>
            <span>OVR <strong>${teamRating(manager)}</strong></span>
          </div>
        </div>
      `;
      }
    )
    .join("");
}

function renderMiniFormation() {
  const user = getUser();
  if (!user || !state.config) return;

  const player = currentPlayer();
  const lineup = buildLineup(user);
  const previewIndex = player ? lineup.starters.findIndex((slot) => !slot.player && slot.role === player.role) : -1;
  const isUseful = previewIndex !== -1;

  if (player) {
    $("auctionFitMessage").textContent = isUseful
      ? `${player.role} utile: entrerebbe subito nel modulo.`
      : `${player.role} non prioritario: finirebbe in panchina.`;
    $("auctionFitMessage").className = `fit-message ${isUseful ? "good" : "bad"}`;
  } else {
    $("auctionFitMessage").textContent = "In attesa del prossimo giocatore.";
    $("auctionFitMessage").className = "fit-message";
  }

  $("miniFormation").innerHTML = lineup.starters
    .map((slot, index) => {
      const owned = slot.player;
      const previewed = player && index === previewIndex;
      const className = owned ? "owned" : previewed ? "preview-good" : "empty";
      const label = owned ? owned.name : previewed ? player.name : "Vuoto";
      const overall = owned ? owned.overall : previewed ? player.overall : "--";
      return `
        <div class="mini-slot ${className}" style="left:${slot.x}%; top:${slot.y}%;">
          <strong>${slot.role}</strong>
          <span>${label}</span>
          <small>${overall}</small>
        </div>
      `;
    })
    .join("");

  if (player && !isUseful) {
    $("miniFormation").insertAdjacentHTML(
      "beforeend",
      `<div class="mini-bench-warning">Panchina: ruolo ${player.role} gia coperto</div>`
    );
  }
}

function renderSquad() {
  const squad = [...getUser().squad].sort((a, b) => b.overall - a.overall);
  $("squadList").innerHTML = squad.length
    ? squad
        .map(
          (player) => `
          <div class="squad-item ${player.starPlayer ? "star-card" : ""}">
            <strong>${player.role}</strong>
            <span class="${player.starPlayer ? "star-player-name" : ""}">${player.starPlayer ? "STAR " : ""}${player.name}<br><small>${player.price} cr - ${player.nation}${player.starPlayer ? " - bonus reparto +3%" : ""}</small></span>
            <strong>${player.overall}</strong>
          </div>
        `
        )
        .join("")
    : `<p class="muted">La rosa e vuota. Entra nell'asta quando trovi il profilo giusto.</p>`;
}

function addLog(message) {
  const log = $("auctionLog");
  const row = document.createElement("div");
  row.textContent = message;
  log.prepend(row);
}

function teamStrength(manager) {
  const lineup = buildLineup(manager);
  const starters = lineup.starters.filter((slot) => slot.player);
  if (!starters.length) return { attack: 50, defense: 50, base: 50 };
  const repartoBonuses = { attack: 0, midfield: 0, defense: 0 };
  starters.forEach((slot) => {
    if (slot.player.starPlayer) repartoBonuses[repartoForRole(slot.role)] += slot.player.starBonus || starRepartoBonus;
  });
  const avg =
    starters.reduce((total, slot) => {
      const reparto = repartoForRole(slot.role);
      return total + effectiveOverall(slot.player, slot.role) * (1 + repartoBonuses[reparto]);
    }, 0) / starters.length;
  const coverage = formationCoverage(starters.map((slot) => slot.player));
  const base = avg * (0.86 + coverage * 0.14);
  const tactic = tacticProfiles[manager.tactic || state.config.tactic] || tacticProfiles.balanced;
  return {
    attack: base * tactic.attack,
    defense: base * tactic.defense,
    base
  };
}

function weightedPick(players, type) {
  const weighted = players.map((player) => {
    const roleWeight = roleWeights[player.role]?.[type] || 0.4;
    return {
      player,
      weight: Math.max(0.05, roleWeight * (player.overall / 75))
    };
  });
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;
  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.player;
  }
  return weighted[weighted.length - 1].player;
}

function assignGoal(manager) {
  const starters = buildLineup(manager).starters.map((slot) => slot.player).filter(Boolean);
  if (!starters.length) return;
  const scorer = weightedPick(starters, "goals");
  scorer.stats.goals += 1;
  const minute = 1 + Math.floor(Math.random() * 90);
  const assistPool = starters.filter((player) => player !== scorer && player.role !== "POR");
  if (assistPool.length && Math.random() < 0.78) {
    weightedPick(assistPool, "assists").stats.assists += 1;
  }
  return `${minute}' ${scorer.name}`;
}

function playMatch(home, away) {
  const homeStrength = teamStrength(home);
  const awayStrength = teamStrength(away);
  const homeTactic = tacticProfiles[home.tactic || state.config.tactic] || tacticProfiles.balanced;
  const awayTactic = tacticProfiles[away.tactic || "balanced"] || tacticProfiles.balanced;
  const homeEdge = 0.25;
  const homeExpected = Math.max(0.15, 1.15 + (homeStrength.attack - awayStrength.defense) / 18 + homeEdge);
  const awayExpected = Math.max(0.15, 1.05 + (awayStrength.attack - homeStrength.defense) / 18);
  const homeGoals = sampleGoals(homeExpected);
  const awayGoals = sampleGoals(awayExpected);

  const events = [];
  for (let i = 0; i < homeGoals; i += 1) events.push(assignGoal(home));
  for (let i = 0; i < awayGoals; i += 1) events.push(assignGoal(away));

  updateTeamStats(home, homeGoals, awayGoals);
  updateTeamStats(away, awayGoals, homeGoals);
  return {
    home: home.name,
    away: away.name,
    homeGoals,
    awayGoals,
    shots: {
      home: Math.max(homeGoals + 2, Math.round((5 + Math.random() * 9) * homeTactic.shots)),
      away: Math.max(awayGoals + 2, Math.round((5 + Math.random() * 9) * awayTactic.shots))
    },
    events: events.filter(Boolean).sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10))
  };
}

function sampleGoals(expected) {
  let goals = 0;
  const chances = 5;
  const chanceRate = Math.min(0.82, expected / chances);
  for (let i = 0; i < chances; i += 1) {
    if (Math.random() < chanceRate) goals += 1;
  }
  return Math.min(7, goals);
}

function updateTeamStats(manager, gf, ga) {
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
  buildLineup(manager)
    .starters.map((slot) => slot.player)
    .filter(Boolean)
    .forEach((player) => {
      player.stats.apps += 1;
    });
}

function buildClientCalendarRounds(managers) {
  const teams = [...managers];
  if (teams.length % 2 === 1) teams.push(null);
  const firstLeg = [];
  let rotation = [...teams];
  const half = teams.length / 2;

  for (let round = 0; round < teams.length - 1; round += 1) {
    const matches = [];
    for (let i = 0; i < half; i += 1) {
      const a = rotation[i];
      const b = rotation[rotation.length - 1 - i];
      if (a && b) matches.push(round % 2 === 0 ? [a, b] : [b, a]);
    }
    firstLeg.push(matches);
    rotation = [rotation[0], rotation[rotation.length - 1], ...rotation.slice(1, rotation.length - 1)];
  }

  return [...firstLeg, ...firstLeg.map((matches) => matches.map(([home, away]) => [away, home]))];
}

function clientTableSnapshot() {
  return [...state.managers]
    .sort((a, b) => b.stats.points - a.stats.points || (b.stats.gf - b.stats.ga) - (a.stats.gf - a.stats.ga) || b.stats.gf - a.stats.gf)
    .map((manager) => ({ ...manager, stats: { ...manager.stats } }));
}

function simulateSeason() {
  if (state.mode === "multi") {
    const allReady = state.managers.length > 0 && state.managers.every((manager) => manager.ready);
    if (allReady && state.multiplayer.isHost) {
      multiplayerStartSimulation();
      return;
    }
    multiplayerReady();
    return;
  }
  if (vacantSlots(getUser()).length) {
    renderSquadBuilder();
    return;
  }

  state.config.tactic = $("tacticSelect").value;
  getUser().tactic = state.config.tactic;
  state.managers.filter((manager) => !manager.isUser).forEach((manager) => fillVacantSlots(manager));
  state.managers.forEach(ensurePlayerStats);
  resetSeasonStats();

  const rounds = buildClientCalendarRounds(state.managers).map((matches, index) => {
    const playedMatches = matches.map(([home, away]) => playMatch(home, away));
    return { round: index + 1, matches: playedMatches, standings: clientTableSnapshot() };
  });

  state.simulation = { rounds };
  showResults();
}

function showResults() {
  showView("results");
  const ranking = [...state.managers].sort((a, b) => {
    const gdA = a.stats.gf - a.stats.ga;
    const gdB = b.stats.gf - b.stats.ga;
    return b.stats.points - a.stats.points || gdB - gdA || b.stats.gf - a.stats.gf || teamRating(b) - teamRating(a);
  });
  const userPosition = ranking.findIndex((manager) => manager.id === "user") + 1;
  const winner = ranking[0];
  $("resultTitle").textContent = `Coppa a ${winner?.name || "Vincitore"}`;
  $("winnerCelebration").innerHTML = `
    <div class="confetti-field">
      ${Array.from({ length: 18 }, (_, index) => `<span style="--x:${2 + index * 5.4}%; --d:${(index % 5 - 2) * 14}px; --delay:${index * -0.16}s; --hue:${index * 33}"></span>`).join("")}
    </div>
    <div class="trophy-drawing" aria-hidden="true">
      <span class="trophy-cup"></span>
      <span class="trophy-stem"></span>
      <span class="trophy-base"></span>
    </div>
    <div>
      <p class="eyebrow">Campione</p>
      <strong>${winner?.name || "Vincitore"}</strong>
      <small>${winner?.stats.points || 0} punti, ${winner?.stats.gf || 0} gol fatti</small>
    </div>
  `;
  $("resultSummary").textContent = `Difficolta ${state.config.label}, modulo ${state.config.formation}. Calendario andata e ritorno contro ${state.managers.length - 1} rivali.`;
  $("standingsList").classList.add("compact-league-table");
  $("standingsList").innerHTML = `
    <div class="league-header">
      <span>#</span>
      <span>Squadra</span>
      <span>PG</span>
      <span>PTS</span>
    </div>
    ${ranking
      .map((manager, index) => {
        const isRealMultiplayer = state.mode === "multi" && !manager.isBot;
        const rowStyle = isRealMultiplayer ? `style="--team-color:${manager.color || "#1e8e4d"}"` : "";
        return `
        <div class="league-row ${manager.isUser ? "user-row" : ""} ${isRealMultiplayer ? "real-player-row" : ""}" ${rowStyle}>
          <span>${index + 1}</span>
          <strong>${manager.name}</strong>
          <span>${manager.stats.played}</span>
          <strong>${manager.stats.points}</strong>
        </div>
      `;
      })
      .join("")}
  `;
  renderPlayerStats();
  renderFinalCalendar();
}

function renderFinalCalendar() {
  if (!state.simulation?.rounds?.length) return;
  document.querySelector(".final-calendar")?.remove();
  const calendar = document.createElement("div");
  calendar.className = "final-calendar";
  calendar.innerHTML = `<h2>Calendario</h2>${state.simulation.rounds
    .map(
      (round) => `
        <div class="calendar-round">
          <strong>Giornata ${round.round}</strong>
          <div class="calendar-match-grid">
            ${round.matches
              .map((match) => `<div class="calendar-match"><span>${match.home} <strong>${match.homeGoals}-${match.awayGoals}</strong> ${match.away}</span><small>${match.events?.length ? match.events.join(" | ") : "Nessun gol"}</small></div>`)
              .join("")}
          </div>
        </div>
      `
    )
    .join("")}`;
  $("standingsList").insertAdjacentElement("afterend", calendar);
}

function renderPlayerStats() {
  const playersWithStats = state.managers
    .flatMap((manager) => manager.squad.map((player) => ({ ...player, team: manager.name })))
    .filter((player) => player.stats && (player.stats.goals > 0 || player.stats.assists > 0 || player.stats.apps > 0))
    .sort((a, b) => b.stats.goals - a.stats.goals || b.stats.assists - a.stats.assists || b.overall - a.overall)
    .slice(0, 10);

  $("playerStatsList").innerHTML = playersWithStats
    .map(
      (player, index) => `
        <div class="player-stat-row">
          <span>${index + 1}. ${player.name}<small>${player.team} - ${player.role} - OVR ${player.overall}</small></span>
          <strong>${player.stats.goals} G</strong>
          <strong>${player.stats.assists} A</strong>
          <span>${player.stats.apps} pres.</span>
        </div>
      `
    )
    .join("");
}

function resetGame() {
  clearInterval(state.tickId);
  stopMultiplayerPolling();
  state.running = false;
  state.simulation = null;
  state.mode = "single";
  state.multiplayer.code = null;
  state.multiplayer.playerId = null;
  state.multiplayer.isHost = false;
  state.lobbySettingsDirty = false;
  state.lobbySettingsSaving = false;
  $("auctionLog").innerHTML = "";
  showView("home");
}

function applyDifficultyDefaults() {
  const difficulty = difficulties[$("difficultySelect").value];
  $("creditsInput").value = difficulty.credits;
  $("auctionPlayersInput").value = difficulty.rounds;
  $("aiPlayersInput").value = difficulty.rivals;
  updateSetupSummary();
}

function updateSetupSummary() {
  const credits = clampNumber($("creditsInput").value, 250, 1200);
  const rounds = clampNumber($("auctionPlayersInput").value, 12, Math.min(300, players.length));
  const rivals = clampNumber($("aiPlayersInput").value, 1, 8);
  $("creditsInput").value = credits;
  $("auctionPlayersInput").value = rounds;
  $("aiPlayersInput").value = rivals;
  $("setupSummary").textContent = `Budget ${credits} cr - ${rounds} giocatori in asta - ${rivals} IA`;
}

$("singleModeBtn").addEventListener("click", () => showView("setup"));
$("multiModeBtn").addEventListener("click", () => showView("multi"));
$("createLobbyBtn").addEventListener("click", createMultiplayerLobby);
$("joinLobbyBtn").addEventListener("click", joinMultiplayerLobby);
$("startLobbyAuctionBtn").addEventListener("click", startMultiplayerAuction);
$("copyLobbyLinkBtn").addEventListener("click", () => navigator.clipboard?.writeText($("lobbyShareLink").textContent));
$("lobbyColorButton").addEventListener("click", cycleLobbyColor);
$("lobbyFormationSelect").addEventListener("change", updateLobbyProfile);
$("lobbyReadyBtn").addEventListener("click", toggleLobbyReady);
$("saveLobbySettingsBtn").addEventListener("click", saveLobbySettings);
["lobbyCreditsInput", "lobbyRoundsInput", "lobbyBotsInput", "lobbyBotDifficultySelect"].forEach((id) => {
  $(id).addEventListener("input", markLobbySettingsDirty);
  $(id).addEventListener("change", markLobbySettingsDirty);
});
$("skipSimBtn").addEventListener("click", () => {
  if (state.mode === "multi" && state.multiplayer.code) {
    api(`/api/lobbies/${state.multiplayer.code}/skip`, { playerId: state.multiplayer.playerId }).catch(() => {});
    return;
  }
  clearInterval(state.liveSimulation.timer);
  showResults();
});
$("startGameBtn").addEventListener("click", startSinglePlayer);
$("resetBtn").addEventListener("click", resetGame);
$("playAgainBtn").addEventListener("click", () => showView("setup"));
$("difficultySelect").addEventListener("change", applyDifficultyDefaults);
$("creditsInput").addEventListener("input", updateSetupSummary);
$("auctionPlayersInput").addEventListener("input", updateSetupSummary);
$("aiPlayersInput").addEventListener("input", updateSetupSummary);
$("tacticSelect").addEventListener("change", updateSquadTactic);
$("autoFillBtn").addEventListener("click", () => {
  if (state.mode === "multi") {
    multiplayerFill();
    return;
  }
  const added = fillVacantSlots(getUser());
  $("lineupSummary").textContent = added ? `Generati ${added} giocatori per completare l'undici.` : "La formazione e gia completa.";
  renderSquadBuilder();
});
$("simulateBtn").addEventListener("click", simulateSeason);

document.querySelectorAll("[data-bid]").forEach((button) => {
  button.addEventListener("click", () => userBid(Number(button.dataset.bid)));
});

applyDifficultyDefaults();

const joinCodeFromUrl = new URLSearchParams(window.location.search).get("join");
if (joinCodeFromUrl) {
  $("joinCodeInput").value = joinCodeFromUrl.toUpperCase();
  showView("multi");
}


