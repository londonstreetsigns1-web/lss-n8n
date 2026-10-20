# lss-n8n

n8n (workflow automation) running as a managed Node.js project for
**London Street Signs** — Daily Content Distribution.

## How it runs
- `app.js` is the entry point (`npm start` → `node app.js`).
- It maps the platform-assigned `PORT` to `N8N_PORT` and starts the real
  `n8n start` binary from `node_modules/n8n/bin/n8n` as a child process.
- Node version is pinned by `.nvmrc` (22). `package.json` requires >= 20.19.

## Settings the host should use
- Package manager: **npm**
- Install/build: **npm install** (no separate build step)
- Start command: **node app.js** (via `npm start`)
- Output directory: *(none — this is a server app, not a static build)*

## Environment variables (set in the host panel, never in code)
- `N8N_HOST` = the domain the project is pointed at
- `N8N_PROTOCOL` = `https`
- `WEBHOOK_URL` = `https://<domain>/`
- `GENERIC_TIMEZONE` = `Europe/London`
- Database: SQLite for the first test (data under `~/.n8n`); PostgreSQL
  can be configured later via `DB_TYPE=postgresdb` + `DB_POSTGRESDB_*`.
