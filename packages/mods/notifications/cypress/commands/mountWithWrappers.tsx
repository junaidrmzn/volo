import { mount } from "cypress/react";
import { AppShell } from "@voloiq/app-shell";
import { MemoryRouter } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "../../src/QueryClientProvider";

export const mountWithWrappers: typeof mount = (children) =>
    mount(
        <MemoryRouter>
            <AppShell
                withI18n
                withTheme
                withFeatureFlags
                withAuth
                withParametersCache
                withNotifications
                featureFlagSettings={{
                    baseUrl: "unusedInTests",
                    environmentId: "unusedInTests",
                }}
                authConfiguration={{
                    authorization: {
                        mapping: [],
                    },
                    domain: "unusedInTests",
                    type: "static",
                    verificationInfo: {
                        authority: "unusedInTests",
                        clientId: "unusedInTests",
                        redirectUri: "unusedInTests",
                    },
                }}
            >
                <ServiceProvider baseUrl="http://api.cypress.voloiq.io">
                    <QueryClientProvider>{children}</QueryClientProvider>
                </ServiceProvider>
            </AppShell>
        </MemoryRouter>
    );
