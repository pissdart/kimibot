---
name: kimihub
description: Use the KimiHub CLI to search, install, update, and publish agent skills from kimihub.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed kimihub CLI.
metadata: {"kimibot":{"requires":{"bins":["kimihub"]},"install":[{"id":"node","kind":"node","package":"kimihub","bins":["kimihub"],"label":"Install KimiHub CLI (npm)"}]}}
---

# KimiHub CLI

Install
```bash
npm i -g kimihub
```

Auth (publish)
```bash
kimihub login
kimihub whoami
```

Search
```bash
kimihub search "postgres backups"
```

Install
```bash
kimihub install my-skill
kimihub install my-skill --version 1.2.3
```

Update (hash-based match + upgrade)
```bash
kimihub update my-skill
kimihub update my-skill --version 1.2.3
kimihub update --all
kimihub update my-skill --force
kimihub update --all --no-input --force
```

List
```bash
kimihub list
```

Publish
```bash
kimihub publish ./my-skill --slug my-skill --name "My Skill" --version 1.2.0 --changelog "Fixes + docs"
```

Notes
- Default registry: https://kimihub.com (override with CLAWDHUB_REGISTRY or --registry)
- Default workdir: cwd (falls back to Kimibot workspace); install dir: ./skills (override with --workdir / --dir / CLAWDHUB_WORKDIR)
- Update command hashes local files, resolves matching version, and upgrades to latest unless --version is set
