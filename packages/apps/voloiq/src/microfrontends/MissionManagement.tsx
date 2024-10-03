import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9006";

export const MissionManagement = () => (
    <Suspense fallback={<LoadingScreen />}>
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="mission-management"
            scope="missionManagement"
            componentPath="./App"
            componentName="App"
        />
    </Suspense>
);
