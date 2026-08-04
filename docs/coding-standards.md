# Coding Standards

This document describes the coding standards used throughout the Smart Fridge project.

All new code should follow these conventions.

---

# General Principles

The project follows:

- Clean Architecture
- Feature-Based Architecture
- SOLID principles
- Composition over inheritance
- Strong typing
- Single Responsibility Principle

---

# Angular

## Standalone Components

Always create standalone components.

```typescript
@Component({
  standalone: true,
})
```

Do not create NgModules unless absolutely necessary.

---

## Change Detection

Always use

```typescript
ChangeDetectionStrategy.OnPush
```

---

## Dependency Injection

Use the `inject()` function.

Preferred:

```typescript
private readonly authFacade =
  inject(AuthFacade);
```

Avoid constructor injection unless there is a specific reason.

---

# Components

Components should remain as small as possible.

A component should only:

- render UI;
- receive inputs;
- emit outputs;
- call facade methods.

Components should never:

- call HttpClient;
- contain business logic;
- manipulate DTOs;
- access Local Storage directly.

---

# State Management

Use Angular Signals.

Feature state should be encapsulated inside dedicated state classes.

Example:

```text
AuthState
DashboardState
```

---

# RxJS

Use Observable throughout the application.

Preferred flow:

```text
Component
    │
    ▼
Facade
    │
    ▼
ApiService
```

Avoid converting Observables into Promises.

Do not use:

- async / await
- firstValueFrom()
- lastValueFrom()

unless there is a very specific technical reason.

---

# Facades

Facades orchestrate business use cases.

Responsibilities:

- call API services;
- update feature state;
- coordinate workflows.

Facades should not contain:

- HTML;
- UI logic;
- styling.

---

# API Services

API services should only communicate with the backend.

Responsibilities:

- perform HTTP requests;
- map DTOs;
- return Observables.

API services should never:

- navigate;
- update UI state;
- display notifications.

---

# Models

Separate DTOs from domain models.

Example:

```text
UserDto

↓

User
```

DTOs represent backend contracts.

Domain models represent frontend business entities.

---

# Mapping

Always use dedicated mappers.

Example:

```text
mapUserDtoToModel()

mapRecipeDtoToModel()
```

Do not expose backend DTOs to UI components.

---

# Shared Components

Shared UI components must be business agnostic.

Allowed:

- Button
- FormField
- PasswordField
- TextField

Not allowed:

- LoginButton
- RegisterField
- RecipeButton

Business-specific components belong inside features.

---

# Forms

Use Angular Signal Forms.

Validation rules belong to the form schema.

Validation messages should be centralized.

Avoid hardcoded validation messages inside components.

Preferred:

```typescript
AUTH_VALIDATION_MESSAGES.emailRequired
```

---

# Styling

Use SCSS.

Use Design Tokens.

Preferred:

```scss
color: var(--sf-color-primary);
```

Avoid:

```scss
color: #4caf50;
```

---

# Naming

Use descriptive names.

Examples:

```text
AuthFacade
AuthApiService
AuthState

DashboardFacade
DashboardState

TextField
PasswordField
```

Avoid abbreviations.

---

# File Structure

One responsibility per file.

Preferred:

```text
user.model.ts

user.dto.ts

user.mapper.ts

user.service.ts
```

Avoid multiple unrelated classes inside a single file.

---

# Constants

Avoid magic numbers and hardcoded strings.

Preferred:

```typescript
AUTH_VALIDATION.passwordMinLength
```

instead of

```typescript
8
```

---

# Error Handling

Application-specific error handling belongs in facades.

Reusable error parsing belongs in shared utilities.

Avoid duplicating error parsing logic.

---

# Imports

Group imports.

Order:

1. Angular
2. RxJS
3. Third-party libraries
4. Core
5. Shared
6. Feature imports
7. Relative imports

Keep imports sorted alphabetically inside each group.

---

# Accessibility

Always support:

- labels
- keyboard navigation
- aria attributes
- screen readers

---

# Performance

Prefer:

- Signals
- OnPush
- track expressions
- lazy loading

Avoid unnecessary computations inside templates.

---

# Documentation

Public APIs should be easy to understand.

Complex business logic should be documented.

Avoid comments that explain obvious code.

Prefer self-explanatory code.

---

# Future Contributions

When introducing new features:

- follow the existing architecture;
- reuse shared components;
- keep business logic inside features;
- avoid introducing new patterns without a technical reason.
