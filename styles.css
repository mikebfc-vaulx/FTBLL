# FTBALL Friends

FTBALL Friends is a browser football manager party game.

It includes:

- single player auction against IA managers;
- multiplayer lobby with host settings;
- synchronized flash auction;
- squad setup after the auction;
- ready system;
- simulated league table and player stats.

## Multiplayer model

The multiplayer server is intentionally simple:

- one Node.js server serves the static frontend and API;
- lobbies are temporary and stored in memory;
- no database is required;
- if the server restarts, active lobbies are lost;
- inactive lobbies are removed automatically.

Default lobby lifetime is 3 hours. You can change it with:

```bash
LOBBY_TTL_MS=10800000 npm start
```

## Run locally

Install Node.js 18 or newer.

```bash
npm start
```

Open:

```text
http://localhost:3000
```

To play with friends on the same network, the host starts the server and shares:

```text
http://HOST_LAN_IP:3000
```

Example:

```text
http://192.168.1.25:3000
```

## GitHub upload

Recommended files to commit:

```text
index.html
styles.css
app.js
server.js
package.json
README.md
.gitignore
.devcontainer/devcontainer.json
.github/workflows/check.yml
```

Do not commit `node_modules`.

## Deploy notes

This project can run on hosts that support a persistent Node.js process, such as:

- Render;
- Railway;
- Fly.io;
- a VPS;
- a local PC.

Pure static hosting like GitHub Pages can show the UI, but it cannot run the multiplayer server. For multiplayer, use `server.js` on a Node host.

## Run multiplayer directly from GitHub Codespaces

GitHub Pages cannot run `server.js`, but GitHub Codespaces can run the Node server from the repository.

1. Push this project to GitHub.
2. Open the repository on GitHub.
3. Click `Code`.
4. Open the `Codespaces` tab.
5. Create a new Codespace.
6. In the Codespace terminal run:

```bash
npm start
```

7. Open the forwarded port `3000`.
8. Set port visibility to public if friends need to join.
9. Share the Codespaces forwarded URL with friends.

The lobby remains temporary because it is stored only in server memory. If the Codespace stops or restarts, active lobbies disappear.

## Useful commands

```bash
npm start
npm run check
```
