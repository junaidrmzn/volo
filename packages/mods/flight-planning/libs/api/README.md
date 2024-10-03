# Flight Planning API Client Library
This library provides the API clients for the Flight Planning API service.

## What Should Go In Here?
- Hooks that invoke HTTP requests to specific endpoints
- Pact tests for these hooks
- TypeScript types for the DTO models
- Factories for the DTO models (usually prefixed with `any`)

## Folder Structure
This results in a folder structure that should look somewhat like this:
```
src
|__ v1
    |__ useGetEntity.ts             // Hook that fetches "Entity"
    |__ useGetEntity.pacttest.tsx   // Contract test for the above hook
    |__ ... hooks for other HTTP methods
    |__ entity.ts                   // DTO types for "Entity"
    |__ anyEntity.ts                // Factory for the above DTO type
```

## What Must Not Go In Here?
- Any business logic
- Any assumptions on where the hooks are used (e.g., inside a react-router component)