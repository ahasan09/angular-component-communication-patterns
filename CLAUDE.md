# Angular EventEmitter & BehaviorSubject Component Communication

Angular 21 demo app illustrating two patterns for sibling/parent-child component communication: `EventEmitter` and `BehaviorSubject` via a central `CommunicationService`.

## Tech Stack
- Angular 21
- TypeScript 5.9
- RxJS (EventEmitter, BehaviorSubject)
- Jest (unit testing)
- Bootstrap 5

## Project Structure
```
angular-component-communication-patterns/
├── src/
│   └── app/
│       ├── communication.service.ts   # Central service with both patterns
│       └── components/
├── angular.json
├── package.json
└── tsconfig.json
```

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm start   # or ng serve

# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Build for production
npm run build
```

## Key Notes
- `CommunicationService` exposes both an `EventEmitter` and a `BehaviorSubject` to compare the two approaches side by side.
- Uses Jest instead of Karma/Jasmine for unit testing.
- Uses modern Angular workspace `angular.json` config.
