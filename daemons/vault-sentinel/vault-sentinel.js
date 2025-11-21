#!/usr/bin/env node

/**
 * vault-sentinel.js
 * Guards the Git daemon vault—verifies scrolls, covenants, and registry presence.
 * Crowned as companion to BIG-BUG-BOMBER.
 */

const fs = require('fs');
const path = require('path');

const DAEMONS_DIR = 'daemons';
const REGISTRY_PATH = 'registry.json';
const OUTPUT_PATH = path.join(DAEMONS_DIR, 'vault-sentinel', 'vault-report.json');

function getDaemonDirs() {
  return fs.readdirSync(DAEMONS_DIR).filter(name => {
    const fullPath = path.join(DAEMONS_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });
}

function loadRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) return {};
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
}

function checkDaemonIntegrity(name, registry) {
  const base = path.join(DAEMONS_DIR, name);
  return {
    name,
    has_readme: fs.existsSync(path.join(base, 'README.md')),
    has_license: fs.existsSync(path.join(base, 'LICENSE.md')) || fs.existsSync('LICENSE.md'),
    registered: Boolean(registry[name]),
  };
}

function writeReport(results) {
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
  console.log(`🧿 Vault integrity report written to ${OUTPUT_PATH}`);
}

function main() {
  console.log('🧿 Vault-Sentinel activated. Scanning daemon archive...');
  const registry = loadRegistry();
  const daemons = getDaemonDirs();
  const results = daemons.map(name => checkDaemonIntegrity(name, registry));
  writeReport({
    timestamp: new Date().toISOString(),
    daemons_checked: daemons.length,
    results,
  });
}

main();
