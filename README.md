# Angular Component Communication Patterns

Demonstrates the main strategies for passing data between Angular components, including parent-to-child, child-to-parent, and sibling communication via a shared service.

## Patterns Covered

- **`@Input()`** — parent passes data down to child
- **`@Output()` + `EventEmitter`** — child emits events up to parent
- **Shared Service + Subject** — sibling components communicate through a `CommunicationService`

## Components

- `home` — root feature module showcase
- `courses` — demonstrates input/output binding
- `student` — demonstrates service-based communication

## Tech Stack

- Angular (CLI v1.5.6)
- TypeScript

## Prerequisites

- [Node.js](https://nodejs.org/) v10+
- Angular CLI: `npm install -g @angular/cli`

## Getting Started

```bash
git clone https://github.com/ahasan09/angular-component-communication-patterns
cd angular-component-communication-patterns
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200). The app reloads automatically on file changes.

## Commands

| Command | Description |
|---------|-------------|
| `ng serve` | Start dev server on port 4200 |
| `ng build` | Build to `dist/` |
| `ng build --prod` | Production build |
| `ng test` | Run unit tests (Karma) |
| `ng e2e` | Run end-to-end tests (Protractor) |
