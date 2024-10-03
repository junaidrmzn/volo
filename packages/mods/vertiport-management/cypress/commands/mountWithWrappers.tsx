import { mount } from "cypress/react";
import { AppShell } from "@voloiq/app-shell";
import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "@voloiq/vertiport-management-components";

export const mountWithWrappers: typeof mount = (children) =>
    mount(
        <AppShell withRouter withAuth withI18n withParametersCache withTheme withFeatureFlags>
            <ServiceProvider baseUrl="http://api.cypress.voloiq.io">
                <QueryClientProvider>{children}</QueryClientProvider>
            </ServiceProvider>
        </AppShell>
    );
