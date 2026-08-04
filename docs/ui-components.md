# UI Components

This document describes reusable UI components available in the project.

Shared UI components are located in:

```text
src/app/shared/ui/
```

Shared components must not contain business logic.

---

# Button

Reusable application button.

Location

```text
shared/ui/button/
```

Features

- Primary button
- Disabled state
- Loading state
- Full width support

Example

```html
<app-button
  type="submit"
  [loading]="loading()"
  [disabled]="disabled()"
>
  Log In
</app-button>
```

---

# TextField

Reusable text input component.

Location

```text
shared/ui/text-field/
```

Features

- Signal Forms support
- Prefix icon
- Validation
- Accessibility
- Error state
- Autofill support

Example

```html
<app-text-field
  inputId="email"
  label="Email"
  placeholder="Enter your email"
  prefixIcon="email"
  [formField]="loginForm.email"
/>
```

---

# PasswordField

Reusable password input component.

Location

```text
shared/ui/password-field/
```

Features

- Signal Forms support
- Password visibility toggle
- Placeholder icon
- Validation
- Accessibility

Example

```html
<app-password-field
  inputId="password"
  label="Password"
  prefixIcon="lock"
  placeholder="Enter password"
  [formField]="loginForm.password"
/>
```

---

# FormField

Provides common layout for form controls.

Location

```text
shared/ui/form-field/
```

Responsibilities

- Label
- Required marker
- Validation message
- Reserved message space
- Accessibility attributes

Used internally by:

- TextField
- PasswordField

---

# FormMessage

Displays form-level messages.

Location

```text
shared/ui/form-message/
```

Supports

- Error
- Success
- Information

Example

```html
<app-form-message
  [message]="serverError()"
  type="error"
/>
```

---

# Icons

Icons are registered centrally.

Location

```text
src/app/core/icons/
```

Icons are rendered using Angular Material.

Example

```html
<mat-icon svgIcon="email" />
```

---

# Design Principles

Shared UI components should:

- be reusable;
- be framework-consistent;
- contain no business logic;
- expose a minimal public API;
- support accessibility;
- use Design Tokens for styling.

---

# Adding a New Shared Component

Before creating a new shared component, verify that:

- it is not business specific;
- it can be reused by multiple features;
- it follows the existing naming conventions;
- it supports standalone architecture.

Otherwise, place it inside the corresponding feature instead of `shared/ui`.
