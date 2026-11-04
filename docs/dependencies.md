# Dependency decisions

Reviewed against npm registry metadata on November 4, 2026. All direct dependencies are exact-pinned, with `package-lock.json` committed. Runtime dependencies are only Next.js 16.4.5, React 19.3.1, and React DOM 19.3.1.

## Compatibility constraints

- **ESLint 9.39.5:** ESLint 10.14.0 is newer, but the current React/accessibility plugins included by `eslint-config-next` declare support through ESLint 9. npm marks ESLint 9 deprecated; keep this exception visible and upgrade when Next's lint dependencies support 10. No peer-dependency bypass is used.
- **TypeScript 5.9.3:** TypeScript 7.0.2 is newer, but madge 8 declares TypeScript `^5.4.4` and typescript-eslint 8 supports `<6.1.0`. This is the latest stable TypeScript satisfying the whole toolchain.
- **Node types 24:** match the Node 24 LTS runtime rather than using types for a newer, unsupported runtime.

## Scoped security patches

The latest compatible parent packages still pull vulnerable development-tool dependencies. Two narrow npm overrides install published upstream patches rather than downgrading Next or ignoring the audit:

- `@typescript-eslint/typescript-estree > minimatch` is pinned to **11.0.4**. [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) affects versions 7 through 11.0.0; patched versions start at 11.0.1. The parser uses the compatible named `minimatch()` API. Node 24 satisfies the new engine requirement. Type-aware project-service wildcard matching, linting, types, tests, and dependency traversal are checked.
- `serve > compression` is pinned to **1.8.2**, fixing [GHSA-vc2v-76pw-4v95](https://github.com/advisories/GHSA-vc2v-76pw-4v95). This is a patch update from serve's pinned 1.8.1. It affects the local static preview tool, not application runtime dependencies.

Remove each override once its parent depends on a fixed version, regenerate the lockfile, and rerun the full checks. Do not remove the audit gate or use `--force` / `--legacy-peer-deps` to hide incompatibilities. A clean audit reflects known registry advisories at the time, not a security guarantee.
