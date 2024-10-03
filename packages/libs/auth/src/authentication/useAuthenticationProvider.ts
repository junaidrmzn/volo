import { useCallback, useState } from "react";
import type { Config } from "../authConfig";
import { getMappedGroupsFromConfig } from "../authConfig";
import { getPermissionsFromGroups } from "../authorization/authorization";
import type { ProviderProps } from "../providers/Provider";
import type { AuthenticationContextValue } from "./AuthenticationContext";
import type { PermissionContextValue } from "./PermissionContext";

type AuthenticationProviderOptions = {
    authConfiguration: Config;
};

export const useAuthenticationProvider = (options: AuthenticationProviderOptions) => {
    const { authConfiguration } = options;
    const [authenticationContextValue, setAuthenticationContextValue] = useState<AuthenticationContextValue>({
        getAccessToken: () => Promise.resolve(""),
        email: "",
        name: "",
        logout: () => {},
        userId: "",
        sessionId: "",
    });
    const [permissionContextValue, setPermissionContextValue] = useState<PermissionContextValue>({ permissions: [] });
    const [isLoginFinished, setIsLoginFinished] = useState(false);

    const handleLogin = useCallback(
        (props: Parameters<ProviderProps["onLogin"]>[0]) => {
            const { groups: providerIds, ...rest } = props;
            const groups = getMappedGroupsFromConfig(providerIds, authConfiguration);
            const permissions = getPermissionsFromGroups(groups);
            setPermissionContextValue({ permissions });
            setAuthenticationContextValue(rest);
            setIsLoginFinished(true);
        },
        [authConfiguration]
    );

    return { authConfiguration, handleLogin, isLoginFinished, authenticationContextValue, permissionContextValue };
};
