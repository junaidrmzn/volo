import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9009";

export const CrewManagement = () => (
    <Suspense fallback={<LoadingScreen />}>
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="crew-management"
            scope="crewManagement"
            componentPath="./App"
            componentName="App"
        />
    </Suspense>
);
