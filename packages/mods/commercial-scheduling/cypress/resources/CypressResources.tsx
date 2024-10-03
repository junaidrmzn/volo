import { QueryClientProvider } from "@voloiq/commercial-scheduling-components";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { MemoryRouter, Routes } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";

const BASE_URL = "http://api.cypress.voloiq.io";

type CypressServiceProviderProps = {
    initialEntries: string[];
};

export const CypressServiceProvider: React.FC<CypressServiceProviderProps> = (props) => {
    const { children, initialEntries } = props;
    return (
        <I18nProvider>
            <LocalFeatureFlagsProvider>
                <QueryClientProvider>
                    <ServiceProvider baseUrl={BASE_URL} withAuth>
                        <MemoryRouter initialEntries={initialEntries}>
                            <Routes>{children}</Routes>
                        </MemoryRouter>
                    </ServiceProvider>
                </QueryClientProvider>
            </LocalFeatureFlagsProvider>
        </I18nProvider>
    );
};
