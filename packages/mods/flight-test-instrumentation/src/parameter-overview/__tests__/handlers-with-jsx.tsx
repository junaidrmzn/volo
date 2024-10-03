import { Group, LocalAuthenticationProvider, getPermissionsFromGroups } from "@voloiq/auth";
import { QueryClientProvider } from "../../QueryClientProvider";
import { CypressUIWrapper, ServiceWrapper } from "../../libs/fti-api/mocks/TestWrapper";

export const renderWithFeatureFlagAndPermissions = (
    permissionRole: Group[],
    featureFlag: string,
    isEnabled: boolean,
    Component: JSX.Element
) => {
    const permissions = getPermissionsFromGroups(permissionRole);

    cy.mount(
        <CypressUIWrapper localFeatureFlagsConfiguration={{ [`${featureFlag}`]: { enabled: isEnabled } }}>
            <ServiceWrapper>
                <LocalAuthenticationProvider permissions={permissions}>
                    <QueryClientProvider>{Component}</QueryClientProvider>
                </LocalAuthenticationProvider>
            </ServiceWrapper>
        </CypressUIWrapper>
    );
};

export const renderWithPermissions = (permissionRole: Group[], Component: JSX.Element) => {
    const permissions = getPermissionsFromGroups(permissionRole);

    cy.mount(
        <CypressUIWrapper>
            <ServiceWrapper>
                <LocalAuthenticationProvider permissions={permissions}>
                    <QueryClientProvider>{Component}</QueryClientProvider>
                </LocalAuthenticationProvider>
            </ServiceWrapper>
        </CypressUIWrapper>
    );
};
