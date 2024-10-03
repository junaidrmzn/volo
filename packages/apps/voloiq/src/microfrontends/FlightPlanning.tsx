import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9004";

export const FlightPlanning = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <FederatedModule
                baseUrl={microfrontendBaseUrl}
                module="flight-planning"
                scope="flightPlanning"
                componentPath="./App"
                componentName="App"
            />
        </Suspense>
    );
};
