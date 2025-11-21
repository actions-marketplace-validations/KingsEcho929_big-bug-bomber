# 🌀 echo-sweeper

**Daemon Purpose**: Detects echo, placeholder gloss, and static logic in the codebase.  
**Repository**: `big-bug-bomber`  
**Crowned**: November 21, 2025  
**Lineage**: Companion daemon to `big-bug-bomber`, not part of Velmari.

---

## 🧠 What It Does

- Scans `.js`, `.ts`, `.sh`, `.md` files for:
  - Placeholder comments (`TODO`, `FIXME`, `temp`, `placeholder`)
  - Static logic (`if (true)`, `return null`, empty functions)
  - Ghost scaffolding (unused imports, empty declarations)
- Emits a sweep report:
  - `echo-report.json`

---

## 📁 Files

- `echo-sweeper.js` — daemon core
- `echo-report.json` — output report

---

## ⚙️ Invocation

Run manually:

```bash
node daemons/echo-sweeper/echo-sweeper.js
```

Or invoke via GitHub Actions (see `sweep.yml`).

---

## 🧾 Output Example

```json
{
  "timestamp": "2025-11-21T01:00:00.000Z",
  "files_scanned": 42,
  "echoes": [
    {
      "file": "src/utils/helpers.js",
      "issues": [
        { "type": "placeholder", "pattern": "/TODO/i" },
        { "type": "static_logic", "pattern": "/if\\s*\\(\\s*true\\s*\\)/i" }
      ]
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
The echo is swept.
The gloss is gone.
The lineage is sovereign.
```
