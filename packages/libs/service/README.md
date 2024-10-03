# Service Generator

In order to generate the types for your REST API DTOs using the OpenAPI specification, please add `@voloiq/service` as a dependency to your package.
With the dependency in place, you can run:
`yarn generate-service -n service-schema-name`
The service generator will automatically fetch the OpenAPI specification from the [voloiq-openapi-schemas repository](https://dev.azure.com/volocopter/voloiq/_git/voloiq-openapi-schemas).

Example:
`yarn generate-service -n logbook`

## Pipeline

In order to avoid out-of-sync code, nothing we generate should be checked in. That's why you need to add a `generate:code` script to your `package.json` that triggers all the code generation scripts needed for your package.

Example:

```JSON
scripts: {
    "generate:vtol-management": "yarn generate-service -n vtol-management",
    "generate:battery-management": "yarn generate-service -n battery-management",
    "generate:code": "concurrently \"generate:vtol-management\" \"generate:battery-management\""
}
```

## Provider

In order to use the generated hooks, please don't forget wrapping your `<App />` in the `<ServiceProvider />`.

```tsx
import { ServiceProvider } from "@voloiq/service";

export const App = () => (
    <ServiceProvider baseUrl="http://localhost:8080">
        <App />
    </ServiceProvider>
);
```

## Shared Axios instance

The service library exposes a preconfigured axios instance to handle Authentication: an access token will automatically be fetched (if needed) and attached to each outgoing VoloIQ backend APIs request.

The axios instance can either be used directly by importing it, or by using the [useAxios.ts](./src/hooks/useAxios.ts).  
In both cases, the `useInitializeAxiosInstanceInterceptors` hook should be called when your top level component is initialized: it will enable the request interceptors on the axios instance by making use of the auth library.  
This also means your top level component should be wrapped in an `AuthenticationProvider`.
