import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9008";

export const VertiportManagement = () => (
    <Suspense fallback={<LoadingScreen />}>
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="vertiport-management"
            scope="vertiportManagement"
            componentPath="./App"
            componentName="App"
        />
    </Suspense>
);
