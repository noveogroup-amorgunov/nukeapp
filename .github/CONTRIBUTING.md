# Contributing

## Pull Requests

- Follow the PR template in [.github/PULL_REQUEST_TEMPLATE.md](./PULL_REQUEST_TEMPLATE.md) (`## Why` / `## What has changed`).
- PRs created by AI agents must be labeled with `agent_created`.

## Toolchain

- Node.js version is pinned in `.nvmrc`; pnpm is the only supported package manager (`preinstall` guard).
- Build scripts for dependencies and the supply-chain `trustPolicyExclude` list are managed in `pnpm-workspace.yaml` (pnpm 11+ settings live there, not in `package.json`).

## Checks

Before opening a PR, run:

```sh
pnpm lint               # eslint, tsc --noEmit, steiger, dependency-cruiser
pnpm build              # env validation + tsc + vite build
pnpm build:storybook    # storybook build
```

## Notes for AI agents

- When creating PRs via `gh`, always pass `--label agent_created`.
- The lockfile must pass pnpm supply-chain policies; new trust downgrades require an explicit entry in `trustPolicyExclude` with a short justification in the PR description.
