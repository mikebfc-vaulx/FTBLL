const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const statsFile = path.join(os.tmpdir(), `ftball-stats-${process.pid}-${Date.now()}.json`);
process.env.STATS_FILE = statsFile;

const { recordUserStats, statsForUser, updateUserProfile, uniqueGuestManagerName } = require("../server");

try {
  const accountA = { id: "account-a" };
  const accountB = { id: "account-b" };

  recordUserStats(accountA, {
    matchId: "single-match-1",
    mode: "single",
    position: 1,
    teams: 20,
    points: 50,
    gf: 30,
    ga: 10,
    playerGoals: 30,
    playerAssists: 20,
    champion: "Account A"
  });
  recordUserStats(accountA, {
    matchId: "single-match-1",
    mode: "single",
    position: 1,
    teams: 20,
    points: 50,
    gf: 30,
    ga: 10,
    playerGoals: 30,
    playerAssists: 20,
    champion: "Account A"
  });
  recordUserStats(accountA, {
    matchId: "online-match-1",
    mode: "online",
    position: 2,
    teams: 8,
    points: 18,
    gf: 12,
    ga: 9,
    playerGoals: 12,
    playerAssists: 7,
    champion: "<img src=x onerror=alert(1)>Account B"
  });
  const profileUpdate = updateUserProfile(accountA, { displayName: "Mister Verde", avatar: "avatar-3.svg" });

  const savedA = statsForUser(accountA.id);
  const savedB = statsForUser(accountB.id);

  assert.equal(savedA.single.played, 1);
  assert.equal(savedA.online.played, 1);
  assert.equal(savedA.recent.length, 2);
  assert.equal(savedA.recent.some((match) => match.champion.includes("<")), false);
  assert.equal(savedA.profile.displayName, "Mister Verde");
  assert.equal(savedA.profile.avatar, "avatar-3.svg");
  assert.equal(profileUpdate.stats.single.played, 1);
  assert.equal(profileUpdate.stats.online.played, 1);
  assert.equal(profileUpdate.stats.recent.length, 2);
  assert.equal(savedB.single.played, 0);
  assert.equal(savedB.online.played, 0);
  assert.equal(savedB.recent.length, 0);
  const lobby = { managers: [{ name: "Manager-1321" }] };
  for (let index = 0; index < 30; index += 1) {
    const generatedName = uniqueGuestManagerName(lobby);
    assert.match(generatedName, /^Manager-[0-9]{4}$/);
    assert.equal(lobby.managers.some((manager) => manager.name.toLowerCase() === generatedName.toLowerCase()), false);
    lobby.managers.push({ name: generatedName });
  }
  console.log("Statistiche account: separazione, deduplicazione e profilo verificati.");
} finally {
  fs.rmSync(statsFile, { force: true });
}
