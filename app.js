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
  { name: "Ousmane Diomande", role: "DC", nation: "Costa d'Avorio", age: 22, overall: 80 },
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

const state = {
  view: "home",
  mode: "single",
  config: null,
  managers: [],
  auctionPool: [],
  playerIndex: 0,
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
  multiplayer: {
    code: null,
    playerId: null,
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
  missing.forEach((slot) => manager.squad.push(makeGeneratedPlayer(slot.role)));
  manager.lineup = {};
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

function startSinglePlayer() {
  stopMultiplayerPolling();
  state.mode = "single";
  const difficultyKey = $("difficultySelect").value;
  const difficulty = difficulties[difficultyKey];
  const credits = clampNumber($("creditsInput").value, 250, 1200);
  const rounds = clampNumber($("auctionPlayersInput").value, 12, Math.min(48, players.length));
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
  state.auctionPool = shuffle(players).slice(0, state.config.rounds);
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
    state.mode = "multi";
    const payload = {
      name: $("hostNameInput").value
    };
    const result = await api("/api/lobbies", payload);
    state.multiplayer.code = result.code;
    state.multiplayer.playerId = result.playerId;
    state.multiplayer.isHost = true;
    showView("lobby");
    startMultiplayerPolling();
  } catch (error) {
    setMultiplayerStatus(error.message);
  }
}

async function joinMultiplayerLobby() {
  try {
    state.mode = "multi";
    const code = $("joinCodeInput").value.trim().toUpperCase();
    const result = await api(`/api/lobbies/${code}/join`, { name: $("joinNameInput").value });
    state.multiplayer.code = result.code;
    state.multiplayer.playerId = result.playerId;
    state.multiplayer.isHost = false;
    showView("lobby");
    startMultiplayerPolling();
  } catch (error) {
    setMultiplayerStatus(error.message);
  }
}

function startMultiplayerPolling() {
  stopMultiplayerPolling();
  pollMultiplayer();
  state.multiplayer.pollId = setInterval(pollMultiplayer, 800);
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
  state.config = {
    label: "Multiplayer",
    credits: snapshot.settings.credits,
    rounds: snapshot.settings.rounds,
    rivals: Math.max(0, snapshot.managers.length - 1),
    formation: snapshot.settings.formation,
    tactic: getUser()?.tactic || "balanced"
  };
  state.managers = snapshot.managers;
  state.auctionPool = snapshot.currentPlayer ? [snapshot.currentPlayer] : [];
  state.playerIndex = snapshot.auction?.index || 0;
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
    $("tacticSelect").value = getUser()?.tactic || "balanced";
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
          <small>Tiri ${match.shots.home}-${match.shots.away}</small>
          ${(match.events || []).map((event) => `<span>${event}</span>`).join("")}
        </div>
      `
    )
    .join("");
  $("liveMatchFeed").insertAdjacentHTML("afterbegin", html);
  renderLiveTable(round.standings || []);
  state.liveSimulation.roundIndex += 1;
}

function renderLiveTable(standings) {
  $("liveTable").innerHTML = `
    <div class="league-header">
      <span>#</span><span>Squadra</span><span>PG</span><span>V</span><span>N</span><span>P</span><span>GF</span><span>GS</span><span>DR</span><span>PTS</span>
    </div>
    ${standings
      .map((manager, index) => {
        const gd = manager.stats.gf - manager.stats.ga;
        return `<div class="league-row"><span>${index + 1}</span><strong>${manager.name}</strong><span>${manager.stats.played}</span><span>${manager.stats.won}</span><span>${manager.stats.drawn}</span><span>${manager.stats.lost}</span><span>${manager.stats.gf}</span><span>${manager.stats.ga}</span><span>${gd > 0 ? `+${gd}` : gd}</span><strong>${manager.stats.points}</strong></div>`;
      })
      .join("")}
  `;
}

function renderLobby(snapshot) {
  const shareLink = `${window.location.origin}?join=${snapshot.code}`;
  const user = snapshot.managers.find((manager) => manager.id === state.multiplayer.playerId);
  $("lobbyCodeLabel").textContent = snapshot.code;
  $("lobbyShareLink").textContent = shareLink;
  $("lobbySettingsLabel").textContent = `${snapshot.settings.formation} - ${snapshot.settings.credits} crediti - ${snapshot.settings.rounds} giocatori in asta`;
  $("lobbyColorSelect").innerHTML = playerColors.map((color) => `<option value="${color}">${color}</option>`).join("");
  $("lobbyColorSelect").value = user?.color || playerColors[0];
  $("lobbyFormationSelect").value = user?.formation || snapshot.settings.formation;
  $("lobbyReadyBtn").textContent = user?.ready ? "Non pronto" : "Pronto";
  $("lobbyCreditsInput").value = snapshot.settings.credits;
  $("lobbyRoundsInput").value = snapshot.settings.rounds;
  $("lobbyBotsInput").value = snapshot.settings.botCount || 0;
  $("lobbyBaseFormationSelect").value = snapshot.settings.formation;
  ["lobbyBaseFormationSelect", "lobbyCreditsInput", "lobbyRoundsInput", "lobbyBotsInput", "saveLobbySettingsBtn"].forEach((id) => {
    $(id).disabled = !state.multiplayer.isHost;
  });
  $("lobbyPlayersList").innerHTML = snapshot.managers
    .map((manager) => `<div class="rival-card" style="border-left: 6px solid ${manager.color || "#1e8e4d"}"><div class="rival-card-head"><strong>${manager.name}</strong><span>${manager.ready ? "V" : "-"} ${manager.id === snapshot.hostId ? "Host" : ""}</span></div><div class="rival-metrics"><span>${manager.formation}</span></div></div>`)
    .join("");
  $("startLobbyAuctionBtn").disabled = !state.multiplayer.isHost || snapshot.managers.length < 2 || !snapshot.managers.every((manager) => manager.ready);
}

function renderCountdownAuction() {
  const seconds = Math.ceil(state.timeLeft);
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
  await api(`/api/lobbies/${state.multiplayer.code}/start`, { playerId: state.multiplayer.playerId });
  pollMultiplayer();
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
  await api(`/api/lobbies/${state.multiplayer.code}/ready`, {
    playerId: state.multiplayer.playerId,
    tactic: $("tacticSelect").value,
    lineup: getUser()?.lineup || {}
  });
  pollMultiplayer();
}

async function updateLobbyProfile() {
  await api(`/api/lobbies/${state.multiplayer.code}/profile`, {
    playerId: state.multiplayer.playerId,
    color: $("lobbyColorSelect").value,
    formation: $("lobbyFormationSelect").value
  });
  pollMultiplayer();
}

async function toggleLobbyReady() {
  const user = getUser();
  await api(`/api/lobbies/${state.multiplayer.code}/lobby-ready`, {
    playerId: state.multiplayer.playerId,
    ready: !user?.ready
  });
  pollMultiplayer();
}

async function saveLobbySettings() {
  await api(`/api/lobbies/${state.multiplayer.code}/settings`, {
    playerId: state.multiplayer.playerId,
    credits: $("lobbyCreditsInput").value,
    rounds: $("lobbyRoundsInput").value,
    botCount: $("lobbyBotsInput").value,
    formation: $("lobbyBaseFormationSelect").value
  });
  pollMultiplayer();
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
  if (state.timeLeft < 3) {
    state.timeLeft = 3;
  }
  addLog(`${manager.name} offre ${amount} per ${currentPlayer().name}`);
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
  const remainingRoles = starters.map((player) => player.role);
  const covered = formationNeeds[state.config.formation].filter((role) => {
    const index = remainingRoles.indexOf(role);
    if (index === -1) return false;
    remainingRoles.splice(index, 1);
    return true;
  });
  return covered.length / formationNeeds[state.config.formation].length;
}

function renderSquadBuilder() {
  const user = getUser();
  if (!user) return;
  ensurePlayerStats(user);
  ensureLineupAssignments(user);
  const lineup = buildLineup(user);
  const missing = lineup.starters.filter((slot) => !slot.player).length;
  const generated = user.squad.filter((player) => player.generated).length;

  $("lineupSummary").textContent = `${user.formation || state.config.formation} - ${lineup.starters.length - missing}/11 titolari pronti. Giocatori generati: ${generated}.`;
  $("simulateBtn").disabled = missing > 0 || (state.mode === "multi" && user.ready);
  $("simulateBtn").textContent = state.mode === "multi" ? (user.ready ? "In attesa degli altri" : "Pronto") : "Simula stagione";

  $("footballPitch").innerHTML = lineup.starters
    .map((slot) => {
      const player = slot.player;
      const statusClass = player ? "filled" : "vacant";
      const name = player ? player.name : "Posto vacante";
      const effective = player ? effectiveOverall(player, slot.role) : "--";
      const source = player && player.generated ? "Auto" : player ? "Asta" : "Serve giocatore";
      return `
        <div class="pitch-slot ${statusClass}" data-slot-id="${slot.id}" style="left:${slot.x}%; top:${slot.y}%;">
          <strong>${slot.role}</strong>
          <span draggable="${player ? "true" : "false"}" data-player-id="${player ? player.uid : ""}">${name}</span>
          <small>${source} - OVR ${effective}${player && player.role !== slot.role ? " fuori ruolo" : ""}</small>
        </div>
      `;
    })
    .join("");

  $("benchList").innerHTML = lineup.bench.length
    ? lineup.bench
        .map(
          (player) => `
            <div class="bench-item" draggable="true" data-player-id="${player.uid}">
              <strong>${player.role}</strong>
              <span>${player.name}<small>${player.generated ? "Auto" : "Asta"} - OVR ${player.overall}</small></span>
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
  document.querySelectorAll("[data-player-id]").forEach((element) => {
    element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", element.dataset.playerId);
    });
  });
  document.querySelectorAll("[data-slot-id], [data-bench-drop]").forEach((element) => {
    element.addEventListener("dragover", (event) => event.preventDefault());
    element.addEventListener("drop", (event) => {
      event.preventDefault();
      movePlayerToSlot(event.dataTransfer.getData("text/plain"), element.dataset.slotId || null);
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
  renderSquadBuilder();
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

  $("roundLabel").textContent = state.mode === "multi" ? `Chiamati ${state.playerIndex}/${state.config.rounds}` : `Asta ${state.playerIndex + 1}/${state.auctionPool.length}`;
  $("timerLabel").textContent = String(Math.ceil(state.timeLeft));
  $("timerLabel").classList.toggle("hot", state.timeLeft < 3.5);
  $("playerRole").textContent = player.role;
  $("playerName").textContent = player.name;
  $("playerNation").textContent = player.nation;
  $("playerAge").textContent = `${player.age} anni`;
  $("playerOverall").textContent = player.overall;
  $("currentBid").textContent = state.currentBid;
  $("currentLeader").textContent = leader ? `In vantaggio: ${leader.name}` : "Nessuna offerta";

  document.querySelectorAll("[data-bid]").forEach((button) => {
    const increment = Number(button.dataset.bid);
    button.disabled = !state.running || state.currentBid + increment > getUser().credits || state.leaderId === currentUserId();
  });
}

function renderManagers() {
  const user = getUser();
  $("userCredits").textContent = user.credits;
  $("userFormation").textContent = state.config.formation;
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
          <div class="squad-item">
            <strong>${player.role}</strong>
            <span>${player.name}<br><small>${player.price} cr - ${player.nation}</small></span>
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
  const starters = lineup.starters.map((slot) => slot.player).filter(Boolean);
  if (!starters.length) return 50;
  const avg = starters.reduce((total, player) => total + player.overall, 0) / starters.length;
  const coverage = formationCoverage(starters);
  const tacticBonus = state.config.tactic === "balanced" ? 1 : 1.015;
  return avg * (0.86 + coverage * 0.14) * tacticBonus;
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
  const assistPool = starters.filter((player) => player !== scorer && player.role !== "POR");
  if (assistPool.length && Math.random() < 0.78) {
    weightedPick(assistPool, "assists").stats.assists += 1;
  }
}

function playMatch(home, away) {
  const homeStrength = teamStrength(home);
  const awayStrength = teamStrength(away);
  const homeEdge = 0.25;
  const homeExpected = Math.max(0.2, 1.15 + (homeStrength - awayStrength) / 18 + homeEdge);
  const awayExpected = Math.max(0.2, 1.05 + (awayStrength - homeStrength) / 18);
  const homeGoals = sampleGoals(homeExpected);
  const awayGoals = sampleGoals(awayExpected);

  for (let i = 0; i < homeGoals; i += 1) assignGoal(home);
  for (let i = 0; i < awayGoals; i += 1) assignGoal(away);

  updateTeamStats(home, homeGoals, awayGoals);
  updateTeamStats(away, awayGoals, homeGoals);
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

function simulateSeason() {
  if (state.mode === "multi") {
    multiplayerReady();
    return;
  }
  if (vacantSlots(getUser()).length) {
    renderSquadBuilder();
    return;
  }

  state.config.tactic = $("tacticSelect").value;
  state.managers.filter((manager) => !manager.isUser).forEach((manager) => fillVacantSlots(manager));
  state.managers.forEach(ensurePlayerStats);
  resetSeasonStats();

  for (let round = 0; round < 2; round += 1) {
    for (let i = 0; i < state.managers.length; i += 1) {
      for (let j = i + 1; j < state.managers.length; j += 1) {
        const home = round === 0 ? state.managers[i] : state.managers[j];
        const away = round === 0 ? state.managers[j] : state.managers[i];
        playMatch(home, away);
      }
    }
  }

  state.simulation = true;
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
  $("resultSummary").textContent = `Difficolta ${state.config.label}, modulo ${state.config.formation}. Calendario andata e ritorno contro ${state.managers.length - 1} rivali.`;
  $("standingsList").innerHTML = `
    <div class="league-header">
      <span>#</span>
      <span>Squadra</span>
      <span>PG</span>
      <span>V</span>
      <span>N</span>
      <span>P</span>
      <span>GF</span>
      <span>GS</span>
      <span>DR</span>
      <span>PTS</span>
    </div>
    ${ranking
      .map((manager, index) => {
        const goalDifference = manager.stats.gf - manager.stats.ga;
        const differenceLabel = goalDifference > 0 ? `+${goalDifference}` : goalDifference;
        return `
        <div class="league-row ${manager.isUser ? "user-row" : ""}">
          <span>${index + 1}</span>
          <strong>${manager.name}</strong>
          <span>${manager.stats.played}</span>
          <span>${manager.stats.won}</span>
          <span>${manager.stats.drawn}</span>
          <span>${manager.stats.lost}</span>
          <span>${manager.stats.gf}</span>
          <span>${manager.stats.ga}</span>
          <span>${differenceLabel}</span>
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
  const calendar = document.createElement("div");
  calendar.className = "final-calendar";
  calendar.innerHTML = `<h2>Calendario</h2>${state.simulation.rounds
    .map(
      (round) => `
        <div class="calendar-round">
          <strong>Giornata ${round.round}</strong>
          ${round.matches
            .map((match) => `<p>${match.home} ${match.homeGoals}-${match.awayGoals} ${match.away} - Tiri ${match.shots.home}-${match.shots.away}<br><small>${(match.events || []).slice(0, 4).join(" | ")}</small></p>`)
            .join("")}
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
  const rounds = clampNumber($("auctionPlayersInput").value, 12, Math.min(48, players.length));
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
$("lobbyColorSelect").addEventListener("change", updateLobbyProfile);
$("lobbyFormationSelect").addEventListener("change", updateLobbyProfile);
$("lobbyReadyBtn").addEventListener("click", toggleLobbyReady);
$("saveLobbySettingsBtn").addEventListener("click", saveLobbySettings);
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
