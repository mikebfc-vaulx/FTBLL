const assert = require("assert");

process.env.NODE_ENV = "production";
const { server } = require("../server");

async function run() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;
  const jsonRequest = (pathname, payload) => fetch(`${origin}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  try {
    const home = await fetch(`${origin}/`);
    assert.equal(home.status, 200);
    assert.match(home.headers.get("content-security-policy") || "", /frame-ancestors 'none'/);
    assert.match(home.headers.get("content-security-policy") || "", /accounts\.google\.com/);
    assert.equal(home.headers.get("x-content-type-options"), "nosniff");
    assert.equal(home.headers.get("x-frame-options"), "DENY");
    assert.equal(home.headers.get("strict-transport-security"), "max-age=31536000");

    for (const privatePath of ["/server.js", "/package.json", "/render.yaml", "/stats-store.json", "/.env"]) {
      const response = await fetch(`${origin}${privatePath}`);
      assert.equal(response.status, 404, `${privatePath} non deve essere pubblico`);
    }

    const invalidJson = await fetch(`${origin}/api/lobbies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{"
    });
    assert.equal(invalidJson.status, 400);

    const unsupportedBody = await fetch(`${origin}/api/lobbies`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "{}"
    });
    assert.equal(unsupportedBody.status, 415);

    const largeBody = await fetch(`${origin}/api/lobbies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ padding: "x".repeat(40 * 1024) })
    });
    assert.equal(largeBody.status, 413);

    const createdResponse = await jsonRequest("/api/lobbies", { name: "<script>Host</script>" });
    assert.equal(createdResponse.status, 200);
    const created = await createdResponse.json();
    assert.ok(created.code);
    assert.ok(created.playerId);

    const anonymousSnapshot = await (await fetch(`${origin}/api/lobbies/${created.code}`)).json();
    assert.notEqual(anonymousSnapshot.hostId, created.playerId);
    assert.notEqual(anonymousSnapshot.managers[0].id, created.playerId);
    assert.equal(anonymousSnapshot.managers[0].name.includes("<"), false);

    const hostSnapshot = await (await fetch(`${origin}/api/lobbies/${created.code}`, { headers: { "X-FutBidder-Player": created.playerId } })).json();
    assert.equal(hostSnapshot.hostId, created.playerId);
    assert.equal(hostSnapshot.managers[0].id, created.playerId);

    const joinedResponse = await jsonRequest(`/api/lobbies/${created.code}/join`, { name: "Guest" });
    assert.equal(joinedResponse.status, 200);
    const joined = await joinedResponse.json();
    const hostView = await (await fetch(`${origin}/api/lobbies/${created.code}`, { headers: { "X-FutBidder-Player": created.playerId } })).json();
    const guestInHostView = hostView.managers.find((manager) => manager.name === "Guest");
    assert.ok(guestInHostView);
    assert.notEqual(guestInHostView.id, joined.playerId);

    const stolenHostAttempt = await jsonRequest(`/api/lobbies/${created.code}/start`, { playerId: anonymousSnapshot.hostId });
    assert.equal(stolenHostAttempt.status, 403);

    console.log("Sicurezza: file privati, header, body limit e segreti lobby verificati.");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
