# GOV.UK Frontend, Node.js, Express and Nunjucks — Example Service

A small, server-rendered **parking permit application** built with **Node.js, Express, TypeScript, Nunjucks and GOV.UK Frontend**.

This repository is a practical demonstration of building a multi-step service using server-side rendering, form validation and session-backed state. It also includes automated testing with **Vitest** and **Playwright**.

> **Demonstration only:** This is an independent learning project, not an official GOV.UK service. It does not submit applications to a council or government department, and it does not persist applications to a database.

## What the application demonstrates

- **Express routing:** GET and POST handlers for a multi-step application journey.
- **TypeScript:** Typed application data, validation results and session state.
- **Nunjucks:** Server-rendered pages, shared layouts and reusable GOV.UK Frontend macros.
- **GOV.UK Frontend:** Form inputs, error summaries, summary lists, buttons and confirmation panels.
- **Server-side validation:** Required-field and email-format checks, with errors displayed alongside the relevant inputs.
- **Session management:** Temporarily retaining form answers between requests so users can review and edit them.
- **Post/Redirect/Get:** Redirecting after successful form submissions to avoid accidental resubmission on refresh.
- **Automated tests:** Unit tests for validation with Vitest and browser-based journey tests with Playwright.
- **Development tooling:** TypeScript compilation, ESLint, Prettier and BrowserSync.

## Application journey

1. **Start** — Introduces the parking permit application.
2. **Your details** — Collects a full name, email address and vehicle registration.
3. **Check your answers** — Displays submitted information and allows users to return to the form to make changes.
4. **Confirmation** — Shows a demonstration submission confirmation.

Invalid form submissions return field-level errors and an error summary. Application data is held temporarily in the server-side session rather than saved permanently.

## Technology stack

| Area               | Technology                     |
| ------------------ | ------------------------------ |
| Runtime            | Node.js                        |
| Language           | TypeScript                     |
| Web framework      | Express                        |
| Templates          | Nunjucks                       |
| UI components      | GOV.UK Frontend                |
| Session management | express-session                |
| Unit testing       | Vitest                         |
| Browser testing    | Playwright                     |
| Development        | tsx, BrowserSync, concurrently |
| Code quality       | ESLint, Prettier, EditorConfig |

## Getting started

### Prerequisites

- A current, supported Node.js version and npm.

### Install

```bash
git clone https://github.com/darrensw777/govuk-node-express-nunjucks-examples.git
cd govuk-node-express-nunjucks-examples
npm ci
```

### Run locally

```bash
npm run dev
```

Open **http://localhost:3001** for the BrowserSync development proxy. Express serves the application on **http://localhost:3000**.

To start Express without BrowserSync:

```bash
npm run dev:server
```

### Build and start

```bash
npm run build
npm start
```

The compiled application starts on port 3000 by default.

## Testing

### Unit tests — Vitest

The unit tests cover the permit validation function, including valid data, missing required fields, invalid email addresses and whitespace-only values.

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### End-to-end tests — Playwright

Playwright tests the service through a real Chromium browser, including navigation, form entry and the application journey.

Install the browser once:

```bash
npx playwright install chromium
```

Then run:

```bash
npm run test:e2e
```

Or open Playwright's interactive test runner:

```bash
npm run test:e2e:ui
```

Playwright is configured to use the Express application on port 3000.

> **Configuration note:** The repository currently contains `playright.config.ts`. Rename it to `playwright.config.ts` so Playwright discovers the configuration automatically.

## Code quality

```bash
npm run format        # Format supported files
npm run format:check  # Check formatting
npm run lint          # Run ESLint
npm run lint:fix      # Apply available lint fixes
npm run check         # Run formatting and lint checks
```

## Project organisation

```text
public/                  Custom static assets and styles
src/
  routes/                Express route handlers
  types/                 Application and session types
  validators/            Form validation logic
  app.ts                 Express application setup
views/                   Nunjucks templates
tests/
  unit/                  Vitest unit tests
  e2e/                   Playwright browser tests
```

The application keeps request handling, validation, types and presentation separate to make each concern easier to understand and maintain.

## Scope and production considerations

This repository is deliberately small and focused on demonstrating the underlying technologies rather than implementing a complete public service. A production deployment would require additional work, including:

- A production-ready session store and securely managed session secret.
- HTTPS, secure cookies and CSRF protection.
- More comprehensive validation, security and accessibility testing.
- Appropriate logging, monitoring and error handling.
- Persistent storage or API integration for submitted applications.
- Removal or replacement of any official government branding that could imply endorsement.

## Disclaimer

This project uses GOV.UK Frontend components for demonstration purposes. It is **not affiliated with or endorsed by GOV.UK or any UK government organisation**.
