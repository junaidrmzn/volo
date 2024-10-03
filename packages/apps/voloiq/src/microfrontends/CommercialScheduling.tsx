import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9011";

export const CommercialScheduling = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <FederatedModule
                baseUrl={microfrontendBaseUrl}
                module="commercial-scheduling"
                scope="commercialScheduling"
                componentPath="./App"
                componentName="App"
            />
        </Suspense>
    );
};
