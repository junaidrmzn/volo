import { ReactNode } from "react";
import { ServiceProvider } from "@voloiq/service";
import { ReactQueryClientProvider } from "./contexts/queryclient/ReactQueryContext";

export type ServiceProvidersProps = {
    children: ReactNode;
};

export const ServiceProviders = (props: ServiceProvidersProps) => {
    const { children } = props;

    return (
        <ServiceProvider baseUrl={`${BACKEND_BASE_URL}/v1/flight-planning`} withAuth>
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ServiceProvider>
    );
};
