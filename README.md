# Angular Component Communication Patterns

Demonstrates common ways to pass data between Angular components:

- Parent-to-child communication with `@Input()`
- Child-to-parent communication with `@Output()` and `EventEmitter`
- Sibling communication through a shared RxJS service

## Tech Stack

- Angular 21
- TypeScript 5.9
- RxJS 7
- Bootstrap 5
- Jest for unit tests
- Angular ESLint for linting
- GitHub Actions for CI

## Requirements

Use a Node.js version supported by Angular 21:

- Node.js `20.19+`, `22.12+`, or `24.x`
- npm 10+

This repo was verified locally with Node.js `22.21.1`.

## Install

```bash
npm install
```

## Run The App

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the Angular dev server |
| `npm run build` | Build the app into `dist/` |
| `npm run lint` | Run Angular ESLint |
| `npm test` | Run Jest tests once |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run test:coverage` | Run Jest with coverage output |

## Communication Examples

### Parent To Child: `@Input()`

`HomeComponent` passes values into child components.

```html
<app-student [parentData]="parentData"></app-student>
<app-courses [parentData]="parentText.value"></app-courses>
```

`StudentComponent` and `CoursesComponent` receive the value through an input.

```ts
@Input() parentData = '';
```

### Child To Parent: `@Output()`

`StudentComponent` emits text changes to its parent.

```ts
@Output() childEvent = new EventEmitter<string>();

onChange(value: string) {
  this.childEvent.emit(value);
}
```

`HomeComponent` receives the emitted value.

```html
<app-student (childEvent)="childData=$event"></app-student>
```

### Sibling Communication: Shared Service

`CommunicationService` stores the shared counter and exposes events.

```ts
private counterSource = new BehaviorSubject<number>(0);
currentCounter = this.counterSource.asObservable();

updateCounter(count: number) {
  this.counterSource.next(count);
}
```

`StudentComponent` increases the counter, while `CoursesComponent` can decrease it. `HomeComponent` listens to both event streams and updates its display.

## Tests

The project uses Jest instead of Karma/Jasmine. Current coverage includes:

- `CommunicationService` counter and event streams
- `CoursesService` data
- `StudentComponent` input/output and counter behavior
- `CoursesComponent` service data rendering and counter behavior
- `HomeComponent` service event handling and child output handling
- Smoke test coverage

Run tests with:

```bash
npm test -- --ci
```

## Continuous Integration

GitHub Actions runs on every push to `main` and every pull request targeting `main`.

The CI pipeline runs:

```bash
npm ci
npm run lint
npm test -- --ci
npm run build
```

Workflow file:

```text
.github/workflows/ci.yml
```
