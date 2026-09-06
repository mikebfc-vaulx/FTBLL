const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
function extract(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, name);
  const end = source.indexOf('\nfunction ', start + 1);
  return source.slice(start, end < 0 ? undefined : end);
}
const context = vm.createContext({
  state: { config: { formation: '4-3-3', credits: 650, rivals: 3, rounds: 12, aiAggression: 1 }, auctionPool: Array(12), playerIndex: 0 },
  roleCountNeeded: () => 2, roleCountOwned: () => 0,
  managerMissingSlots: () => 11, aiPositionUtility: () => 1.2,
  aiDesireMultiplier: (manager) => manager.desire,
  playerBasePrice: () => 300,
});
vm.runInContext(extract('aiMaxBid') + '\n' + extract('clampNumber'), context);
const player = { role: 'CC', overall: 85 };
const manager = { credits: 650, initialCredits: 650, reserveTarget: 65, squad: [], desire: 0.7 };
const low = context.aiMaxBid(manager, player);
const high = context.aiMaxBid({ ...manager, desire: 1.5 }, player);
assert.ok(high > low, 'Desire must still affect saturated budget caps');
assert.ok(high <= 650 * 0.18 * 1.18);
assert.equal(context.aiMaxBid({ ...manager, credits: 65 }, player), 0);
assert.ok(context.aiMaxBid({ ...manager, credits: 70 }, player) <= 5);
assert.equal(context.clampNumber('24.8', 12, 300), 24);
assert.equal(context.clampNumber('Infinity', 12, 300), 12);
console.log('Gameplay client: desiderio CPU, riserva crediti e impostazioni intere verificati.');
