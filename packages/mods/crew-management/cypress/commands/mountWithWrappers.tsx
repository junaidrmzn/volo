import { mount } from "cypress/react";
import { AppShell } from "@voloiq/app-shell";
import { QueryClientProvider } from "@voloiq/crew-management-components";
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
