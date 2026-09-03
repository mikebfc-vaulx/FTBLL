# FTBALL Friends

FTBALL Friends is a browser football manager party game.

It includes:

- single player auction against IA managers;
- multiplayer lobby with host settings;
- synchronized flash auction;
- squad setup after the auction;
- ready system;
- simulated league table and player stats.

## Google login

Create an OAuth 2.0 Client ID of type **Web application** in Google Cloud, then:

1. add the exact public site origin (for example `https://ftball-friends.onrender.com`) to **Authorized JavaScript origins**;
2. do not add a trailing slash or path;
3. set that client ID as `GOOGLE_CLIENT_ID` in Render;
4. redeploy the service after changing the environment variable.

For local testing also authorize `http://localhost:3000`. The app uses a JavaScript callback, so an authorized redirect URI is not required.

## Account statistics

Statistics are stored separately for every Google account, using a one-way hash of the Google account ID. A completed championship is recorded once and contributes to the Single player or Online totals.

The browser also keeps a per-account recovery copy of profile and statistics. This prevents an immediate logout/login or a temporary Render storage reset from replacing the table with zeroes on the same device. Match IDs make retries safe and avoid counting the same championship twice.

`STATS_FILE` controls where the JSON store is written. Render's default filesystem is ephemeral, so durable cross-device storage requires mounting a persistent disk at `/var/data` and setting `STATS_FILE=/var/data/stats-store.json` (or replacing the JSON store with a database). Without a disk, the browser recovery copy still protects each account on the same device, but a new device cannot recover data lost by Render. Login sessions are intentionally temporary.

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
modern-ui.css
app.js
server.js
players.js
ftball-logo.svg
avatars/
package.json
README.md
.gitignore
.devcontainer/devcontainer.json
.github/workflows/check.yml
render.yaml
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
