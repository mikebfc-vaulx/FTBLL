const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const LOBBY_TTL_MS = Number(process.env.LOBBY_TTL_MS || 1000 * 60 * 60 * 3);
const CLEANUP_INTERVAL_MS = Number(process.env.CLEANUP_INTERVAL_MS || 1000 * 60 * 10);

const players = [
  { name: "Kylian Mbappe", role: "ATT", nation: "Francia", age: 27, overall: 94 },
  { name: "Erling Haaland", role: "ATT", nation: "Norvegia", age: 25, overall: 93 },
  { name: "Jude Bellingham", role: "COC", nation: "Inghilterra", age: 23, overall: 91 },
  { name: "Vinicius Junior", role: "AS", nation: "Brasile", age: 25, overall: 91 },
  { name: "Rodri", role: "MED", nation: "Spagna", age: 30, overall: 90 },
  { name: "Kevin De Bruyne", role: "CC", nation: "Belgio", age: 35, overall: 89 },
  { name: "Lautaro Martinez", role: "ATT", nation: "Argentina", age: 28, overall: 89 },
  { name: "Bukayo Saka", role: "AD", nation: "Inghilterra", age: 24, overall: 88 },
  { name: "Federico Valverde", role: "CC", nation: "Uruguay", age: 27, overall: 88 },
  { name: "Ruben Dias", role: "DC", nation: "Portogallo", age: 29, overall: 88 },
  { name: "Gianluigi Donnarumma", role: "POR", nation: "Italia", age: 27, overall: 87 },
  { name: "Alessandro Bastoni", role: "DC", nation: "Italia", age: 27, overall: 86 },
  { name: "Achraf Hakimi", role: "TD", nation: "Marocco", age: 27, overall: 86 },
  { name: "Theo Hernandez", role: "TS", nation: "Francia", age: 28, overall: 86 },
  { name: "Florian Wirtz", role: "COC", nation: "Germania", age: 23, overall: 86 },
  { name: "Victor Osimhen", role: "ATT", nation: "Nigeria", age: 27, overall: 86 },
  { name: "Rafael Leao", role: "AS", nation: "Portogallo", age: 27, overall: 85 },
  { name: "Nicolo Barella", role: "CC", nation: "Italia", age: 29, overall: 85 },
  { name: "Mike Maignan", role: "POR", nation: "Francia", age: 30, overall: 85 },
  { name: "Declan Rice", role: "MED", nation: "Inghilterra", age: 27, overall: 85 },
  { name: "William Saliba", role: "DC", nation: "Francia", age: 25, overall: 85 },
  { name: "Khvicha Kvaratskhelia", role: "AS", nation: "Georgia", age: 25, overall: 84 },
  { name: "Jamal Musiala", role: "COC", nation: "Germania", age: 23, overall: 84 },
  { name: "Trent Alexander-Arnold", role: "TD", nation: "Inghilterra", age: 27, overall: 84 },
  { name: "Pedri", role: "CC", nation: "Spagna", age: 23, overall: 84 },
  { name: "Dusan Vlahovic", role: "ATT", nation: "Serbia", age: 26, overall: 83 },
  { name: "Frenkie de Jong", role: "CC", nation: "Paesi Bassi", age: 29, overall: 83 },
  { name: "Luis Diaz", role: "AS", nation: "Colombia", age: 29, overall: 83 },
  { name: "Joao Cancelo", role: "TD", nation: "Portogallo", age: 32, overall: 83 },
  { name: "Kim Min-jae", role: "DC", nation: "Corea del Sud", age: 29, overall: 83 },
  { name: "Sergej Milinkovic-Savic", role: "CC", nation: "Serbia", age: 31, overall: 82 },
  { name: "Sandro Tonali", role: "MED", nation: "Italia", age: 26, overall: 82 },
  { name: "Gabriel Martinelli", role: "AS", nation: "Brasile", age: 25, overall: 82 },
  { name: "Diogo Jota", role: "ATT", nation: "Portogallo", age: 29, overall: 82 },
  { name: "Giorgio Scalvini", role: "DC", nation: "Italia", age: 22, overall: 80 },
  { name: "Takefusa Kubo", role: "AD", nation: "Giappone", age: 25, overall: 80 },
  { name: "Benjamin Sesko", role: "ATT", nation: "Slovenia", age: 23, overall: 79 },
  { name: "Destiny Udogie", role: "TS", nation: "Italia", age: 23, overall: 79 },
  { name: "Manuel Ugarte", role: "MED", nation: "Uruguay", age: 25, overall: 79 },
  { name: "Ivan Provedel", role: "POR", nation: "Italia", age: 32, overall: 78 },
  { name: "Riccardo Orsolini", role: "AD", nation: "Italia", age: 29, overall: 78 },
  { name: "Evan Ferguson", role: "ATT", nation: "Irlanda", age: 21, overall: 77 },
  { name: "Morten Hjulmand", role: "MED", nation: "Danimarca", age: 27, overall: 77 },
  { name: "Piero Hincapie", role: "DC", nation: "Ecuador", age: 24, overall: 77 },
  { name: "Milos Kerkez", role: "TS", nation: "Ungheria", age: 22, overall: 76 },
  { name: "Yunus Musah", role: "CC", nation: "Stati Uniti", age: 23, overall: 76 },
  { name: "Johan Bakayoko", role: "AD", nation: "Belgio", age: 23, overall: 76 }
];

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

