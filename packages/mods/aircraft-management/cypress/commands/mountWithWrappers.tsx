import { mount } from "cypress/react";
import { QueryClientProvider } from "@voloiq/aircraft-management-components";
import { AppShell } from "@voloiq/app-shell";
import { MemoryRouter } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";

export const mountWithWrappers: typeof mount = (children) =>
    mount(
        <AppShell withAuth withI18n withParametersCache withTheme withFeatureFlags>
            <MemoryRouter initialEntries={["/overview"]}>
                <QueryClientProvider>
                    <ServiceProvider baseUrl="http://api.cypress.voloiq.io">{children}</ServiceProvider>
                </QueryClientProvider>
            </MemoryRouter>
        </AppShell>
    );
