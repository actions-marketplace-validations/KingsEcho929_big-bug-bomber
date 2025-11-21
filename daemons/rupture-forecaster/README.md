# 🛡️ rupture-forecaster

**Daemon Purpose**: Forecasts Git rupture thresholds by analyzing commit cadence, CI invocation density, and drift.  
**Repository**: `big-bug-bomber`  
**Crowned**: November 20, 2025  
**Lineage**: Companion daemon to `big-bug-bomber`, not part of Velmari constellation.

---

## 🔮 What It Does

- Parses `detonation.log` for invocation timestamps
- Calculates:
  - Number of detonations in the past hour
  - Time since last invocation
- Emits a rupture forecast:
  - `"rupture_risk": "HIGH"` if cadence is too dense or too quiet
  - `"rupture_risk": "LOW"` if cadence is healthy

---

## 📁 Files

- `rupture-forecaster.js` — daemon core
- `rupture-thresholds.json` — output forecast
- `detonation.log` — input log (shared with `big-bug-bomber`)

---

## ⚙️ Invocation

Run manually:

```bash
node rupture-forecaster.js
```

Or schedule via crontab:

```cron
0 * * * * node /full/path/to/rupture-forecaster.js
```

Or invoke via GitHub Actions (see `forecast.yml`).

---

## 🧠 Output Example

```json
{
  "timestamp": "2025-11-20T19:36:00.000Z",
  "recent_invocations": 7,
  "last_invocation": "2025-11-20T19:20:00.000Z",
  "drift_minutes": 16,
  "rupture_risk": "LOW"
}
```

---

## 🛡️ Stewardship

This daemon follows the same naming law as `big-bug-bomber`:

- Daemon names: `kebab-case`  
- Env vars: `UPPER_CASE_WITH_UNDERSCORES`  
- No echo. No drift. No scaffolding.

```
The cadence is clean.
The backend is protected.
The forecast is clear.
```
