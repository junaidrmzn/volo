import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9007";

export const NetworkScheduling = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <FederatedModule
                baseUrl={microfrontendBaseUrl}
                module="network-scheduling"
                scope="networkScheduling"
                componentPath="./App"
                componentName="App"
            />
        </Suspense>
    );
};
