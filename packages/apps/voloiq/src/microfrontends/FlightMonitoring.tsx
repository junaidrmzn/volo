import { Suspense, lazy } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const Microfrontend = lazy(async () => {
    const { App } = await import("@voloiq/flight-monitoring");
    return { default: App };
});

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9010";

export const FlightMonitoring = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Suspense fallback={<LoadingScreen />}>
            {isFeatureFlagEnabled("flight-monitoring-microfrontend") ? (
                <FederatedModule
                    baseUrl={microfrontendBaseUrl}
                    module="flight-monitoring"
                    scope="flightMonitoring"
                    componentPath="./App"
                    componentName="App"
                />
            ) : (
                <Microfrontend />
            )}
        </Suspense>
    );
};
