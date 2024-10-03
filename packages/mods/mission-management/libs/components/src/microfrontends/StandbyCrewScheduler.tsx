import { FederatedModule } from "@voloiq/federated-components";
import { isProduction } from "@voloiq/utils";

export type StandbyCrewSchedulerProps = {
    scheduleDate: string;
    aircraftTypeId: string;
    crewId: string;
};

const microfrontendBaseUrl = isProduction ? "$MICROFRONTEND_BASE_URL" : "http://localhost:9009";

export const StandbyCrewScheduler = (props: StandbyCrewSchedulerProps) => {
    const { scheduleDate, aircraftTypeId, crewId } = props;
    return (
        <FederatedModule
            baseUrl={microfrontendBaseUrl}
            module="crew-management"
            scope="crewManagement"
            componentPath="./StandbyCrewsComponent"
            componentName="App"
            componentProps={{ scheduleDate, aircraftTypeId, crewId }}
        />
    );
};
