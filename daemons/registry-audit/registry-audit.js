#!/usr/bin/env node

/**
 * registry-audit.js
 * Verifies that all daemons listed in registry.json have valid paths, scrolls, and invocation laws.
 * Crowned as companion to BIG-BUG-BOMBER.
 */

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = 'registry.json';
const OUTPUT_PATH = 'daemons/registry-audit/registry-audit-report.json';

function fileExists(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

function auditRegistry() {
  const report = {
    timestamp: new Date().toISOString(),
    total_daemons: 0,
    missing_files: []
  };

  if (!fileExists(REGISTRY_PATH)) {
    console.error(`❌ Missing registry.json at ${REGISTRY_PATH}`);
    process.exit(1);
  }

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  report.total_daemons = Object.keys(registry).length;

  for (const [name, entry] of Object.entries(registry)) {
    const missing = [];

    if (!fileExists(entry.path)) missing.push('daemon core');
    if (!fileExists(entry.scroll)) missing.push('scroll');
    if (!fileExists(entry.invocation)) missing.push('invocation law');

    if (missing.length > 0) {
      report.missing_files.push({
        daemon: name,
        missing
      });
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(`✅ Registry audit complete. Report written to ${OUTPUT_PATH}`);
}

auditRegistry();
