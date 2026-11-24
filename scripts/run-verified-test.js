const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Next.js production server for test verification...');

const server = spawn('npm.cmd', ['start'], {
  cwd: path.join(__dirname, '..'),
  env: process.env,
  shell: true,
  stdio: 'pipe',
});

server.stdout.on('data', (d) => {
  const msg = d.toString();
  process.stdout.write(msg);
  if (msg.includes('Ready in') || msg.includes('Local:')) {
    setTimeout(runTestSuite, 1000); // give it a second to bind port
  }
});

server.stderr.on('data', (d) => {
  process.stderr.write(d.toString());
});

let testStarted = false;
function runTestSuite() {
  if (testStarted) return;
  testStarted = true;

  console.log('\nServer is ready. Spawning test suite...\n');
  const testProc = spawn('node', [path.join(__dirname, 'verify-full-system.js')], {
    cwd: path.join(__dirname, '..'),
    env: process.env,
    shell: true,
    stdio: 'inherit',
  });

  testProc.on('exit', (code) => {
    console.log(`\nTest suite finished with exit code ${code}. Terminating server...`);
    try {
      server.kill();
    } catch {}
    process.exit(code || 0);
  });
}

setTimeout(() => {
  if (!testStarted) {
    console.error('Timed out waiting for server ready signal.');
    try {
      server.kill();
    } catch {}
    process.exit(1);
  }
}, 30000);
