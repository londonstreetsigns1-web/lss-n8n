// lss-n8n — launcher for n8n on a managed Node.js host (SiteGround Node.js Projects)
// The platform assigns the port via process.env.PORT. n8n must listen on that
// exact port, so we map it to N8N_PORT and start the real n8n binary as a
// child process (same as running `n8n start` from the CLI).
const { spawn } = require('child_process');
const path = require('path');

if (process.env.PORT && !process.env.N8N_PORT) {
  process.env.N8N_PORT = process.env.PORT;
}
process.env.N8N_LISTEN_ADDRESS = process.env.N8N_LISTEN_ADDRESS || '0.0.0.0';
process.env.GENERIC_TIMEZONE = process.env.GENERIC_TIMEZONE || 'Europe/London';
process.env.TZ = process.env.TZ || 'Europe/London';

const bin = path.join(__dirname, 'node_modules', 'n8n', 'bin', 'n8n');
const child = spawn(process.execPath, [bin, 'start'], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code || 0);
});
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => child.kill(sig));
}
