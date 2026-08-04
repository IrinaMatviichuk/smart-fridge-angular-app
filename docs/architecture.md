# Architecture

This project follows a **Feature-Based Architecture** combined with **Clean Architecture** principles.

The main goal is to keep business logic isolated from UI, infrastructure, and framework-specific implementation.

---

# Architecture Layers

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

Each layer has a single responsibility and communicates only with the layer below it.

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

# Core

The `core` layer contains global application infrastructure.

Examples:

- HTTP configuration
- Base API service
- HTTP interceptors
- Icon registration
- Global providers
- Application configuration

Core should **never** contain business logic.

Example:

```text
core/
├── api/
├── icons/
└── config/
```

---

# Features

Each business capability lives inside its own feature.

Example:

```text
features/
└── auth/
```

Each feature has exactly the same structure.

```text
auth/
├── application/
├── constants/
├── data-access/
├── domain/
├── pages/
└── ui/
```

Keeping every feature structured in the same way makes navigation easier and allows features to scale independently.

---

# Application Layer

Contains feature orchestration.

Responsibilities:

- Facades
- Feature state
- Business workflows
- Coordination between UI and API

Examples:

```text
application/
├── auth.facade.ts
└── auth.state.ts
```

The application layer knows nothing about HTML or styling.

---

# Data Access Layer

Responsible for communication with external systems.

Contains:

- API services
- DTOs
- Mappers
- Token storage

Example:

```text
data-access/
├── auth-api.service.ts
├── storage/
└── dto/
```

No UI logic should exist here.

---

# Domain Layer

Contains business models.

Examples:

```text
domain/
├── auth-user.model.ts
├── auth-credentials.model.ts
└── auth-tokens.model.ts
```

The domain layer should be framework independent.

Domain models represent the application, not the backend.

---

# Pages

Pages are route components.

Responsibilities:

- Compose UI
- Connect to facades
- Handle navigation

Pages should not communicate with HttpClient directly.

Example:

```text
pages/
├── login-page/
└── sign-up-page/
```

---

# UI

Feature-specific presentational components.

Examples:

```text
ui/
├── login-form/
├── sign-up-form/
└── auth-hero/
```

UI components should:

- contain no business logic;
- never call APIs directly;
- receive data via inputs;
- communicate using outputs.

---

# Shared

The `shared` module contains reusable components without business logic.

Example:

```text
shared/
└── ui/
    ├── button/
    ├── form-field/
    ├── form-message/
    ├── password-field/
    └── text-field/
```

Shared components may be reused across multiple features.

---

# Data Flow

Authentication example.

```text
LoginForm
      │
      ▼
LoginPage
      │
      ▼
AuthFacade
      │
      ▼
AuthApiService
      │
      ▼
BaseApiService
      │
      ▼
HttpClient
```

The response flows back through the same layers until the UI is updated.

---

# Authentication Flow

```text
User submits credentials
        │
        ▼
POST /auth/login
        │
        ▼
Access Token
Refresh Token
        │
        ▼
AuthTokenStorage
        │
        ▼
GET /auth/me
        │
        ▼
AuthState
        │
        ▼
Application UI
```

---

# State Management

The application uses Angular Signals for local application state.

Feature state is managed inside dedicated state classes.

Example:

```text
AuthState
```

Responsibilities:

- current user
- loading
- error
- authentication state

---

# API Layer

Components never communicate directly with HttpClient.

The communication flow is always:

```text
Component
    │
    ▼
Facade
    │
    ▼
Api Service
    │
    ▼
BaseApiService
    │
    ▼
HttpClient
```

---

# Validation

Forms are implemented using Angular Signal Forms.

Validation rules belong to the form schema.

Validation messages are centralized in constants.

---

# Styling

The project uses:

- SCSS
- Design Tokens
- Component-scoped styles

Hardcoded colors, spacing, typography, and border radius values should be avoided.

---

# Naming Conventions

Examples:

```text
AuthFacade
AuthApiService
AuthState

TextField
PasswordField
FormField
FormMessage
```

Use consistent naming throughout the project.

---

# Design Principles

The project follows these principles:

- Single Responsibility Principle
- Separation of Concerns
- Feature Isolation
- Reusable Components
- Strong Typing
- Composition over Inheritance
- Framework-independent Domain
- Predictable Data Flow
- Minimal Component Logic
