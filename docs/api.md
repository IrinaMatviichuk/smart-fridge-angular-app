# API

This document describes the backend API currently used by the Smart Fridge frontend.

The backend is implemented using Django REST Framework and JWT authentication.

---

# Base URL

Development

```
http://localhost:8000/api
```

Production

```
/api
```

---

# Authentication

Authentication is based on JWT.

After successful login the backend returns:

- Access Token
- Refresh Token

The frontend stores:

- Access Token — used for authenticated requests
- Refresh Token — used to obtain a new Access Token

---

# Login

```
POST /auth/login/
```

## Request

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

## Response

```json
{
  "refresh": "jwt_refresh_token",
  "access": "jwt_access_token"
}
```

---

# Register

```
POST /auth/register/
```

## Request

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

## Response

```json
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2026-08-03T19:57:20.652Z"
}
```

Registration does not authenticate the user.

The user must log in after successful registration.

---

# Current User

```
GET /auth/me/
```

Authorization header is required.

## Response

```json
{
  "id": 1,
  "email": "user@example.com",
  "created_at": "2026-08-03T19:56:21.862Z"
}
```

---

# Refresh Access Token

```
POST /auth/token/refresh/
```

## Request

```json
{
  "refresh": "jwt_refresh_token"
}
```

## Response

```json
{
  "access": "new_access_token"
}
```

---

# Protected Endpoint Example

```
GET /auth/protected-test/
```

## Response

```json
{
  "message": "JWT works",
  "user": "user@example.com"
}
```

---

# Authentication Flow

```text
User
 │
 ▼
Login Form
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
Application
```

---

# HTTP Headers

Authenticated requests include:

```http
Authorization: Bearer <access_token>
```

---

# Error Responses

Typical HTTP status codes returned by the API.

| Status | Description |
|---------|-------------|
| 200 | Success |
| 201 | Resource created |
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 500 | Internal server error |

---

# Validation Errors

Validation errors are returned by the backend as JSON.

Example:

```json
{
  "email": [
    "A user with this email already exists."
  ]
}
```

or

```json
{
  "password": [
    "This password is too short."
  ]
}
```

The frontend extracts the first available validation message and displays it to the user.

---

# Frontend Architecture

Components never communicate with HttpClient directly.

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

# DTO Mapping

The frontend separates backend DTOs from domain models.

```text
Backend JSON
        │
        ▼
DTO
        │
        ▼
Mapper
        │
        ▼
Domain Model
```

This keeps the UI independent from backend implementation details.

---

# Future Endpoints

Additional API documentation will be added as new features are implemented.

Planned modules:

- Dashboard
- Products
- Categories
- Shopping Lists
- Recipes
- AI Assistant
