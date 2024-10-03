import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";

export type AircraftWorkOrdersProps = {
    aircraftId: string;
};

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9005";

export const AircraftWorkOrders = (props: AircraftWorkOrdersProps) => {
    const { aircraftId } = props;
    return (
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="aircraft-management"
            scope="aircraftManagement"
            componentPath="./WorkOrdersComponent"
            componentName="App"
            componentProps={{ aircraftId }}
        />
    );
};
