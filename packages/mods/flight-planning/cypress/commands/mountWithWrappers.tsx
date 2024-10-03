import { mount } from "cypress/react";
import { AppShell } from "@voloiq/app-shell";
import { ServiceProvider } from "@voloiq/service";
import { ReactQueryClientProvider } from "../../src/contexts/queryclient/ReactQueryContext";

export const mountWithWrappers: typeof mount = (children) =>
    mount(
        <AppShell
            withI18n
            withRouter
            withTheme
            withFeatureFlags
            withAuth
            withParametersCache
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
            <ServiceProvider baseUrl="http://api.cypress.voloiq.io/v1/flight-planning">
                <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
            </ServiceProvider>
        </AppShell>
    );
