#!/usr/bin/env node

/**
 * echo-sweeper.js
 * Detects echo, placeholder gloss, and static logic in the codebase.
 * Crowned as companion to BIG-BUG-BOMBER.
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = 'daemons/echo-sweeper/echo-report.json';
const TARGET_EXTENSIONS = ['.js', '.ts', '.sh', '.md'];
const PLACEHOLDER_PATTERNS = [
  /TODO/i,
  /FIXME/i,
  /placeholder/i,
  /temp/i,
  /scaffold/i
];
const STATIC_LOGIC_PATTERNS = [
  /if\s*\(\s*true\s*\)/i,
  /return\s+null\s*;/i,
  /function\s+\w+\s*\(\)\s*\{\s*\}/i,
  /const\s+\w+\s*=\s*\(\)\s*=>\s*\{\s*\}/i
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      if (TARGET_EXTENSIONS.includes(path.extname(fullPath))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = [];

  PLACEHOLDER_PATTERNS.forEach(pattern => {
    if (pattern.test(content)) {
      matches.push({ type: 'placeholder', pattern: pattern.toString() });
    }
  });

  STATIC_LOGIC_PATTERNS.forEach(pattern => {
    if (pattern.test(content)) {
      matches.push({ type: 'static_logic', pattern: pattern.toString() });
    }
  });

  return matches.length > 0 ? { file: filePath, issues: matches } : null;
}

function main() {
  console.log('🌀 Echo-Sweeper activated. Scanning for ghost logic and placeholder gloss...');
  const files = walk('.');
  const report = {
    timestamp: new Date().toISOString(),
    files_scanned: files.length,
    echoes: []
  };

  files.forEach(file => {
    const result = scanFile(file);
    if (result) report.echoes.push(result);
  });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(`🧾 Echo sweep report written to ${OUTPUT_PATH}`);
}

main();