function now() {
  return Date.now();
}

function touchLobby(lobby) {
  lobby.updatedAt = now();
}

function cleanupLobbies() {
  const cutoff = now() - LOBBY_TTL_MS;
  for (const [code, lobby] of lobbies.entries()) {
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

function code() {
  let value = "";
  do {
    value = Math.random().toString(36).slice(2, 8).toUpperCase();
  } while (lobbies.has(value));
  return value;
}

function newPlayer(name, credits, formation, isHost = false) {
  return {
    id: Math.random().toString(36).slice(2, 12),
    name: String(name || "Manager").slice(0, 18),
    credits,
    squad: [],
    formation,
    tactic: "balanced",
    ready: false,
    isHost,
    stats: emptyStats()
  };
}

function emptyStats() {
  return { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 };
}

function emptyPlayerStats() {
  return { apps: 0, goals: 0, assists: 0 };
}

function publicLobby(lobby, playerId) {
  touchLobby(lobby);
  updateAuction(lobby);
  return {
    code: lobby.code,
    status: lobby.status,
    settings: lobby.settings,
    playerId,
    hostId: lobby.hostId,
    auction: lobby.auction,
    currentPlayer: lobby.auction.index < lobby.pool.length ? lobby.pool[lobby.auction.index] : null,
    managers: lobby.managers.map((manager) => ({ ...manager, isUser: manager.id === playerId })),
    log: lobby.log.slice(-30).reverse(),
    results: lobby.results
  };
}

function startAuction(lobby) {
  lobby.status = "auction";
  lobby.auction.index = 0;
  lobby.auction.currentBid = 0;
  lobby.auction.leaderId = null;
  lobby.auction.endsAt = Date.now() + 10000;
  lobby.log.push("Asta avviata dall'host");
}

function updateAuction(lobby) {
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
      winner.squad.push({ ...player, price: lobby.auction.currentBid, generated: false, stats: emptyPlayerStats() });
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
    lobby.auction.endsAt = Date.now() + 10000;
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
  if (lobby.auction.endsAt - Date.now() < 3000) {
    lobby.auction.endsAt = Date.now() + 3000;
  }
  lobby.log.push(`${manager.name} offre ${amount}`);
  return true;
}

function buildLineup(manager, formation) {
  const available = [...manager.squad].sort((a, b) => b.overall - a.overall);
  return formationNeeds[formation].map((role) => {
    const index = available.findIndex((player) => player.role === role);
    if (index === -1) return null;
    return available.splice(index, 1)[0];
  });
}

function fillVacancies(lobby, playerId) {
  const manager = lobby.managers.find((item) => item.id === playerId);
  if (!manager) return 0;
  const needed = [...formationNeeds[lobby.settings.formation]];
  manager.squad.forEach((player) => {
    const index = needed.indexOf(player.role);
    if (index !== -1) needed.splice(index, 1);
  });
  needed.forEach((role) => manager.squad.push(makeGenerated(role)));
  manager.ready = false;
  return needed.length;
}

function makeGenerated(role) {
  const first = generatedNames.first[Math.floor(Math.random() * generatedNames.first.length)];
  const last = generatedNames.last[Math.floor(Math.random() * generatedNames.last.length)];
  return {
    name: `${first} ${last}`,
    role,
    nation: "Academy",
    age: 18 + Math.floor(Math.random() * 15),
    overall: 60 + Math.floor(Math.random() * 16),
    price: 0,
    generated: true,
    stats: emptyPlayerStats()
  };
}

function markReady(lobby, playerId, tactic) {
  const manager = lobby.managers.find((item) => item.id === playerId);
  if (!manager) return;
  fillVacancies(lobby, playerId);
  manager.tactic = tactic || "balanced";
  manager.ready = true;
  if (lobby.managers.every((item) => item.ready)) {
    simulate(lobby);
  }
}

function simulate(lobby) {
  lobby.managers.forEach((manager) => {
    manager.stats = emptyStats();
    manager.squad.forEach((player) => {
      player.stats = emptyPlayerStats();
    });
  });

  for (let round = 0; round < 2; round += 1) {
    for (let i = 0; i < lobby.managers.length; i += 1) {
      for (let j = i + 1; j < lobby.managers.length; j += 1) {
        playMatch(lobby, round === 0 ? lobby.managers[i] : lobby.managers[j], round === 0 ? lobby.managers[j] : lobby.managers[i]);
      }
    }
  }

  const standings = [...lobby.managers].sort((a, b) => {
    const gdA = a.stats.gf - a.stats.ga;
    const gdB = b.stats.gf - b.stats.ga;
    return b.stats.points - a.stats.points || gdB - gdA || b.stats.gf - a.stats.gf;
  });
  const playerStats = lobby.managers
    .flatMap((manager) => manager.squad.map((player) => ({ ...player, team: manager.name })))
    .sort((a, b) => b.stats.goals - a.stats.goals || b.stats.assists - a.stats.assists || b.overall - a.overall)
    .slice(0, 10);
  lobby.results = { standings, playerStats };
  lobby.status = "results";
  lobby.log.push("Campionato simulato. Risultati disponibili.");
}

function playMatch(lobby, home, away) {
  const homeStrength = teamStrength(lobby, home);
  const awayStrength = teamStrength(lobby, away);
  const homeGoals = sampleGoals(Math.max(0.2, 1.25 + (homeStrength - awayStrength) / 18));
  const awayGoals = sampleGoals(Math.max(0.2, 1.05 + (awayStrength - homeStrength) / 18));
  for (let i = 0; i < homeGoals; i += 1) assignGoal(lobby, home);
  for (let i = 0; i < awayGoals; i += 1) assignGoal(lobby, away);
  updateStats(home, homeGoals, awayGoals);
  updateStats(away, awayGoals, homeGoals);
}

function teamStrength(lobby, manager) {
  const starters = buildLineup(manager, lobby.settings.formation).filter(Boolean);
  if (!starters.length) return 50;
  const avg = starters.reduce((sum, player) => sum + player.overall, 0) / starters.length;
  return avg * (manager.tactic === "balanced" ? 1 : 1.015);
}

function sampleGoals(expected) {
  let goals = 0;
  for (let i = 0; i < 5; i += 1) {
    if (Math.random() < Math.min(0.82, expected / 5)) goals += 1;
  }
  return Math.min(7, goals);
}

function assignGoal(lobby, manager) {
  const starters = buildLineup(manager, lobby.settings.formation).filter(Boolean);
  const scorer = weightedPick(starters, "goals");
  if (!scorer) return;
  scorer.stats.goals += 1;
  const assistPool = starters.filter((player) => player !== scorer && player.role !== "POR");
  if (assistPool.length && Math.random() < 0.78) weightedPick(assistPool, "assists").stats.assists += 1;
}

function weightedPick(items, type) {
  const weighted = items.map((player) => ({ player, weight: Math.max(0.05, (roleWeights[player.role]?.[type] || 0.4) * (player.overall / 75)) }));
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
      credits: clamp(body.credits, 250, 1200),
      rounds: clamp(body.rounds, 12, players.length),
      formation: formationNeeds[body.formation] ? body.formation : "4-3-3"
    };
    const lobbyCode = code();
    const host = newPlayer(body.name, settings.credits, settings.formation, true);
    const lobby = {
      code: lobbyCode,
      hostId: host.id,
      status: "lobby",
      settings,
      managers: [host],
      pool: shuffle(players).slice(0, settings.rounds),
      auction: { index: 0, currentBid: 0, leaderId: null, endsAt: 0 },
      log: [],
      results: null,
      createdAt: now(),
      updatedAt: now()
    };
    lobbies.set(lobbyCode, lobby);
    return json(res, 200, { code: lobbyCode, playerId: host.id });
  }

  const lobby = lobbies.get(parts[2]);
  if (!lobby) return json(res, 404, { error: "Lobby non trovata" });
  touchLobby(lobby);

  if (req.method === "POST" && parts[3] === "join") {
    if (lobby.status !== "lobby") return json(res, 400, { error: "Asta gia iniziata" });
    const manager = newPlayer(body.name, lobby.settings.credits, lobby.settings.formation);
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
    startAuction(lobby);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "bid") {
    placeBid(lobby, playerId, body.increment);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "fill") {
    fillVacancies(lobby, playerId);
    return json(res, 200, publicLobby(lobby, playerId));
  }
  if (req.method === "POST" && parts[3] === "ready") {
    markReady(lobby, playerId, body.tactic);
    return json(res, 200, publicLobby(lobby, playerId));
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
    const type = ext === ".js" ? "text/javascript" : ext === ".css" ? "text/css" : "text/html";
    res.writeHead(200, { "Content-Type": type });
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
