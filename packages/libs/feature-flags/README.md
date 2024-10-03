# Feature Flags Library

In order to leverage feature flags in your application, please add `@voloiq/feature-flags` as a dependency to your package.
With the dependency in place, you can wrap your routes in the `FeatureFlagsProvider` which will fetch the feature flag values from Flagsmith).
The values of each feature flag can be accessed with the `useFeatureFlags` hook.
Feature flag values can (and should) be overridden at runtime with Flagsmith to test the application with different settings on the same environment (see [Overriding feature flag values on a deployed environment](#overriding-feature-flag-values-on-a-deployed-environment)).

## Feature Flags List

Checkout all feature flags on the [Flagsmith UI](https://flagsmith.volocloud.org/) in the VoloIQ project.

## Adding new Feature Flags

Add feature flags on the [Flagsmith UI](https://flagsmith.volocloud.org/) in the VoloIQ project.
To prevent unwanted behavior for long-lasting feature flags during a Flagsmith Api outage, each feature flag must also be listed with a [fallback value](https://dev.azure.com/volocopter/devops/_git/devops-voloiq-services-appconfig?path=/configuration/apps/voloiq-ui.yml) in the app configuration of the VoloIQ.

## Library usage example

```tsx
// ...
import { FeatureFlagsProvider, useFeatureFlags } from "@voloiq/feature-flags";

export const Router = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    <Routes>
        <Route path="/" element={<AppLayout />}>
            <Route path="" element={<Home />} />
            {isFeatureFlagEnabled("logbook") && <Route path="logbook/*" element={<Logbook />} />}
        </Route>
    </Routes>;
};

export const App = () => (
    <FeatureFlagsProvider>
        <Router />
    </FeatureFlagsProvider>
);
```

## Testing

The easier option for testing is to use the `LocalFeatureFlagsProvider` provider: instead of making a request and displaying a loading spinner, it directly exposes the feature flags configuration from its prop values (with all feature flags enabled by default).
A more robust strategy is to use the `FeatureFlagsProvider` provider and mock the feature flags configuration path with MSW. However, this makes testing more complicated as a spinner will be rendered on the first tick: you need to wait for this spinner to be gone before actually starting your test actions and assertions.

To make it easier for developers, the `render` API exposed by the `@voloiq/testing` library automatically wraps a `LocalFeatureFlagsProvider` during testing, and accepts an optional parameter to partially override the value of each feature flag:

```tsx
// ...
import { render } from "@voloiq/testing";

test("The different sub menus adapt based on the feature flag values", async () => {
    render(<VoloIqNavigationBar />, {
        resources: {
            enabled: true,
        },
        logbook: {
            enabled: false,
        },
    });

    // ...
});
```

## Overriding feature flag values locally

Overriding feature flag values locally can be useful for testing.
The `AppShell` component accepts an optional parameter to partially override the value of each feature flag. For example, in voloiq `App.tsx` file:

```tsx
export const App = () => (
    <AppShell
        withTheme
        withRouter
        withI18n
        withFeatureFlags
        withAuth
        withParametersCache
        authConfiguration={useAuthConfiguration()}
        featureFlagSettings={{
            baseUrl: "$FLAGSMITH_BASE_URL",
            environmentId: "$FLAGSMITH_ENVIRONMENT_ID",
        }}
        localFeatureFlagsConfiguration={{
            // Overrides the logbook feature flag value in the local dev environment
            logbook: {
                enabled: false,
            },
        }}
    >
        <AppRouter />
    </AppShell>
);
```

## Overriding feature flag values on a deployed environment

Flagsmith allows you to override feature flag values for specific users.
Open the [Flagsmith UI](https://flagsmith.volocloud.org/) in the VoloIQ project, then navigate to the environment you wish to override feature flag values. Open the users page and search for your volocopter email (e.g. john.doe@volocopter.com), then open your profile and change the feature flag values as needed.
You can also bookmark the link of your profile for easier access in the future.
