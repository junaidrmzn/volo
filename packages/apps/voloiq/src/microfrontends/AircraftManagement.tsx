import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9005";

export const AircraftManagement = () => (
    <Suspense fallback={<LoadingScreen />}>
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="aircraft-management"
            scope="aircraftManagement"
            componentPath="./App"
            componentName="App"
        />
    </Suspense>
);
