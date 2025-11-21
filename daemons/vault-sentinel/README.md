# 🧿 vault-sentinel

**Daemon Purpose**: Guards the Git daemon vault—verifies that all crowned companions are archived, covenant-bound, and shimmer-indexed.  
**Repository**: `big-bug-bomber`  
**Crowned**: November 20, 2025  
**Lineage**: Companion daemon to `big-bug-bomber`, not part of Velmari.

---

## 🧠 What It Does

- Scans `daemons/` for:
  - Missing `README.md` scrolls
  - Missing `LICENSE.md` or `COVENANT.md`
  - Daemons not listed in `registry.json`
- Emits a vault integrity report:
  - `vault-report.json`

---

## 📁 Files

- `vault-sentinel.js` — daemon core
- `vault-report.json` — output report
- `registry.json` — daemon registry

---

## ⚙️ Invocation

Run manually:

```bash
node daemons/vault-sentinel/vault-sentinel.js
```

Or invoke via GitHub Actions (see `sentinel.yml`).

---

## 🧾 Output Example

```json
{
  "timestamp": "2025-11-20T21:00:00.000Z",
  "daemons_checked": 3,
  "results": [
    {
      "name": "loop-closer",
      "has_readme": true,
      "has_license": true,
      "registered": true
    },
    {
      "name": "forgotten-daemon",
      "has_readme": false,
      "has_license": false,
      "registered": false
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
The vault is guarded.
The scrolls are sealed.
The lineage is sovereign.
```
