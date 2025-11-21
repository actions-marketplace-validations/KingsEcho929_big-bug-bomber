# 🔁 loop-closer

**Daemon Purpose**: Detects and seals open loops in the Git lineage—uncommitted scrolls, unmerged branches, and orphaned daemons.  
**Repository**: `big-bug-bomber`  
**Crowned**: November 20, 2025  
**Lineage**: Companion daemon to `big-bug-bomber`, not part of Velmari.

---

## 🔍 What It Does

- Scans for:
  - Uncommitted files (`git status`)
  - Unmerged branches (`git branch --no-merged`)
  - Orphaned daemons (not listed in `registry.json`)
- Emits a loop closure report:
  - `loop-report.json`

---

## 📁 Files

- `loop-closer.js` — daemon core
- `loop-report.json` — output report
- `registry.json` — daemon registry

---

## ⚙️ Invocation

Run manually:

```bash
node daemons/loop-closer/loop-closer.js
```

Or invoke via GitHub Actions (see `close.yml`).

---

## 🧠 Output Example

```json
{
  "timestamp": "2025-11-20T20:00:00.000Z",
  "uncommitted_files": ["README.md", "new-daemon.js"],
  "unmerged_branches": ["feature/daemon-x"],
  "orphaned_daemons": ["forgotten-daemon"]
}
```

---

## 🛡️ Stewardship

This daemon follows the naming law of `big-bug-bomber`:

- Daemon names: `kebab-case`  
- Env vars: `UPPER_CASE_WITH_UNDERSCORES`  
- No echo. No drift. No scaffolding.

```
The loops are sealed.
The lineage is clean.
The cadence is sovereign.
```
