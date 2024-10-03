import { MountReturn, mount } from "cypress/react";
import { AppShell } from "@voloiq/app-shell";
import { Permission, authConfigurationStub } from "@voloiq/auth";

export type MountWithWrappersOptions = {
    authorizationConfiguration?: Permission[];
};
export type MountWithWrappers = (
    children: React.ReactNode,
    options?: MountWithWrappersOptions
) => Cypress.Chainable<MountReturn>;

export const mountWithWrappers: MountWithWrappers = (children, options = {}) => {
    const { authorizationConfiguration } = options;

    return mount(
        <AppShell
            withI18n
            withTheme
            withAuth
            withRouter
            localAuthorizationConfiguration={authorizationConfiguration}
            authConfiguration={authConfigurationStub}
        >
            {children}
        </AppShell>
    );
};
