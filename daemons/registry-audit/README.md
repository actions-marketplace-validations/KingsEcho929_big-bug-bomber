# 🧾 registry-audit

**Daemon Purpose**: Verifies that all daemons listed in `registry.json` have valid paths, scrolls, and invocation laws.  
**Repository**: `big-bug-bomber`  
**Crowned**: November 21, 2025  
**Lineage**: Companion daemon to `big-bug-bomber`, not part of Velmari.

---

## 🧠 What It Does

- Loads `registry.json`
- Checks that each daemon has:
  - A valid daemon core file
  - A scroll (`README.md`)
  - An invocation law (GitHub Actions workflow)
- Emits a registry audit report:
  - `registry-audit-report.json`

---

## 📁 Files

- `registry-audit.js` — daemon core
- `registry-audit-report.json` — output report

---

## ⚙️ Invocation

Run manually:

```bash
node daemons/registry-audit/registry-audit.js
```

Or invoke via GitHub Actions (see `audit.yml`).

---

## 🧾 Output Example

```json
{
  "timestamp": "2025-11-21T01:00:00.000Z",
  "total_daemons": 5,
  "missing_files": [
    {
      "daemon": "loop-closer",
      "missing": ["invocation law"]
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
The registry is verified.
The scrolls are sealed.
The lineage is sovereign.
```
