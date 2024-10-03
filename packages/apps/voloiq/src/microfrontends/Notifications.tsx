import { Icon } from "@volocopter/design-library-react";
import { Suspense } from "react";
import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9012";

export const Notifications = () => {
    return (
        <Suspense fallback={<Icon icon="bell" />}>
            <FederatedModule
                baseUrl={microfrontendBaseUrl}
                module="notifications"
                scope="notifications"
                componentPath="./App"
                componentName="App"
            />
        </Suspense>
    );
};
