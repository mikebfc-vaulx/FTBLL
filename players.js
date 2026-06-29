<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FTBALL Friends</title>
    <meta name="theme-color" content="#07110d" />
    <link rel="icon" href="ftball-logo.svg?v=2" type="image/svg+xml" />
    <link rel="stylesheet" href="styles.css?v=14" />
    <link rel="stylesheet" href="modern-ui.css?v=14" />
  </head>
  <body data-view="home">
    <main class="app-shell">
      <section class="topbar">
        <div class="brand-lockup">
          <img class="brand-logo" src="ftball-logo.svg?v=2" alt="" width="48" height="56" />
          <div>
            <p class="eyebrow">Football auction manager</p>
            <h1>FTBALL <span>Friends</span></h1>
          </div>
        </div>
        <nav class="phase-tabs" aria-label="Fasi della partita">
          <span data-phase="lobby">Lobby</span>
          <span data-phase="game">Asta</span>
          <span data-phase="squad">Rosa</span>
          <span data-phase="live">Campionato</span>
          <span data-phase="results">Risultati</span>
        </nav>
        <button id="resetBtn" class="ghost-button" type="button">Nuova partita</button>
      </section>

      <section id="homeView" class="view active">
        <div class="hero-panel">
          <div>
            <p class="eyebrow">Il mercato apre ora</p>
            <h2>Costruisci la tua squadra. Sfida tutti.</h2>
            <p class="muted">
              Asta flash, gestione della rosa e un'intera stagione da vivere con gli amici o contro l'intelligenza artificiale.
            </p>
          </div>
          <div class="mode-grid">
            <button id="singleModeBtn" class="mode-card" type="button">
              <span class="mode-index">01</span>
              <span>Single player</span>
              <strong>Asta contro IA</strong>
              <small>Inizia subito</small>
            </button>
            <button id="multiModeBtn" class="mode-card" type="button">
              <span class="mode-index">02</span>
              <span>Multiplayer</span>
              <strong>Lobby amici</strong>
              <small>Crea o entra</small>
            </button>
          </div>
        </div>
      </section>

      <section id="multiView" class="view">
        <div class="setup-grid">
          <div class="panel">
            <p class="eyebrow">Multiplayer</p>
            <h2>Crea lobby</h2>
            <div class="field-stack">
              <label>
                Nome host
                <input id="hostNameInput" type="text" maxlength="18" value="Host" />
              </label>
            </div>
            <button id="createLobbyBtn" class="primary-button" type="button">Crea lobby host</button>
          </div>

          <div class="panel">
            <p class="eyebrow">Entra</p>
            <h2>Unisciti a una lobby</h2>
            <div class="field-stack">
              <label>
                Il tuo nome
                <input id="joinNameInput" type="text" maxlength="18" value="Manager" />
              </label>
              <label>
                Codice lobby
                <input id="joinCodeInput" type="text" maxlength="6" placeholder="ABC123" />
              </label>
            </div>
            <button id="joinLobbyBtn" class="primary-button" type="button">Entra in lobby</button>
            <p id="multiStatusText" class="setup-summary">Avvia server.js per usare il multiplayer.</p>
          </div>
        </div>
      </section>

      <section id="lobbyView" class="view">
        <div class="lobby-layout">
          <div class="panel lobby-panel">
            <p class="eyebrow">Lobby multiplayer</p>
            <h2>Codice: <span id="lobbyCodeLabel">------</span></h2>
            <div class="share-box">
              <span id="lobbyShareLink">Link non disponibile</span>
              <button id="copyLobbyLinkBtn" class="ghost-button" type="button">Copia link</button>
            </div>
            <p id="lobbySettingsLabel" class="muted"></p>
            <div class="lobby-profile">
              <div class="color-picker-field">
                <span>Colore</span>
                <button id="lobbyColorButton" class="single-color-button" type="button" aria-label="Cambia colore"></button>
                <input id="lobbyColorInput" type="hidden" value="#1e8e4d" />
              </div>
              <label>
                Tua formazione
                <select id="lobbyFormationSelect">
                  <option value="4-3-3">4-3-3</option>
                  <option value="4-4-2">4-4-2</option>
                  <option value="3-5-2">3-5-2</option>
                  <option value="4-2-3-1">4-2-3-1</option>
                  <option value="3-4-3">3-4-3</option>
                </select>
              </label>
              <button id="lobbyReadyBtn" class="primary-button" type="button">Pronto</button>
            </div>
            <p id="lobbyActionStatus" class="muted status-text"></p>
            <div id="lobbyPlayersList" class="lobby-players-list"></div>
            <button id="startLobbyAuctionBtn" class="primary-button" type="button">Avvia asta host</button>
          </div>
          <aside class="panel lobby-settings-panel">
            <p class="eyebrow">Settaggi host</p>
            <h2>Partita</h2>
            <div class="field-stack">
              <label>
                Crediti
                <input id="lobbyCreditsInput" type="number" min="250" max="1200" step="10" />
              </label>
              <label>
                Giocatori in asta
                <input id="lobbyRoundsInput" type="number" min="12" max="300" step="1" />
              </label>
              <label>
                Bot simulazione
                <input id="lobbyBotsInput" type="number" min="0" max="20" step="1" />
              </label>
              <label id="lobbyBotDifficultyField" class="bot-difficulty-field is-hidden">
                Difficolta bot
                <select id="lobbyBotDifficultySelect">
                  <option value="easy">Facile</option>
                  <option value="normal" selected>Media</option>
                  <option value="hard">Difficile</option>
                </select>
              </label>
            </div>
            <button id="saveLobbySettingsBtn" class="ghost-button" type="button">Salva settaggi</button>
          </aside>
        </div>
      </section>

      <section id="setupView" class="view">
        <div class="setup-grid">
          <div class="panel">
            <p class="eyebrow">Single player</p>
            <h2>Imposta la partita</h2>
            <div class="field-stack">
              <label>
                Difficolta
                <select id="difficultySelect">
                  <option value="easy">Facile</option>
                  <option value="normal" selected>Normale</option>
                  <option value="hard">Difficile</option>
                  <option value="expert">Esperto</option>
                </select>
              </label>
              <label>
                Modulo
                <select id="formationSelect">
                  <option value="4-3-3">4-3-3</option>
                  <option value="4-4-2">4-4-2</option>
                  <option value="3-5-2">3-5-2</option>
                  <option value="4-2-3-1">4-2-3-1</option>
                  <option value="3-4-3">3-4-3</option>
                </select>
              </label>
              <label>
                Crediti iniziali
                <input id="creditsInput" type="number" min="250" max="1200" step="10" value="650" />
              </label>
              <label>
                Giocatori in asta
                <input id="auctionPlayersInput" type="number" min="12" max="300" step="1" value="24" />
              </label>
              <label>
                IA in asta
                <input id="aiPlayersInput" type="number" min="1" max="8" step="1" value="3" />
              </label>
            </div>
            <p id="setupSummary" class="setup-summary">Budget 650 cr - 24 giocatori in asta - 3 IA asta - campionato a 20 squadre</p>
            <button id="startGameBtn" class="primary-button" type="button">Avvia asta</button>
          </div>
          <div class="panel compact">
            <p class="eyebrow">Regole rapide</p>
            <ul class="rules-list">
              <li>Budget iniziale e numero giocatori personalizzabili.</li>
              <li>Ogni giocatore resta 10 secondi in asta.</li>
              <li>Ogni rilancio negli ultimi secondi riporta il timer a 5.</li>
              <li>Vince chi chiude con rosa piu forte ed equilibrata.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="gameView" class="view">
        <div class="game-layout">
          <aside class="panel manager-panel">
            <p id="userPanelTitle" class="eyebrow">Manager</p>
            <h2>La tua squadra</h2>
            <div class="stat-row">
              <span>Crediti</span>
              <strong id="userCredits">0</strong>
            </div>
            <div class="stat-row">
              <span>Modulo</span>
              <strong id="userFormation">4-3-3</strong>
            </div>
            <div class="stat-row">
              <span>Valutazione</span>
              <strong id="teamRating">0</strong>
            </div>
            <div class="mini-lineup-block">
              <p class="eyebrow">Anteprima modulo</p>
              <div id="auctionFitMessage" class="fit-message">In attesa del prossimo giocatore.</div>
              <div id="miniFormation" class="mini-formation"></div>
            </div>
            <div id="squadList" class="squad-list"></div>
          </aside>

          <section class="auction-stage">
            <div class="auction-card">
              <div class="auction-header">
                <span id="roundLabel">Asta 1/1</span>
                <span id="timerLabel" class="timer">10.0</span>
              </div>
              <p id="playerRole" class="role-pill">ATT</p>
              <h2 id="playerName">Nome giocatore</h2>
              <div class="player-meta">
                <span id="playerNation">Italia</span>
                <span id="playerAge">24 anni</span>
                <span>OVR <strong id="playerOverall">80</strong></span>
              </div>
              <div class="current-bid">
                <span>Offerta attuale</span>
                <strong id="currentBid">0</strong>
                <small id="currentLeader">Nessuna offerta</small>
              </div>
              <div class="bid-controls">
                <button data-bid="1" type="button">+1</button>
                <button data-bid="5" type="button">+5</button>
                <button data-bid="10" type="button">+10</button>
                <button data-bid="25" type="button">+25</button>
              </div>
              <p id="auctionMessage" class="muted status-text">Preparati al primo nome.</p>
            </div>
          </section>

          <aside class="panel rivals-panel">
            <p id="rivalsTitle" class="eyebrow">Avversari AI</p>
            <h2>Lobby</h2>
            <div id="rivalsList" class="rivals-list"></div>
            <div class="log-box">
              <p class="eyebrow">Log asta</p>
              <div id="auctionLog"></div>
            </div>
          </aside>
        </div>
      </section>

      <section id="squadView" class="view">
        <div class="squad-builder">
          <div class="panel squad-toolbar">
            <div>
              <p class="eyebrow">Gestione rosa</p>
              <h2>Schiera i titolari</h2>
              <p id="lineupSummary" class="muted"></p>
            </div>
            <div class="toolbar-actions">
              <button id="autoFillBtn" class="ghost-button" type="button">Genera posti vacanti</button>
              <button id="simulateBtn" class="primary-button" type="button">Simula stagione</button>
            </div>
          </div>

          <section class="panel tactical-workbench">
            <div class="tactical-workbench-head">
              <div>
                <p class="eyebrow">Piano partita</p>
                <h2>Tattica avanzata</h2>
              </div>
              <div id="tacticalCompatibility" class="compatibility-score">Compatibilita <strong>--</strong></div>
            </div>
            <div class="advanced-tactics-grid">
              <label class="tactic-tab tactic-tab-mentality">Mentalita
                <select id="mentalitySelect">
                  <option value="cautious">Prudente</option>
                  <option value="balanced">Equilibrata</option>
                  <option value="offensive">Offensiva</option>
                </select>
              </label>
              <label class="tactic-tab tactic-tab-buildup">Costruzione
                <select id="buildupSelect">
                  <option value="mixed">Mista</option>
                  <option value="possession">Possesso</option>
                  <option value="direct">Verticale</option>
                  <option value="wide">Fasce</option>
                </select>
              </label>
              <label class="tactic-tab tactic-tab-pressing">Pressing
                <select id="pressingSelect">
                  <option value="low">Basso</option>
                  <option value="medium">Medio</option>
                  <option value="high">Alto</option>
                </select>
              </label>
              <label class="tactic-tab tactic-tab-line">Linea difensiva
                <select id="defensiveLineSelect">
                  <option value="low">Bassa</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </label>
              <label class="captain-control">Capitano
                <select id="captainSelect"></select>
              </label>
            </div>
            <div id="tacticalEffects" class="tactical-effects" aria-live="polite"></div>
            <div class="tactical-breakdown" aria-label="Dettaglio bonus e malus tattici">
              <div class="tactical-breakdown-head"><span>Impostazione</span><span>Scelta</span><span>Pro</span><span>Contro</span></div>
              <div id="tacticalBreakdown"></div>
            </div>
            <div class="tactical-insights">
              <p id="tacticalSummary" class="muted"></p>
              <p id="captainSummary" class="captain-summary"></p>
            </div>
          </section>

          <div id="squadStatsBox" class="squad-stats-box"></div>

          <div class="lineup-layout">
            <section class="pitch-panel">
              <div id="footballPitch" class="football-pitch"></div>
            </section>
            <aside class="panel bench-panel">
              <p class="eyebrow">Panchina</p>
              <h2>Disponibili</h2>
              <div id="benchList" class="bench-list"></div>
            </aside>
          </div>
        </div>
      </section>

      <section id="resultsView" class="view">
        <div class="season-results">
          <div class="panel results-panel">
            <p class="eyebrow">Stagione simulata</p>
            <h2 id="resultTitle">Classifica finale</h2>
            <div id="winnerCelebration" class="winner-celebration" aria-live="polite"></div>
            <p id="resultSummary" class="muted"></p>
            <div id="standingsList" class="league-table"></div>
            <button id="playAgainBtn" class="primary-button" type="button">Gioca ancora</button>
          </div>
          <div class="panel player-stats-panel">
            <p class="eyebrow">Statistiche giocatori</p>
            <h2>Gol e assist</h2>
            <h3 class="stats-subtitle">Top 10 campionato</h3>
            <div id="playerStatsList" class="player-stats-list"></div>
            <section class="team-player-stats" aria-labelledby="teamPlayerStatsTitle">
              <div class="team-stats-heading">
                <p class="eyebrow">Rendimento rosa</p>
                <h3 id="teamPlayerStatsTitle">I tuoi giocatori</h3>
              </div>
              <div id="teamPlayerStatsList" class="player-stats-list team-player-stats-list"></div>
            </section>
          </div>
        </div>
      </section>

      <section id="liveSimView" class="view">
        <div class="live-sim-layout">
          <section class="panel live-feed-panel">
            <p class="eyebrow">Simulazione live</p>
            <h2 id="liveRoundTitle">Giornata 1</h2>
            <button id="skipSimBtn" class="ghost-button" type="button">Vota skip</button>
            <div id="liveMatchFeed" class="live-match-feed"></div>
          </section>
          <aside class="panel live-table-panel">
            <p class="eyebrow">Classifica live</p>
            <div id="liveTable" class="league-table"></div>
          </aside>
        </div>
      </section>
    </main>
    <script src="players.js?v=14"></script>
    <script src="app.js?v=14"></script>
  </body>
</html>
