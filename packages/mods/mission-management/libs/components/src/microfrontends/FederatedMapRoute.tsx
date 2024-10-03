import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";

export type FederatedMapRouteProps = {
    routeId: string;
    preserveDrawingBuffer?: boolean;
};

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9004";

export const FederatedMapRoute = (props: FederatedMapRouteProps) => {
    const { routeId, preserveDrawingBuffer = false } = props;
    return (
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="flight-planning"
            scope="flightPlanning"
            componentPath="./MapRoute"
            componentName="MapRouteWithData"
            componentProps={{ routeId, preserveDrawingBuffer }}
        />
    );
};
