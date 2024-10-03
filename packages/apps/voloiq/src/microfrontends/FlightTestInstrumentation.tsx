import { Suspense, lazy } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const Microfrontend = lazy(async () => {
    const { App } = await import("@voloiq/flight-test-instrumentation");
    return { default: App };
});

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9003";

export const FlightTestInstrumentation = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Suspense fallback={<LoadingScreen />}>
            {isFeatureFlagEnabled("fti-microfrontend") ? (
                <FederatedModule
                    baseUrl={microfrontendBaseUrl}
                    module="flight-test-instrumentation"
                    scope="flightTestInstrumentation"
                    componentPath="./App"
                    componentName="App"
                />
            ) : (
                <Microfrontend />
            )}
        </Suspense>
    );
};
