# BIG_BUG_BOMBER
> Detects and neutralizes bugs to keep CI workflows resilient

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-BIG__BUG__BOMBER-blue?logo=github)](https://github.com/marketplace/actions/big-bug-bomber)
[![License](https://img.shields.io/badge/License-Apache_2.0-green.svg)](./LICENSE.md)
[![Version](https://img.shields.io/github/v/release/KingsEcho929/big-bug-bomber)](https://github.com/KingsEcho929/big-bug-bomber/releases)

---

## 🚀 Quick Start

Add BIG_BUG_BOMBER to your workflow:

```yaml
name: CI
on: [push, pull_request]

jobs:
  bug-bomber:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run BIG_BUG_BOMBER
        uses: KingsEcho929/big-bug-bomber@v1.0.1
        with:
          registry: registry.json
```

- **registry** → path to your `registry.json` (default: `registry.json`)  
- **audit-report** → output file with audit results (`registry-audit-report.json`)  

---

## ✨ Features
- Detects unauthorized forks and drifted remotes  
- Audits daemon registry for valid paths and invocation laws  
- Forecasts rupture thresholds in workflows  
- Cleans echo/drift from repositories during CI runs  

---

## ⚙️ Usage

Add the following to your workflow file (e.g. `.github/workflows/ci.yml`):

```yaml
name: CI
on: [push, pull_request]

jobs:
  bug-bomber:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run BIG_BUG_BOMBER
        uses: KingsEcho929/big-bug-bomber@v1.0.1
        with:
          registry: registry.json
```

---

## 🔧 Inputs
- `registry` (required): Path to `registry.json` for daemon verification  
- `config-path` (optional): Path to custom configuration file  
- `verbose` (optional): Set to `true` for detailed logs  

---

## 📤 Outputs
- `audit-report`: Path to generated `registry-audit-report.json`  
- `status`: Result of the bug sweep (`clean` or `issues-found`)  

---

## 📜 License
Apache 2.0 – see [LICENSE](./LICENSE.md) for details.

