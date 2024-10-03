import { Suspense, lazy } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const Microfrontend = lazy(async () => {
    const { App } = await import("@voloiq/flight-test-definition");
    return { default: App };
});

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9001";

export const FlightTestDefinition = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Suspense fallback={<LoadingScreen />}>
            {isFeatureFlagEnabled("vte-730") ? (
                <FederatedModule
                    baseUrl={microfrontendBaseUrl}
                    module="flight-test-definition"
                    scope="flightTestDefinition"
                    componentPath="./App"
                    componentName="App"
                />
            ) : (
                <Microfrontend />
            )}
        </Suspense>
    );
};
