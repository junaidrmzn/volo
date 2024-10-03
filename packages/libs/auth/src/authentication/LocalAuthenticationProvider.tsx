import type { ReactNode } from "react";
import type { Permission } from "../authorization/authorization";
import { getPermissionsFromGroups } from "../authorization/authorization";
import type { AuthenticationContextValue } from "./AuthenticationContext";
import { AuthenticationContext } from "./AuthenticationContext";
import { PermissionContext } from "./PermissionContext";

export type LocalAuthenticationProviderProps = {
    children: ReactNode;
    contextOverrides?: Partial<AuthenticationContextValue>;
    permissions?: Permission[];
};

export const LocalAuthenticationProvider = (props: LocalAuthenticationProviderProps) => {
    const { children, contextOverrides, permissions } = props;

    return (
        <AuthenticationContext.Provider
            value={{
                getAccessToken: () => Promise.resolve("volomockedtoken"),
                email: "john.doe@volocopter.com",
                name: "John Doe",
                logout: () => {},
                userId: "00000000-0000-0000-0000-000000000000",
                sessionId: "00000000-0000-0000-0000-000000000000",
                ...contextOverrides,
            }}
        >
            <PermissionContext.Provider
                value={{
                    // Change Admin for whatever group you want to try
                    permissions: permissions || getPermissionsFromGroups(["Admin"]),
                }}
            >
                {children}
            </PermissionContext.Provider>
        </AuthenticationContext.Provider>
    );
};
