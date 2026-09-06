const assert = require('node:assert/strict');
const { newPlayer, fillVacancies, sanitizeLineup, markReady, simulate, publicLobby, tacticalPlanEffects } = require('../server');

for (const formation of ['4-3-3', '4-4-2', '3-5-2', '4-2-3-1', '3-4-3']) {
  const host = newPlayer('Host', 650, formation, true);
  const guest = newPlayer('Guest', 650, formation);
  const lobby = { code: 'TEST', hostId: host.id, status: 'squad', managers: [host, guest], settings: { formation, credits: 650, botCount: 0 }, auction: { index: 0 }, pool: [], log: [], resultSeenBy: [] };
  for (const manager of lobby.managers) {
    fillVacancies(lobby, manager.id);
    assert.equal(manager.squad.length, 11);
    const player = manager.squad[0];
    const slots = Object.keys(manager.lineup);
    const duplicate = sanitizeLineup(manager, { [slots[0]]: player.uid, [slots[1]]: player.name });
    assert.equal(Object.keys(duplicate).length, 1);
    for (let i = 0; i < 20; i++) {
      manager.lineup = { [slots[0]]: manager.squad[1].uid };
      fillVacancies(lobby, manager.id);
    }
    assert.equal(manager.squad.length, 11, 'Generated players must be reused');
    assert.equal(new Set(Object.values(manager.lineup)).size, 11);
    markReady(lobby, manager.id, '__proto__', { mentality: 'constructor' }, null, manager.lineup);
    assert.equal(manager.tactic, 'balanced');
    assert.equal(manager.ready, true);
  }
  simulate(lobby);
  assert.equal(lobby.results.rounds.length, 2);
  assert.equal(host.stats.played, 2);
  assert.equal(host.stats.gf, guest.stats.ga);
  assert.equal(host.stats.ga, guest.stats.gf);
  const first = publicLobby(lobby, host.id);
  assert.equal(JSON.stringify(first).includes(guest.id), false, 'No secret in results or rounds');
  publicLobby(lobby, guest.id);
  assert.equal(publicLobby(lobby, host.id).results.rounds.length, 2);
}
assert.ok(Number.isFinite(tacticalPlanEffects({ buildup: '__proto__' }, 'constructor').attack));
console.log('Gameplay: cinque moduli, generazione limitata, undici unici, campionato e risultati verificati.');
