<div align="center">
  <img src="docs/logo.png" alt="Monolith Industries" width="120">
  <h1>MONOLITH LITE</h1>
  <p><strong>Opinionated Next.js infrastructure. Just the essentials.</strong></p>
  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.4.5-black?logo=nextdotjs" alt="Next.js 16.4.5"></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.3.1-149eca?logo=react" alt="React 19.3.1"></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript" alt="Strict TypeScript"></a>
    <a href=".github/workflows/ci.yml"><img src="https://img.shields.io/badge/CI-GitHub_Actions-2088ff?logo=githubactions" alt="GitHub Actions CI configured"></a>
    <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-24_LTS-339933?logo=nodedotjs" alt="Node.js 24 LTS"></a>
  </p>
  <p>
    <a href="#start-here">Get Started</a> &middot;
    <a href="#choose-an-output">Static or Server</a> &middot;
    <a href="#quality-checks">Guardrails</a> &middot;
    <a href="#github-pages-demo">GitHub Pages</a>
  </p>
</div>

---

A smaller sibling to Monolith Industries. Keep the engineering guardrails; add services only when a project needs them.

**Runtime:** Node.js 24 LTS, Next.js 16.4.5, React 19.3.1, TypeScript, Tailwind CSS 4. Only Next.js, React, and React DOM are direct production dependencies. Build and test tools are development dependencies.

## Start here

```sh
nvm use
npm ci
npm run dev
```

Open http://localhost:3000. No service accounts, database, Docker, or environment variables are required. Visit `/demo` for a small interactive counter with unit and browser tests.

For a new project, rename the package, replace the landing page and metadata, and update these docs. Remove the demo and its tests together when your real feature has equivalent coverage.

## Choose an output

### Next.js server (default)

```sh
npm run dev
npm run build
npm start
```

Use a host that runs Node.js and Next.js. This mode can grow into a full application with request-time rendering and Route Handlers. There are no Server Actions in this starter.

### Static files

```sh
npm run dev:static
npm run build:static
npm run preview:static
```

The wrappers set `NEXT_OUTPUT=export` without shell-specific environment syntax. The build writes `out/`; upload its contents to a static host. Preview serves those files on port 3000 without an SPA fallback. Configure your host to serve exported paths and the generated 404 page, rather than rewriting every request to the home page.

Static export has no request-time server: no cookies-based rendering, server authentication, mutation endpoints, ISR, Proxy, or default Next.js image optimizer. Dynamic route paths must be generated at build time. Images use unoptimized output in this mode. See [architecture](docs/architecture.md) before adding server features.

Both modes use port 3000 by default. Stop a running dev or preview server before browser tests, and do not run the two builds concurrently in one checkout.

## Quality checks

```sh
npm run check                  # formatting, lint, types, coverage, circular imports
npx playwright install chromium
npm run test:e2e               # builds and tests the production Next.js server
npm run test:e2e:static        # builds and tests the exported site
npm run audit                 # audit production and development dependencies
npm run check:all              # all of the above checks, sequentially
```

On a Linux CI machine, browser installation may require `npx playwright install --with-deps chromium`.

Useful iteration commands: `npm test`, `npm run test:watch`, `npm run format`, and `npm run lint:fix`. Husky and lint-staged check staged files before commits; CI remains the backstop. Commit `package-lock.json` and use `npm ci` for reproducible installs.

CI validates quality, security audit, and production browser tests for both output modes. Dependabot proposes dependency and GitHub Actions updates. Review and test those updates; newer versions and a passing audit are not guarantees of security. On `main`, the same CI run deploys to GitHub Pages only after all checks pass, then runs the browser suite against the live site. Pull requests never deploy.

Once the repository is hosted, configure branch protection or a ruleset to require `Quality checks`, `Browser tests (server)`, and `Browser tests (static)`. The quality job includes the audit. These settings are recommendations, not something the template changes. If a derived project intentionally adopts server-only features, remove its static CI job and document that decision.

## GitHub Pages demo

This repository includes an explicitly enabled Pages deployment test. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. Push to `main` (or rerun CI) after enabling it. The CI workflow runs checks first, obtains the site's path from GitHub, builds the static export, uploads `out/`, deploys, and tests the live URL.

For a project site like `https://josheche.github.io/monolith-lite/`, the workflow sets `NEXT_PUBLIC_BASE_PATH=/monolith-lite` during the build. `next/link` and Next's JavaScript/CSS asset URLs pick up that prefix. Direct `/monolith-lite/demo/` reloads are supported by `trailingSlash: true`. Plain public asset URLs and `next/image` sources must include the prefix when you add them; do not hard-code root-relative assets. Changing the prefix requires rebuilding.

The local app and ordinary static build remain rooted at `/` by default. For another hosting platform, remove the three `pages-*` jobs; retain the quality and browser jobs. In a copied repository, enable Pages only if you actually intend to publish its static output.

## Included and intentionally omitted

- Strict TypeScript, ESLint flat config, Prettier, Husky, lint-staged, and madge.
- Vitest with coverage and Playwright production smoke tests.
- Tailwind 4, local CSS, and system fonts without build-time external font downloads.
- No authentication, database, storage SDK, workers, analytics, Sentry, or large component library.

Start with [CONTRIBUTING.md](CONTRIBUTING.md), [AGENTS.md](AGENTS.md), and [SECURITY.md](SECURITY.md).

## Origin and publishing

Derived from Josh Echeverri's `monolith-industries` at commit `35d84ecf32a7c84d6b2b58231e262717cf32a5d8`, retaining its logo, Route Handler preference, and code style while removing its application services.

The package is marked `private` to prevent accidental npm publication. The source did not include a license; none has been invented here. Choose an appropriate license before distributing the code under new terms.

## Commits and versions

```text
feat/gallery-grid           → branch
feat(ui): add gallery grid  → commit and PR title
npm run version:patch       → verified bump, commit, and tag
```

Use `version:minor` for compatible features or `version:major` for breaking changes. npm's `preversion` hook runs the full checks before changing the version, and `.npmrc` keeps release commits conventional. Nothing is pushed or published automatically. See [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for the complete rules.

## Dependency decisions

Versions are pinned and checked against the npm registry. See [dependency notes](docs/dependencies.md) for compatibility constraints and the two scoped security patches. The latest release of a tool is not always compatible with the current Next.js lint stack.

---

<div align="center">
  <sub>Next.js · TypeScript · Tailwind CSS · ESLint · Prettier · Vitest · Playwright · GitHub Actions</sub>
</div>
