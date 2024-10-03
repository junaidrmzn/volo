import type { ReactNode } from "react";
import type { Config } from "../authConfig";
import { Provider } from "../providers/Provider";
import { AuthenticationContext } from "./AuthenticationContext";
import { PermissionContext } from "./PermissionContext";
import { useAuthenticationProvider } from "./useAuthenticationProvider";

export type AuthenticationProviderProps = {
    authConfiguration: Config;
    children: ReactNode;
};

export const AuthenticationProvider = (props: AuthenticationProviderProps) => {
    const { children, authConfiguration } = props;
    const { handleLogin, isLoginFinished, authenticationContextValue, permissionContextValue } =
        useAuthenticationProvider({ authConfiguration });

    return (
        <Provider config={authConfiguration} onLogin={handleLogin}>
            <AuthenticationContext.Provider value={authenticationContextValue}>
                <PermissionContext.Provider value={permissionContextValue}>
                    {isLoginFinished && children}
                </PermissionContext.Provider>
            </AuthenticationContext.Provider>
        </Provider>
    );
};
