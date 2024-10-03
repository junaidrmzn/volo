# How to Add Notification Support To Your Module
## Navigation
In order to enable the navigation feature, make sure to register your entities' route templates with the `NavigationProvider`.
This is required for the notification module to know where to navigate to when a user clicks on a specific notification.
Steps to register a route template:
1. Make sure your app is wrapped in the `AppShell` component (or generally speaking, the same `NavigationProvider` the notification app is wrapped in)
2. Call `useRegisterRouteTemplates` in your app component with the respective route templates
    ```ts
    import { useRegisterRouteTemplates } from "@voloiq/notification-provider";

    export const App = () => {
        useRegisterRouteTemplates([{ entityType: "mission", getEntityRoute: (entityId) => `/mission-management/missions/${entityId}/details` }])
        // ...
    }
    ```