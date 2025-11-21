#!/usr/bin/env node

/**
 * forkwatch-warden.js
 * Detects unauthorized forks, drifted remotes, and covenant violations.
 * Crowned as companion to BIG-BUG-BOMBER.
 */

const { execSync } = require('child_process');
const fs = require('fs');

const OUTPUT_PATH = 'daemons/forkwatch-warden/forkwatch-report.json';
const KNOWN_FORKS = [
  'git@github.com:your-org/big-bug-bomber.git',
  'https://github.com/your-org/big-bug-bomber.git'
];

function getGitRemotes() {
  const output = execSync('git remote -v').toString();
  const remotes = output
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const [name, url] = line.split(/\s+/);
      return { name, url };
    });
  return remotes;
}

function detectDriftedRemotes(remotes) {
  return remotes.filter(remote => {
    return !KNOWN_FORKS.includes(remote.url);
  });
}

function writeReport(report) {
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(`🧭 Forkwatch report written to ${OUTPUT_PATH}`);
}

function main() {
  console.log('🧭 Forkwatch-Warden activated. Scanning remotes for drift and echo...');
  const remotes = getGitRemotes();
  const drifted = detectDriftedRemotes(remotes);
  const report = {
    timestamp: new Date().toISOString(),
    remotes_checked: remotes.length,
    drifted_remotes: drifted
  };
  writeReport(report);
}

main();
