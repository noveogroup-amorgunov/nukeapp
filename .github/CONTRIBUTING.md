# Contributing

## Pull Requests

- Follow the @pr skill.

## Checks

Before opening a PR, run:

```sh
pnpm lint               # eslint, tsc --noEmit, steiger, dependency-cruiser
pnpm build              # env validation + tsc + vite build
pnpm build:storybook    # storybook build
```
