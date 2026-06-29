:root {
  --ui-bg: #050a08;
  --ui-bg-soft: #09110e;
  --ui-panel: #101915;
  --ui-panel-2: #15211b;
  --ui-panel-3: #1b2922;
  --ui-text: #f3f7f4;
  --ui-muted: #91a198;
  --ui-line: #2a3a31;
  --ui-green: #c6ff37;
  --ui-green-dark: #76b900;
  --ui-cyan: #55dbe8;
  --ui-gold: #ffc857;
  --ui-red: #ff5d64;
  --ui-shadow: 0 18px 46px rgba(0, 0, 0, 0.32);
}

html {
  color-scheme: dark;
}

body {
  color: var(--ui-text);
  background:
    linear-gradient(rgba(5, 10, 8, 0.94), rgba(5, 10, 8, 0.98)),
    repeating-linear-gradient(115deg, transparent 0 68px, rgba(198, 255, 55, 0.045) 69px 70px),
    #050a08;
}

body::before {
  background:
    radial-gradient(circle at 12% -8%, rgba(198, 255, 55, 0.15), transparent 28%),
    radial-gradient(circle at 90% 8%, rgba(85, 219, 232, 0.09), transparent 24%);
}

.app-shell {
  width: min(1440px, calc(100% - 36px));
}

.topbar {
  min-height: 76px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(12, 21, 17, 0.88);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(12px);
}

.brand-logo {
  width: 46px;
  height: 54px;
}

.topbar h1 {
  color: #fff;
  font-size: clamp(1.45rem, 2.3vw, 2.05rem);
}

.topbar h1 span {
  color: var(--ui-green);
}

.topbar .eyebrow {
  color: #7e9187;
}

.phase-tabs {
  border-color: var(--ui-line);
  background: #080e0b;
}

.phase-tabs span {
  color: #718078;
}

body[data-view="lobby"] .phase-tabs [data-phase="lobby"],
body[data-view="game"] .phase-tabs [data-phase="game"],
body[data-view="squad"] .phase-tabs [data-phase="squad"],
body[data-view="live"] .phase-tabs [data-phase="live"],
body[data-view="results"] .phase-tabs [data-phase="results"] {
  color: #071009;
  background: var(--ui-green);
  box-shadow: 0 0 22px rgba(198, 255, 55, 0.2);
}

.hero-panel,
.panel {
  color: var(--ui-text);
  border: 1px solid var(--ui-line);
  background: var(--ui-panel);
  box-shadow: var(--ui-shadow);
}

.panel {
  position: relative;
}

.panel::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(115deg, rgba(255, 255, 255, 0.025), transparent 34%);
}

.panel > * {
  position: relative;
  z-index: 1;
}

.muted,
label,
.rules-list,
.player-stat-row small,
.bench-item small,
.calendar-round small,
.live-match-card span {
  color: var(--ui-muted);
}

.panel > .eyebrow,
.squad-toolbar .eyebrow,
.mini-lineup-block > .eyebrow {
  border-color: #35502f;
  background: #172717;
  color: var(--ui-green);
}

.panel > .eyebrow::before,
.squad-toolbar .eyebrow::before,
.mini-lineup-block > .eyebrow::before {
  background: var(--ui-green);
}

