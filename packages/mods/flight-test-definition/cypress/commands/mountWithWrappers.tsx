import { mount } from "cypress/react";
import type { ReactNode } from "react";
import { AppShell } from "@voloiq/app-shell";
import { MemoryRouter } from "@voloiq/routing";
import { ServiceProvider } from "@voloiq/service";
import { QueryClientProvider } from "../../src/QueryClientProvider";

export type MountWithWrappersProps = (children: ReactNode, initialRoute: string) => ReturnType<typeof mount>;

export const mountWithWrappers: MountWithWrappersProps = (children, initialRoute) =>
    mount(
        <AppShell withAuth withI18n withParametersCache withTheme withFeatureFlags>
            <QueryClientProvider>
                <MemoryRouter initialEntries={[initialRoute]}>
                    <ServiceProvider baseUrl="http://api.cypress.voloiq.io">{children}</ServiceProvider>
                </MemoryRouter>
            </QueryClientProvider>
        </AppShell>
    );
