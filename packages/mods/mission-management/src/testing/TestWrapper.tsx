import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { QueryClientProvider } from "@voloiq/network-scheduling-components";
import { MemoryRouter, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import type { CypressServiceProviderProps } from "./types";

const BASE_URL = "http://api.cypress.voloiq.io";

export const ServiceProviderWrapper: FCC<CypressServiceProviderProps> = (props) => {
    const { children, initialEntries, baseUrl } = props;
    return (
        <I18nProvider>
            <LocalFeatureFlagsProvider>
                <ServiceProvider baseUrl={baseUrl} withAuth>
                    <QueryClientProvider>
                        <MemoryRouter initialEntries={initialEntries}>
                            <Routes>{children}</Routes>
                        </MemoryRouter>
                    </QueryClientProvider>
                </ServiceProvider>
            </LocalFeatureFlagsProvider>
        </I18nProvider>
    );
};

export const MissionOverviewWrapper: FCC<CypressServiceProviderProps> = (props) => {
    const { children, initialEntries } = props;
    return (
        <ServiceProviderWrapper baseUrl={BASE_URL} initialEntries={initialEntries}>
            {children}
        </ServiceProviderWrapper>
    );
};
