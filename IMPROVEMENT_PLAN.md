# Improvement Plan: angular-event_emitter-behavior_subject-component_communication

## Overview
Angular 5 demo (circa 2017) comparing EventEmitter and BehaviorSubject communication patterns. Angular 5 is many major versions behind current (19+). Uses the legacy `.angular-cli.json` config format.

## Improvements

### Modernization (High Priority)
- Upgrade from Angular 5 to Angular 19+ — Angular 5 is unsupported and has known security vulnerabilities in its dependency chain
- Replace `.angular-cli.json` with `angular.json`
- Adopt standalone components (no NgModule) and Angular Signals for the modern equivalent of BehaviorSubject state sharing
- Replace TSLint with ESLint + `@angular-eslint`

### Expand the Demo
- Add a third communication pattern: Angular Signals (the current recommended approach)
- Add a fourth pattern: `@ngrx/signals` or NgRx Store for comparison at scale
- Add side-by-side comments explaining when to prefer each pattern

### Testing
- Add unit tests for `CommunicationService` verifying both EventEmitter and BehaviorSubject emissions
- Add component tests verifying that child components receive the correct data

### Documentation
- Expand the README with a table comparing EventEmitter, BehaviorSubject, and Signals: use cases, pros/cons, and gotchas

### DevOps
- Add a `package.json` lint/test/build scripts
- Add GitHub Actions CI
