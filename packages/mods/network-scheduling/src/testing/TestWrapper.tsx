import { MemoryRouter, ParametersCacheProvider, Route, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { EventOverview } from "../event/EventOverview";
import type { CypressServiceProviderProps } from "./types";

const BASE_URL = "http://api.cypress.voloiq.io";
const initialEntries = ["/event/overview"];

export const ServiceProviderWrapper: FCC<CypressServiceProviderProps> = (props) => {
    const { children, initialEntries, baseUrl } = props;
    return (
        <ServiceProvider baseUrl={baseUrl} withAuth>
            <ParametersCacheProvider>
                <MemoryRouter initialEntries={initialEntries}>
                    <Routes>{children}</Routes>
                </MemoryRouter>
            </ParametersCacheProvider>
        </ServiceProvider>
    );
};

export const EventOverviewWrapper: FCC<CypressServiceProviderProps> = () => {
    return (
        <ServiceProviderWrapper baseUrl={BASE_URL} initialEntries={initialEntries}>
            <Route path="/event/overview" element={<EventOverview />} />
        </ServiceProviderWrapper>
    );
};
