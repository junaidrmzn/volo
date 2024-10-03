import { Suspense, lazy } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const Microfrontend = lazy(async () => {
    const { App } = await import("@voloiq/logbook");
    return { default: App };
});

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9002";

export const Logbook = () => {
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Suspense fallback={<LoadingScreen />}>
            {isFeatureFlagEnabled("logbook-microfrontend") ? (
                <FederatedModule
                    baseUrl={microfrontendBaseUrl}
                    module="logbook"
                    scope="logbook"
                    componentPath="./App"
                    componentName="App"
                />
            ) : (
                <Microfrontend />
            )}
        </Suspense>
    );
};
