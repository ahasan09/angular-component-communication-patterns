# Angular Upgrade Plan

## Goal

Upgrade `angular-component-communication-patterns` from Angular 17 to the latest stable Angular 21 line, refresh the related build/lint/runtime dependencies, and replace the Karma/Jasmine test runner with Jest.

This is a planning document only. No framework upgrade has been executed yet.

## Current State

| Area | Current state |
|------|---------------|
| Angular framework | `@angular/*` packages on `^17.3.0` |
| Angular CLI/build | `@angular/cli` and `@angular-devkit/build-angular` on `^17.3.0` |
| TypeScript | `~5.4.0` |
| RxJS | `^7.8.0` |
| Zone.js | `^0.14.0` |
| Bootstrap | `^5.3.3` |
| Linting | `@angular-eslint/*` `^17.0.0`, ESLint `^8.57.0` |
| Test runner | Karma + Jasmine through `@angular-devkit/build-angular:karma` |
| Existing tests | `src/smoke.spec.ts` with Jasmine matcher `toBeTrue()` |

## Target State

| Area | Target |
|------|--------|
| Angular framework | Angular `21.x` latest stable patch |
| Angular CLI/build | Angular CLI/build packages aligned to Angular `21.x` |
| TypeScript | `~5.9.3` or another Angular-21-compatible `5.9.x` release |
| RxJS | `^7.8.2` unless Angular peer requirements force otherwise |
| Zone.js | `^0.16.1` unless Angular peer requirements force otherwise |
| Bootstrap | `^5.3.8` |
| Linting | `@angular-eslint/*` `21.x`, ESLint `^8.59.1` or the peer-compatible version required by angular-eslint |
| Test runner | Jest using `jest-preset-angular` |
| Removed test stack | `karma`, `karma-*`, `jasmine-core`, `@types/jasmine`, Karma builder config |
| CI | `npm ci`, `npm run lint`, `npm test`, and `npm run build` on push/PR |

Latest package checks as of 2026-05-03:

| Package | Latest observed version | Upgrade note |
|---------|-------------------------|--------------|
| `@angular/core` | `21.2.11` | Primary framework target |
| `@angular/cli` | `21.2.9` | Keep CLI major aligned with Angular core |
| `@angular-eslint/schematics` | `21.3.1` | Align lint tooling with Angular major |
| `jest` | `30.3.0` | New unit test runner |
| `jest-preset-angular` | `16.1.4` | Angular/Jest integration |
| `@types/jest` | `30.0.0` | Jest globals/types |
| `typescript` | `5.9.3` | Use latest 5.x because Angular 21 requires `<6.0.0` |
| `rxjs` | `7.8.2` | Compatible with Angular 21 peer range |
| `zone.js` | `0.16.1` | Target latest unless peer constraints say otherwise |
| `bootstrap` | `5.3.8` | Latest Bootstrap 5 patch |

## References

- Angular release/support policy: https://angular.dev/reference/releases
- Angular version compatibility: https://angular.dev/reference/versions
- Angular `ng update` command: https://angular.dev/cli/update

Key constraints from the Angular docs:

- Angular major versions and CLI major versions should stay aligned.
- Multi-major upgrades should be performed one major version at a time.
- Angular 21 supports Node `^20.19.0 || ^22.12.0 || ^24.0.0`, TypeScript `>=5.9.0 <6.0.0`, and RxJS `^6.5.3 || ^7.4.0`.

## Proposed Upgrade Sequence

### Phase 0: Preflight

1. Confirm local Node version is Angular-21-compatible.

   ```bash
   node --version
   ```

   Use Node `20.19+`, `22.12+`, or `24.x`.

2. Start from a clean working tree.

   ```bash
   git status --short
   npm install
   npm run build
   npm test
   npm run lint
   ```

3. Create a working branch.

   ```bash
   git checkout -b upgrade/angular-21-jest
   ```

### Phase 1: Upgrade Angular One Major At A Time

Angular recommends one-major-at-a-time updates for multi-major upgrades. This project should move from 17 to 21 in four migration steps.

1. Angular 17 -> 18

   ```bash
   npx ng update @angular/core@^18 @angular/cli@^18
   npm run build
   npm test
   npm run lint
   ```

2. Angular 18 -> 19

   ```bash
   npx ng update @angular/core@^19 @angular/cli@^19
   npm run build
   npm test
   npm run lint
   ```

3. Angular 19 -> 20

   ```bash
   npx ng update @angular/core@^20 @angular/cli@^20
   npm run build
   npm test
   npm run lint
   ```

