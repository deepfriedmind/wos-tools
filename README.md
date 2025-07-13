# WoS<img src="./public/favicon-96x96.png" width="32" height="32" alt="WoS Tools favicon" valign="top" />Tools

[![Netlify Status](https://api.netlify.com/api/v1/badges/6f85effa-aabb-4edf-9123-07bb31a5b916/deploy-status)](https://app.netlify.com/sites/wostools/deploys)
![GitHub License](https://img.shields.io/github/license/deepfriedmind/wos-tools)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

A website with a collection of tools for the game Whiteout Survival.  
Built with Nuxt 3 (Vue 3/TypeScript), PrimeVue, and Tailwind CSS.

![Wos Tools](public/og-image.jpg)

## Setup

If using [mise](https://mise.jdx.dev/), simply run `mise dev`. Otherwise:

Install the Node and pnpm versions listed in [`.tool-versions`](.tool-versions).

### Install commit hooks:

```sh
npx simple-git-hooks
```

### Install dependencies:

```sh
pnpm install
```

## Development Server

Start the development server on [`http://localhost:3000`](http://localhost:3000):

```sh
pnpm dev
```

## Production

Build the application for production:

```sh
pnpm build
```

Locally preview production build:

```sh
pnpm preview
```
