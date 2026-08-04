# 🧊 Smart Fridge

Smart Fridge is a modern Angular application for managing fridge inventory, tracking product expiration dates, generating shopping lists, and receiving AI-powered recipe recommendations.

The project is built with **Angular 22**, **Signals**, **Signal Forms**, and follows **Feature-Based** and **Clean Architecture** principles.

---

# ✨ Features

- JWT Authentication
- User Registration & Login
- Fridge Inventory *(in progress)*
- Shopping Lists *(planned)*
- Recipe Recommendations *(planned)*
- AI Assistant *(planned)*

---

# 🛠 Tech Stack

## Frontend

- Angular 22
- TypeScript
- Angular Material
- Angular Signals
- Angular Signal Forms
- RxJS
- SCSS

## Backend

- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication

---

# Requirements

| Tool | Version |
|------|----------|
| Node.js | **26.6.0** |
| npm | **11.18.0** |

---

# Getting Started

Install dependencies

```bash
npm ci
```

Run development server

```bash
npm start
```

or

```bash
ng serve
```

Open

```
http://localhost:4200
```

---

# 📦 Production Build

```bash
npm run build
```

Build artifacts are generated inside

```
dist/
```

---

# Project Structure

```text
src/
└── app/
    ├── core/
    ├── features/
    └── shared/
```

---

# Documentation

Additional documentation can be found in the **docs** folder.

| Document | Description |
|-----------|-------------|
| [Getting Started](docs/getting-started.md) | Local setup and build |
| [Architecture](docs/architecture.md) | Project architecture |
| [Development Guide](docs/coding-standards) | Coding conventions |
| [UI Components](docs/ui-components.md) | Shared UI components |
| [API](docs/api.md) | Backend API |

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm start` | Run development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |

---

# Architecture Overview

```text
Presentation
      │
      ▼
Application
      │
      ▼
Data Access
      │
      ▼
Domain
```

More information is available in:

- `docs/architecture.md`

---

# Development Principles

- Standalone Components
- ChangeDetectionStrategy.OnPush
- Angular Signals
- Signal Forms
- Feature-Based Architecture
- Clean Architecture
- Strong Typing
- Reusable UI Components
- Design Tokens
- No business logic inside shared UI

---

# 📄 License

MIT