.hero-panel {
  grid-template-columns: minmax(0, 1.12fr) minmax(350px, 0.72fr);
  min-height: min(690px, calc(100vh - 126px));
  border-color: #25352c;
  background:
    linear-gradient(90deg, rgba(7, 13, 10, 0.1) 0 58%, rgba(4, 8, 6, 0.72) 58%),
    repeating-linear-gradient(90deg, #112219 0 90px, #0d1b14 90px 180px);
}

.hero-panel::before {
  inset: 9% auto auto 4%;
  width: 48%;
  height: 82%;
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 0;
  transform: none;
}

.hero-panel::after {
  width: 42%;
  background:
    linear-gradient(rgba(198, 255, 55, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(198, 255, 55, 0.04) 1px, transparent 1px),
    #080e0b;
  background-size: 26px 26px;
}

.hero-panel .eyebrow {
  color: var(--ui-green);
}

.hero-panel h2 {
  max-width: 760px;
  color: #fff;
  font-size: clamp(2.9rem, 6vw, 6.4rem);
  text-transform: uppercase;
}

.hero-panel .muted {
  color: #aab8b0;
}

.mode-card {
  border: 1px solid #314238;
  background: #101b15;
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.28);
}

.mode-card:hover {
  border-color: var(--ui-green);
  background: #18271f;
  box-shadow: 0 0 0 1px rgba(198, 255, 55, 0.25), 0 20px 36px rgba(0, 0, 0, 0.32);
}

.mode-card::after {
  color: #071009;
  background: var(--ui-green);
}

.mode-card > span:not(.mode-index) {
  color: #90a299;
}

.mode-card small,
.mode-index {
  color: var(--ui-green);
}

.mode-index {
  opacity: 0.16;
}

select,
input {
  color: var(--ui-text);
  border: 1px solid #34443b;
  background: #09110d;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.025);
}

select:focus,
input:focus {
  border-color: var(--ui-green);
  box-shadow: 0 0 0 3px rgba(198, 255, 55, 0.13);
}

select option {
  color: var(--ui-text);
  background: #101915;
}

.primary-button {
  color: #071009;
  background: var(--ui-green);
  box-shadow: 0 8px 20px rgba(118, 185, 0, 0.19);
}

.primary-button:hover:not(:disabled) {
  color: #071009;
  background: #d4ff68;
  box-shadow: 0 10px 26px rgba(198, 255, 55, 0.25);
}

.ghost-button,
.topbar .ghost-button {
  color: var(--ui-text);
  border-color: #35463c;
  background: #17211c;
}

.ghost-button:hover,
.topbar .ghost-button:hover {
  color: var(--ui-green);
  border-color: var(--ui-green);
  background: #101a14;
}

.ghost-button.dirty {
  color: var(--ui-gold);
  border-color: var(--ui-gold);
  background: #2a210e;
}

.setup-summary {
  color: #d9ff82;
  border-color: var(--ui-green-dark);
  background: #172516;
}

.bot-difficulty-field {
  color: var(--ui-gold);
  border-color: #634d1e;
  background: #281f0e;
}

.share-box {
  color: #c9d4cd;
  border-color: #405249;
  background: #0a120e;
}

.lobby-panel::before,
.lobby-settings-panel::before,
.manager-panel::before,
.rivals-panel::before,
.live-feed-panel::before,
.live-table-panel::before,
.results-panel::before,
.player-stats-panel::before {
  background: linear-gradient(90deg, var(--ui-green), var(--ui-cyan));
}

.lobby-panel h2 span {
  color: var(--ui-green);
}

.lobby-settings-panel .field-stack {
  border-color: var(--ui-line);
  background: #0a120e;
}

.single-color-button {
  border-color: #fff;
  box-shadow: 0 0 0 4px #101915, 0 0 0 5px #506057;
}

.rival-card,
.bench-item,
.player-stat-row,
.live-match-card,
.calendar-round {
  color: var(--ui-text);
  border-color: var(--ui-line);
  background: var(--ui-panel-2);
  box-shadow: 0 7px 18px rgba(0, 0, 0, 0.16);
}

.rival-card-head strong,
.stat-row strong,
.league-row strong,
.squad-item strong {
  color: var(--ui-text);
}

.rival-metrics span,
.rival-metrics strong {
  color: #b9c8c0;
  background: #0c1511;
}

.lobby-player-card {
  background: linear-gradient(105deg, color-mix(in srgb, var(--team-color) 11%, #15211b), #15211b 42%);
}

.lobby-player-card.offline-player {
  opacity: 0.48;
}

.stat-row,
.rival-row,
.standing-row {
  border-color: var(--ui-line);
}

.stat-row span {
  color: #7f9288;
}

.stat-row strong {
  color: var(--ui-green);
  background: #19281d;
}

.mini-lineup-block {
  border-color: var(--ui-line);
  background: #0a120e;
}

.fit-message {
  color: #c5d1ca;
  background: #151f1a;
}

.fit-message.good {
  color: #dfff97;
  background: #172817;
}

.fit-message.bad {
  color: #ff9ca1;
  background: #2d1719;
}

.mini-formation {
  border-color: rgba(255, 255, 255, 0.68);
  background: repeating-linear-gradient(90deg, #167945 0 36px, #12673b 36px 72px);
}

.mini-slot {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.22);
  background: #0d1913;
}

.mini-slot.preview-good {
  color: #071009;
  border-color: var(--ui-green);
  background: var(--ui-green);
}

.squad-item {
  color: var(--ui-text);
  border-color: var(--ui-line);
  border-left-color: var(--ui-green-dark);
  background: var(--ui-panel-2);
}

.squad-item small {
  color: var(--ui-muted);
}

.auction-card {
  border-color: #355a2f;
  background:
    linear-gradient(120deg, rgba(4, 10, 7, 0.42), transparent 55%),
    radial-gradient(circle at 85% 18%, rgba(198, 255, 55, 0.18), transparent 22%),
    repeating-linear-gradient(90deg, #0c2818 0 74px, #0a2115 74px 148px);
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.48);
}

.auction-card::before {
  border-color: rgba(255, 255, 255, 0.15);
}

.auction-header {
  color: #adbbb3;
  border-color: rgba(255, 255, 255, 0.12);
}

.timer {
  color: var(--ui-green);
  border-color: rgba(198, 255, 55, 0.5);
  background: rgba(198, 255, 55, 0.08);
}

.timer.hot {
  color: #fff;
  border-color: #ff9297;
  background: var(--ui-red);
}

.role-pill {
  color: #071009;
  background: var(--ui-green);
}

.auction-card h2 {
  color: #fff;
  text-transform: uppercase;
}

.player-meta {
  color: #c2d0c8;
}

.player-meta span {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.18);
}

.current-bid {
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(4, 12, 7, 0.68);
}

.current-bid strong {
  color: var(--ui-green);
}

.bid-controls button {
  color: #071009;
  border-bottom-color: #8bb323;
  background: #edf9d2;
}

.bid-controls button:hover:not(:disabled) {
  background: var(--ui-green);
}

.log-box {
  border-color: var(--ui-line);
}

#auctionLog {
  color: var(--ui-muted);
}

.squad-toolbar {
  border-color: #3d503f;
  background: rgba(16, 25, 21, 0.96);
  backdrop-filter: blur(12px);
}

.tactical-workbench {
  border-color: #33463a;
  background: #0c1511;
}

.compatibility-score {
  color: var(--ui-green);
  border-color: #3c552f;
  background: #172416;
}

.tactical-insights > * {
  color: #9fb0a7;
  background: #09110d;
}

.captain-summary {
  color: #f2d88e;
  border-left-color: var(--ui-gold);
  background: #241d0e !important;
}

.squad-stats-box {
  border-color: var(--ui-line);
  background: #0b130f;
}

.squad-stats-box::before {
  color: #071009;
  background: var(--ui-green);
}

.squad-stat {
  color: #b7c7be;
  border-color: var(--ui-line);
  background: var(--ui-panel-2);
}

.squad-stat strong {
  color: #071009;
  background: var(--ui-green);
}

.football-pitch {
  border-color: #e9f0eb;
  background:
    linear-gradient(rgba(255, 255, 255, 0.075) 2px, transparent 2px),
    repeating-linear-gradient(90deg, #147543 0 82px, #0f6539 82px 164px);
  box-shadow: inset 0 0 0 2px rgba(2, 25, 12, 0.36), 0 24px 64px rgba(0, 0, 0, 0.42);
}

.pitch-slot {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(7, 14, 10, 0.9);
}

.pitch-slot strong {
  color: var(--ui-green);
}

.pitch-slot:hover,
.pitch-slot.drop-target {
  border-color: var(--ui-green);
  box-shadow: 0 0 0 3px rgba(198, 255, 55, 0.22), 0 15px 30px rgba(0, 0, 0, 0.28);
}

.pitch-slot.vacant {
  border-color: #f1898e;
  background: rgba(74, 18, 22, 0.86);
}

.bench-panel {
  border-top-color: var(--ui-gold);
}

.bench-panel > .eyebrow {
  color: var(--ui-gold);
  border-color: #604c20;
  background: #281f0e;
}

.bench-item {
  border-left-color: var(--ui-gold);
}

.league-table {
  border-color: var(--ui-line);
  background: #080f0c;
}

.league-header {
  color: #aebdb5;
  background: #050a08;
}

.league-row {
  color: #aebdb5;
  border-left-color: transparent;
  background: var(--ui-panel-2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

.league-row:hover {
  background: var(--ui-panel-3);
}

.league-row:nth-child(2) {
  border-left-color: var(--ui-gold);
  background: #2a2516;
}

.league-row:nth-child(3),
.league-row:nth-child(4),
.league-row:nth-child(5) {
  border-left-color: var(--ui-green-dark);
}

.league-header span:last-child,
.league-row strong:last-child {
  color: var(--ui-green);
  background: #182618;
}

.league-row.user-row {
  border-color: var(--ui-green);
  background: #19281d;
  box-shadow: inset 4px 0 0 var(--ui-green), 0 6px 16px rgba(0, 0, 0, 0.18);
}

.live-feed-panel {
  background: #0c1410;
}

.live-feed-panel > h2,
.results-panel > h2 {
  border-color: var(--ui-line);
}

.live-round-results span,
.calendar-match {
  color: #dce4df;
  background: #0a120e;
}

.live-round-results strong,
.live-round-card > strong,
.calendar-round > strong {
  color: #071009;
  background: var(--ui-green);
}

.winner-celebration {
  color: #fff;
  border-color: #6b5423;
  border-left-color: var(--ui-gold);
  background:
    radial-gradient(circle at 18% 10%, rgba(255, 200, 87, 0.2), transparent 28%),
    #241d0e;
}

.winner-celebration strong {
  color: #fff;
}

.winner-celebration small {
  color: #d7c99f;
}

.player-stat-row {
  border-left-color: var(--ui-cyan);
}

.stats-subtitle {
  color: #71837a;
}

.team-player-stats {
  border-color: var(--ui-line);
}

.team-stats-heading h3 {
  color: var(--ui-text);
}

.team-player-stat-row {
  border-left-color: var(--ui-green-dark);
}

.keeper-stat-row {
  border-left-color: var(--ui-gold);
  background: #211c10;
}

.keeper-stat-row strong {
  color: var(--ui-gold);
  background: #302611;
}

.empty-stats-message {
  border-color: var(--ui-line);
  background: #0a120e;
}

.star-player-name,
.star-overall {
  color: var(--ui-gold);
}

.star-card {
  border-color: var(--ui-gold) !important;
  box-shadow: 0 0 0 2px rgba(255, 200, 87, 0.15), 0 14px 28px rgba(0, 0, 0, 0.3);
}

.tactical-effect {
  border-color: var(--ui-line);
  background: #0a120e;
}

.tactical-effect span,
.tactical-effect small {
  color: #82948a;
}

.tactical-effect strong {
  color: var(--ui-text);
}

.tactical-effect.positive {
  border-left-color: var(--ui-green);
  background: rgba(30, 159, 90, 0.08);
}

.tactical-effect.positive strong {
  color: #62df9b;
}

.tactical-effect.negative {
  border-left-color: #ec5c5c;
  background: rgba(217, 67, 67, 0.08);
}

.tactical-effect.negative strong {
  color: #ff8181;
}

.tactical-effect.neutral {
  border-left-color: #71837a;
}

.tactical-effect[class*="tactical-effect-"] {
  border-left-color: var(--stat-color);
}

.tactical-effect[class*="tactical-effect-"] > span {
  color: var(--stat-color);
}

.squad-stat[class*="squad-stat-"] {
  border-top-color: var(--stat-color);
  background: color-mix(in srgb, var(--stat-color) 8%, var(--ui-panel-2));
}

.squad-stat[class*="squad-stat-"] strong {
  color: #071009;
  background: var(--stat-color);
}

.squad-stat[class*="squad-stat-"] small {
  color: color-mix(in srgb, var(--stat-color) 78%, #c8d5ce);
}

.tactic-tab {
  border-color: color-mix(in srgb, var(--tactic-color) 42%, var(--ui-line));
  border-top-color: var(--tactic-color);
  background: color-mix(in srgb, var(--tactic-color) 9%, #0a120e);
  color: color-mix(in srgb, var(--tactic-color) 78%, #d4dfd9);
}

.tactic-tab select {
  border-color: color-mix(in srgb, var(--tactic-color) 48%, var(--ui-line));
  background-color: color-mix(in srgb, var(--tactic-color) 7%, #101a14);
  color: var(--ui-text);
}

.tactic-bonus-chip {
  border-color: color-mix(in srgb, var(--tactic-color) 60%, #26382e);
  background: color-mix(in srgb, var(--tactic-color) 16%, #0a120e);
  color: color-mix(in srgb, var(--tactic-color) 80%, #e6eee9);
}

.live-round-results .live-user-match,
.league-row.live-user-row {
  color: var(--ui-text);
  background: color-mix(in srgb, var(--team-color, var(--ui-green)) 16%, #0b130f);
}

.tactical-breakdown {
  border-color: var(--ui-line);
}

.tactical-breakdown-head {
  background: #15251d;
  color: #aebdb5;
}

.tactical-breakdown-row {
  border-top-color: var(--ui-line);
  background: #0a120e;
  color: var(--ui-text);
}

.tactical-pro { color: #62df9b; }
.tactical-con { color: #ff8181; }

@media (max-width: 980px) {
  .hero-panel {
    grid-template-columns: 1fr;
    background: #0d1812;
  }

  .hero-panel::before {
    width: 86%;
  }

  .hero-panel::after {
    width: 100%;
    height: 44%;
  }
}

@media (max-width: 620px) {
  .app-shell {
    width: min(100% - 14px, 1440px);
  }

  .topbar {
    padding: 7px;
  }

  .hero-panel {
    padding: 24px 18px 18px;
  }

  .hero-panel h2 {
    font-size: clamp(2.45rem, 13vw, 3.8rem);
  }

  .hero-panel::after {
    height: 48%;
  }

  .panel,
  .auction-card {
    padding: 17px;
  }

  .auction-card h2 {
    font-size: clamp(2.15rem, 12vw, 3.4rem);
  }
}
