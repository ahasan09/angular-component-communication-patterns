# Angular EventEmitter & BehaviorSubject Component Communication

Angular 5 demo app illustrating two patterns for sibling/parent-child component communication: `EventEmitter` and `BehaviorSubject` via a central `CommunicationService`.

## Tech Stack
- Angular 5
- TypeScript
- RxJS (EventEmitter, BehaviorSubject)

## Project Structure
```
angular-event_emitter-behavior_subject-component_communication/
├── src/
│   └── app/
│       ├── communication.service.ts   # Central service with both patterns
│       └── components/
├── .angular-cli.json                  # Legacy Angular CLI config (Angular 5)
└── package.json
```

## Development
```bash
# Install dependencies
npm install

# Run development server
ng serve

# Build
ng build
```

## Key Notes
- Uses the legacy `.angular-cli.json` format (Angular 5 era).
- `CommunicationService` exposes both an `EventEmitter` and a `BehaviorSubject` to compare the two approaches side by side.
