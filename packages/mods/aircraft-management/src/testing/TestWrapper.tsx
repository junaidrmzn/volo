import { MemoryRouter, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import type { CypressServiceProviderProps } from "./types";

const BASE_URL = "http://api.cypress.voloiq.io";

export const ServiceProviderWrapper: FCC<CypressServiceProviderProps> = (props) => {
    const { children, initialEntries, baseUrl } = props;
    return (
        <ServiceProvider baseUrl={baseUrl}>
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>{children}</Routes>
            </MemoryRouter>
        </ServiceProvider>
    );
};

export const AircraftOverviewWrapper: FCC<CypressServiceProviderProps> = (props) => {
    const { children, initialEntries } = props;
    return (
        <ServiceProviderWrapper baseUrl={BASE_URL} initialEntries={initialEntries}>
            {children}
        </ServiceProviderWrapper>
    );
};
