<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/images/logo@dark.png">
  <img alt="Nuke App" width="290px" src="./public/images/logo@light.png">
</picture>
<br />
<br />

[![Netlify Status](https://img.shields.io/netlify/d1054c75-ff07-48af-8017-83083dc30951?style=flat&colorA=000000&colorB=000000)](https://app.netlify.com/sites/nukeapp/deploys) ![](https://img.shields.io/badge/architecture-%20Feature--Sliced%20Design-000000?style=flat) [![](https://img.shields.io/badge/code%20style-Anthony%20Fu-000000?style=flat)](https://github.com/antfu/eslint-config)

An open source frontend application built using the **React** ⚛️ and **Feature-Sliced Design** 🍰.

> This app is a work in progress. See the roadmap below.

- React, Redux Toolkit, React Hook Form, Zod
- Vite, TypeScript, Postcss
- Architecture based on Feature-Sliced Design

## Live demo

![](./public/images/preview@dark.png#gh-dark-mode-only)![](./public/images/preview@light.png#gh-light-mode-only)

- [Application stand](https://nukeapp.netlify.app/)
- [Storybook stand](https://nukeapp-story.netlify.app/)

## About project

Right now, I'm using this project as an experiment polygon to try modern technologies and see how a can see frontend application in {CURRENT_YEAR}. This project structure combines two methodology: Clean Architecture and Feature-Sliced Design.

## Features

- Fully Typed (API adapters, catched error with type guards, form and env variables validators by `zod`)
- Developing by Feature Sliced Design (Layers isolation and composition, Public API, DDD)
- Fully API emulation with `mswjs` (all enpoints with JWT authorization)
- Storybook stories
- Best practice comments in code ✅

# Roadmap

App business logic:

- [x] Product page
- [x] Confirm modals
- [x] Wishlist page or modal
- [x] Product's sorting feature
- [x] Feature toggle
- [x] E-commerce bag logic
- [ ] E-commerce order logic
- [ ] Stock logic (available of products)
- [ ] Product details sizes
- [ ] Private routes

Other:

- [x] Move colors to css vars
- [x] Fix FSD errors
- [x] Add Dark theme
- [x] Add FSD public API pattern
- [ ] Fix TODO into code
- [ ] Write storybook stories
- [ ] Write article to my blog about main concepts
- [ ] Add I18n
- [ ] Write screenshot tests for stories
- [ ] Write integration tests for user's use cases
- [ ] Turn on stylelint on commit

## Running locally

1. Install dependencies

```bash
pnpm install
```

2. Copy `.env.example` to `.env.local`

```bash
cp .env.example .env.local
```

3. Start Vite development server

```bash
pnpm start
```

or start Storybook stand

```bash
pnpm run storybook
```

## Troubleshoots

- Package `@mswjs/data` can not sync data in `localStorage`. With the current implementation (without synchronization), after updating the page, the state (cart, wishlist) is lost. I made a pull request with this feature (https://github.com/mswjs/data/pull/277), but it has not merged yet. So I use forked version (you can see path in _package.json_).

## License

Licensed under the MIT license.
