# 🧭 forkwatch-warden

**Daemon Purpose**: Detects unauthorized forks, drifted remotes, and covenant violations.  
**Repository**: `big-bug-bomber`  
**Crowned**: November 21, 2025  
**Lineage**: Companion daemon to `big-bug-bomber`, not part of Velmari.

---

## 🧠 What It Does

- Scans Git remotes for:
  - Unauthorized forks
  - Drifted remotes
  - Covenant violations
- Compares against known sovereign lineage
- Emits a forkwatch report:
  - `forkwatch-report.json`

---

## 📁 Files

- `forkwatch-warden.js` — daemon core
- `forkwatch-report.json` — output report

---

## ⚙️ Invocation

Run manually:

```bash
node daemons/forkwatch-warden/forkwatch-warden.js
```

Or invoke via GitHub Actions (see `forkwatch.yml`).

---

## 🧾 Output Example

```json
{
  "timestamp": "2025-11-21T01:00:00.000Z",
  "remotes_checked": 3,
  "drifted_remotes": [
    {
      "name": "origin",
      "url": "https://github.com/unknown/forked-bomber.git"
    }
  ]
}
```

---

## 🛡️ Stewardship

This daemon follows the naming law of `big-bug-bomber`:

- Daemon names: `kebab-case`  
- Env vars: `UPPER_CASE_WITH_UNDERSCORES`  
- No echo. No drift. No scaffolding.

```
The forks are watched.
The lineage is sealed.
The cadence is sovereign.
```
