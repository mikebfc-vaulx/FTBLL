const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const statsFile = path.join(os.tmpdir(), `ftball-stats-${process.pid}-${Date.now()}.json`);
process.env.STATS_FILE = statsFile;

const { recordUserStats, statsForUser } = require("../server");

try {
  const accountA = { id: "account-a" };
  const accountB = { id: "account-b" };

  recordUserStats(accountA, {
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
    mode: "online",
    position: 2,
    teams: 8,
    points: 18,
    gf: 12,
    ga: 9,
    playerGoals: 12,
    playerAssists: 7,
    champion: "Account B"
  });

  const savedA = statsForUser(accountA.id);
  const savedB = statsForUser(accountB.id);

  assert.equal(savedA.single.played, 1);
  assert.equal(savedA.online.played, 1);
  assert.equal(savedA.recent.length, 2);
  assert.equal(savedB.single.played, 0);
  assert.equal(savedB.online.played, 0);
  assert.equal(savedB.recent.length, 0);
  console.log("Statistiche account: separazione e persistenza verificate.");
} finally {
  fs.rmSync(statsFile, { force: true });
}
