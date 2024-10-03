import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";

export type FederatedMapRouteOptionProps = {
    routeOptionId: string;
};

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9004";

export const FederatedMapRouteOption = (props: FederatedMapRouteOptionProps) => {
    const { routeOptionId } = props;
    return (
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="flight-planning"
            scope="flightPlanning"
            componentPath="./MapRouteOption"
            componentName="MapRouteOptionWithData"
            componentProps={{ routeOptionId }}
        />
    );
};
