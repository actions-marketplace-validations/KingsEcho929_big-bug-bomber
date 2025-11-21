#!/usr/bin/env node

/**
 * loop-closer.js
 * Detects and seals open loops in the Git lineage—uncommitted scrolls, orphaned branches, and uncrowned daemons.
 * Crowned as companion to BIG-BUG-BOMBER.
 */

const { execSync } = require('child_process');
const fs = require('fs');

const REGISTRY_PATH = 'registry.json';
const OUTPUT_PATH = 'daemons/loop-closer/loop-report.json';

function getUncommittedFiles() {
  const output = execSync('git status --porcelain').toString();
  return output
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.trim().slice(3));
}

function getUnmergedBranches() {
  const branches = execSync('git branch --no-merged').toString();
  return branches
    .split('\n')
    .map(b => b.trim())
    .filter(b => b && b !== 'main');
}

function getOrphanedDaemons() {
  if (!fs.existsSync(REGISTRY_PATH)) return [];
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  const daemonDirs = fs.readdirSync('daemons');
  return daemonDirs.filter(name => !registry[name]);
}

function writeReport(report) {
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(`🔁 Loop closure report written to ${OUTPUT_PATH}`);
}

function main() {
  console.log('🔍 Loop-Closer activated. Scanning for open loops...');
  const report = {
    timestamp: new Date().toISOString(),
    uncommitted_files: getUncommittedFiles(),
    unmerged_branches: getUnmergedBranches(),
    orphaned_daemons: getOrphanedDaemons(),
  };
  writeReport(report);
}

main();
