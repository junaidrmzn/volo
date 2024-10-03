import React from "react";
import { ServiceProvider } from "@voloiq/service";
import { WorkOrders } from "./WorkOrders";

type AppProps = {
    aircraftId: string;
};

export const App = (props: AppProps) => {
    const aircraftLoggingOptions = {
        teamName: "FlightOps",
        serviceName: "aircraftManagementFrontend",
    };

    const serviceUrl = "/";

    return (
        <ServiceProvider baseUrl={`${BACKEND_BASE_URL}${serviceUrl}`} logging={aircraftLoggingOptions} withAuth>
            <WorkOrders {...props} />
        </ServiceProvider>
    );
};
