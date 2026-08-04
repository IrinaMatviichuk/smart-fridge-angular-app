# Getting Started

This guide explains how to set up the Smart Fridge frontend project for local development.

---

# Prerequisites

Before running the project, make sure the following software is installed.

| Tool | Version |
|------|----------|
| Node.js | 26.6.0 |
| npm | 11.18.0 |

You can verify installed versions by running:

```bash
node -v
npm -v
```

---

# Clone Repository

Clone the project.

```bash
git clone <repository-url>
```

Go to the project directory.

```bash
cd smart-fridge-angular-app
```

---

# Install Dependencies

Install all project dependencies.

```bash
npm ci
```

`npm ci` is recommended over `npm install` because it installs the exact dependency versions defined in `package-lock.json`.

---

# Start Development Server

Run the application.

```bash
npm start
```

or

```bash
ng serve
```

The application will be available at

```
http://localhost:4200
```

The development server automatically reloads after source code changes.

---

# Backend

The frontend requires the Smart Fridge backend to be running.

Default API endpoint:

```
http://localhost:8000/api
```

If the backend is unavailable, authentication and API requests will fail.

---

# Environment Configuration

Angular uses different environment files for development and production.

```text
src/
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

Development configuration is loaded automatically when running:

```bash
npm start
```

Production configuration is used during:

```bash
npm run build
```

---

# Build

Create a production build.

```bash
npm run build
```

Generated files are located in

```text
dist/
```

---

# Lint

Run ESLint.

```bash
npm run lint
```

Fix lint issues before creating a pull request.

---

# Unit Tests

Run unit tests.

```bash
npm test
```

---

# Recommended Development Workflow

1. Pull the latest changes.

```bash
git pull
```

2. Install dependencies if required.

```bash
npm ci
```

3. Start the backend.

4. Start the frontend.

```bash
npm start
```

5. Verify the application opens successfully.

---

# Troubleshooting

## Port 4200 is already in use

Run Angular on another port.

```bash
ng serve --port 4201
```

---

## Dependency installation fails

Delete:

```text
node_modules/
package-lock.json
```

Then reinstall:

```bash
npm install
```

---

## Backend connection error

Verify that:

- the backend is running;
- the API URL is correct;
- CORS is configured correctly.

---

# Useful Commands

Install dependencies

```bash
npm ci
```

Run application

```bash
npm start
```

Run lint

```bash
npm run lint
```

Run tests

```bash
npm test
```

Create production build

```bash
npm run build
```

---

# Next Steps

After the application starts successfully, continue with the project documentation:

- Architecture
- Coding Standards
- UI Components
- API
