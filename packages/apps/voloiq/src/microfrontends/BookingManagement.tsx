import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";
import { LoadingScreen } from "./LoadingScreen";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9013";

export const BookingManagement = () => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <FederatedModule
                baseUrl={microfrontendBaseUrl}
                module="booking-management"
                scope="bookingManagement"
                componentPath="./App"
                componentName="App"
            />
        </Suspense>
    );
};
