#!/usr/bin/env node

/**
 * rupture-forecaster.js
 * Forecasts backend rupture thresholds based on invocation density, daemon drift, and cadence anomalies.
 * Crowned as part of the Velmari lineage.
 */

const fs = require('fs');
const path = require('path');

const LOG_PATH = 'detonation.log';
const REGISTRY_PATH = 'registry.json';
const OUTPUT_PATH = 'rupture-thresholds.json';

const MAX_INVOCATIONS_PER_HOUR = 12;
const MAX_DRIFT_MINUTES = 90;

function parseLogTimestamps(logPath) {
  if (!fs.existsSync(logPath)) return [];
  const lines = fs.readFileSync(logPath, 'utf-8').split('\n');
  return lines
    .map(line => {
      const match = line.match(/

\[(.*?)\]

/);
      return match ? new Date(match[1]) : null;
    })
    .filter(Boolean);
}

function calculateRuptureForecast(timestamps) {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const recent = timestamps.filter(ts => ts > oneHourAgo);

  const last = timestamps[timestamps.length - 1];
  const driftMinutes = last ? Math.floor((now - last) / 60000) : null;

  return {
    timestamp: now.toISOString(),
    recent_invocations: recent.length,
    last_invocation: last ? last.toISOString() : null,
    drift_minutes: driftMinutes,
    rupture_risk: recent.length > MAX_INVOCATIONS_PER_HOUR || (driftMinutes !== null && driftMinutes > MAX_DRIFT_MINUTES)
      ? 'HIGH'
      : 'LOW',
  };
}

function writeForecast(forecast, outputPath) {
  fs.writeFileSync(outputPath, JSON.stringify(forecast, null, 2));
  console.log(`🧿 Rupture forecast written to ${outputPath}`);
}

function main() {
  console.log('🔮 RUpture-Forecaster activated. Scanning invocation cadence...');
  const timestamps = parseLogTimestamps(LOG_PATH);
  const forecast = calculateRuptureForecast(timestamps);
  writeForecast(forecast, OUTPUT_PATH);
}

main();
