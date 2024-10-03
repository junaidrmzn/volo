/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import {
    MsalAuthenticationTemplate,
    MsalProvider as ReactMsalProvider,
    useIsAuthenticated,
    useMsal,
} from "@azure/msal-react";
import { useCallback, useEffect, useMemo } from "react";
import type { Config } from "../authConfig";
import type { ProviderProps } from "./Provider";

type MsalProviderProps = Pick<ProviderProps, "onLogin"> & { config: Required<Config> };

const MsalProvider: FCC<MsalProviderProps> = (props) => {
    const { children, config, onLogin } = props;
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const getAccessToken = useCallback(async () => {
        const accessTokenRequest = {
            scopes: [`api://${config.verificationInfo!.clientId}/apim`],
            account: accounts[0],
        };

        const { accessToken } = await instance.acquireTokenSilent(accessTokenRequest);

        return accessToken;
    }, [accounts, config.verificationInfo, instance]);

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    useEffect(() => {
        const account = accounts[0];
        if (isAuthenticated && account) {
            onLogin({
                getAccessToken,
                logout: () => instance.logoutRedirect(),
                email: account.username,
                name: account.name!,
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                groups: (account.idTokenClaims?.roles as string[]) || [],
                // the home account id is built by concatenating the uniqueId and tenantId with a dot in between
                // see more at https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md#homeaccountid
                userId: account.localAccountId,
                sessionId: account.idTokenClaims?.sid!,
            });
        }
    }, [accounts, getAccessToken, instance, isAuthenticated, onLogin]);

    return (
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>{children}</MsalAuthenticationTemplate>
    );
};

export const MsalProviderWrapper: FCC<MsalProviderProps> = (props) => {
    const { children, config, onLogin } = props;

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const msalInstance = useMemo(
        () =>
            new PublicClientApplication({
                auth: {
                    clientId: config.verificationInfo!.clientId,
                    authority: config.verificationInfo!.authority,
                    redirectUri: config.verificationInfo!.redirectUri,
                    postLogoutRedirectUri: config.verificationInfo!.redirectUri,
                },
            }),
        [config]
    );

    return (
        <ReactMsalProvider instance={msalInstance}>
            <MsalProvider config={config} onLogin={onLogin}>
                {children}
            </MsalProvider>
        </ReactMsalProvider>
    );
};
