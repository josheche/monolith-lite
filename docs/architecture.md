# Architecture

## One application, two output modes

The default is a normal Next.js App Router application. `npm run build` produces a server build for `npm start`. Setting `NEXT_OUTPUT=export` through the static scripts selects Next.js static export and produces `out/`. The modes share source code; there is no separate static application.

Keep builds and browser suites sequential within one checkout because they share generated Next.js files. Each Playwright entry point builds its own production variant before testing. A development-server test is not a substitute for either production suite.

## Code boundaries

- `src/app/`: routes, layout, metadata, and global styles.
- `src/components/demo-counter.tsx`: a small Client Component demonstrating interactive state.
- `src/lib/counter.ts`: bounded counter arithmetic, independent of React and covered by unit tests.
- `/demo`: a browser-testable user flow, including the counter's boundaries.
- `e2e/`: browser tests against production output.
- `scripts/`: cross-platform wrappers for static commands.

Server Components are the default. Use Client Components for browser APIs, event handlers, and state. Keep business logic separable from rendering. System fonts avoid an external font service dependency during builds.

## Static export contract

Static hosting serves build artifacts, not a Node.js process. All server rendering runs during the build. Never use secrets while generating content that will be published to `out/`.

Static-compatible features include pre-rendered pages, bundled client interactions, local assets, and requests from the browser to an independently hosted API. That API must enforce its own authentication, authorization, validation, and rate limits; a static page does not provide them.

Static output must not require:

- Request-time cookies, headers, sessions, or server-side authentication.
- Mutation Route Handlers or Server Actions.
- Incremental Static Regeneration, Proxy, or runtime server redirects/rewrites.
- Next.js's default runtime image optimization. Static mode uses unoptimized images; optimize assets before deployment or choose an explicitly configured external loader.
- Unknown dynamic routes. Enumerate supported paths at build time with `generateStaticParams`.

A build-time GET Route Handler can produce a static resource where Next.js supports it; it is not a live API endpoint. Keep host-specific caching, security headers, redirects, and 404 behavior in deployment configuration, then verify them on that host.

## Growing into a server application

There are no Server Actions. Use explicit Route Handlers for request-time mutations in projects that deploy a Next.js server. Validate input and authenticate and authorize every protected operation. Add a database, auth provider, queue, or observability tool only when the feature needs it, with its own tests and documented configuration.

The initial CI checks both server and static modes so the starter remains reusable. When a derived project needs server-only features, choose server deployment explicitly, remove the static CI job and obsolete static commands/docs as appropriate, and retain production server tests. Do not pretend a static export protects server-only routes.

## Guardrails and their limits

TypeScript checks types, ESLint checks code patterns, Prettier checks formatting, madge checks circular imports, Vitest checks covered logic, and Playwright checks selected user flows. Coverage measures exercised code, not correctness. Dependency audits check known advisories, not all possible vulnerabilities. Hooks are convenient local feedback, not a security boundary; required CI checks must be configured on the remote repository.

## GitHub Pages verification

The CI workflow has separate Pages build, deploy, and live verification jobs, gated on quality and both local production browser modes. `configure-pages` supplies the project `base_path` at build time. The same browser suite can target the deployed site using `E2E_BASE_URL` plus `NEXT_PUBLIC_BASE_PATH`; it does not start a local server in that mode. Tests cover bundled CSS/JS, navigation, interaction, direct deep links, refresh, browser history, keyboard use, mobile width, and true 404 responses.

Initial Pages enablement is an owner setting, not a capability of the ordinary workflow token. No credentials or private environment files are published in the Pages artifact.