4. Angular 20 -> 21

   ```bash
   npx ng update @angular/core@^21 @angular/cli@^21
   npm run build
   npm test
   npm run lint
   ```

After each step, review generated migrations before continuing.

### Phase 2: Refresh Related Libraries

After Angular reaches 21, update the related libraries and tooling within Angular peer constraints.

```bash
npm install bootstrap@latest rxjs@latest zone.js@latest
npm install -D typescript@~5.9.3
npm install -D @angular-eslint/builder@latest @angular-eslint/eslint-plugin@latest @angular-eslint/eslint-plugin-template@latest @angular-eslint/schematics@latest @angular-eslint/template-parser@latest
npm install -D @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
```

Then verify:

```bash
npm run build
npm run lint
```

If peer dependency conflicts appear, prefer the Angular/Angular ESLint peer ranges over absolute latest package versions.

### Phase 3: Replace Karma/Jasmine With Jest

1. Install Jest packages.

   ```bash
   npm install -D jest jest-preset-angular @types/jest
   ```

2. Remove Karma/Jasmine packages.

   ```bash
   npm uninstall @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
   ```

3. Add Jest setup file.

   Suggested file: `src/setup-jest.ts`

   ```ts
   import 'jest-preset-angular/setup-jest';
   ```

   If `jest-preset-angular` recommends a newer setup API for the installed version, use that instead.

4. Add Jest config.

   Suggested file: `jest.config.js`

   ```js
   module.exports = {
     preset: 'jest-preset-angular',
     setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
     testMatch: ['**/+(*.)+(spec).+(ts)'],
     collectCoverageFrom: ['src/**/*.ts', '!src/main.ts', '!src/environments/**']
   };
   ```

5. Update `tsconfig.spec.json`.

   Replace Jasmine types with Jest types:

   ```json
   {
     "compilerOptions": {
       "types": ["jest", "node"]
     }
   }
   ```

6. Update `package.json` scripts.

   ```json
   {
     "scripts": {
       "test": "jest",
       "test:watch": "jest --watch",
       "test:coverage": "jest --coverage"
     }
   }
   ```

7. Remove Karma config.

   Delete `karma.conf.js` after Jest is passing.

8. Remove the Angular Karma test target from `angular.json`, or leave no `test` architect target if `npm test` is the supported test command.

9. Convert Jasmine-only matchers.

   Current example:

   ```ts
   expect(true).toBeTrue();
   ```

   Jest equivalent:

   ```ts
   expect(true).toBe(true);
   ```

### Phase 4: Add Meaningful Test Coverage

The current test suite only has a smoke assertion. Add focused tests around the component communication examples.

Suggested coverage:

1. `CommunicationService`
   - emits messages to subscribers
   - handles multiple messages in sequence
   - does not emit before a message is sent

2. Parent-to-child communication
   - parent/root component passes expected inputs to child components

3. Child-to-parent communication
   - child output emits the selected or entered value

4. Service-based sibling communication
   - one component sends data through `CommunicationService`
   - another component reacts to the emitted value

5. Routing/home smoke tests
   - main route renders expected component
   - not-found route renders fallback component

### Phase 5: CI Pipeline

Add GitHub Actions after local build/lint/test are green.

Suggested file: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  verify:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test -- --ci

      - name: Build
        run: npm run build
```

## Validation Checklist

Run this before merging the upgrade branch:

```bash
npm ci
npm run lint
npm test -- --ci
npm run build
npm audit
```

Also manually verify:

```bash
npm start
```

Open the app and confirm each component communication example still behaves correctly.

## Risks And Mitigations

| Risk | Mitigation |
|------|------------|
| Angular migrations conflict across multiple major versions | Upgrade one major at a time and commit after each successful step |
| TypeScript latest major is not Angular-compatible | Pin to Angular-compatible TypeScript `5.9.x`, not TypeScript 6 |
| Jest preset setup API changed | Check `jest-preset-angular` docs for the installed version during implementation |
| Lint stack peer dependency conflicts | Align `@angular-eslint/*`, `@typescript-eslint/*`, and ESLint versions through peer requirements |
| Tests pass but browser behavior regresses | Keep manual browser verification in the checklist |
| CI fails due Node version mismatch | Use Node 20.19+ or 22.12+ in CI |

## Proposed Commit Strategy

1. `chore: upgrade Angular to v18`
2. `chore: upgrade Angular to v19`
3. `chore: upgrade Angular to v20`
4. `chore: upgrade Angular to v21`
5. `chore: replace Karma with Jest`
6. `test: add component communication coverage`
7. `ci: add Angular verification workflow`
8. `docs: document Angular 21 Jest upgrade`
