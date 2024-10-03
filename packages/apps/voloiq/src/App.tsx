import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { AppShell } from "@voloiq/app-shell";
import { AppRouter } from "./AppRouter";
import { useAuthConfiguration } from "./useAuthConfiguration";

export const App = () => (
    <AppShell
        withTheme
        withRouter
        withI18n
        withFeatureFlags
        withAuth
        withParametersCache
        withNotifications
        authConfiguration={useAuthConfiguration()}
        featureFlagSettings={{
            baseUrl: "$FLAGSMITH_BASE_URL",
            environmentId: "$FLAGSMITH_ENVIRONMENT_ID",
        }}
    >
        <AppRouter />
    </AppShell>
);
