import React from "react";
import { ServiceProvider } from "@voloiq/service";
import { StandbyCrews } from "./StandbyCrews";

type AppProps = {
    scheduleDate: string;
    aircraftTypeId: string;
    crewId: string;
};

export const App = (props: AppProps) => {
    const crewLoggingOptions = {
        teamName: "FlightOps",
        serviceName: "crewManagementFrontend",
    };

    const serviceUrl = "/";

    return (
        <ServiceProvider baseUrl={`${BACKEND_BASE_URL}${serviceUrl}`} logging={crewLoggingOptions} withAuth>
            <StandbyCrews {...props} />
        </ServiceProvider>
    );
};
