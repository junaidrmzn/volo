import { renderHook } from "@testing-library/react-hooks";
import type { PropsWithChildren } from "react";
import type { UseQueryResult } from "react-query";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import type { ServiceParameters } from "@voloiq/service";
import { ServiceProvider } from "@voloiq/service";
import { ReactQueryClientProvider } from "./ReactQueryContext";

type ReactQueryHook<T> = (params?: ServiceParameters) => UseQueryResult<T>;

export const renderReactQueryHook = <T extends unknown>(reactQueryHook: ReactQueryHook<T>, mockBaseUrl: string) => {
    return renderHook(() => reactQueryHook(), {
        wrapper: (props: PropsWithChildren<{}>) => {
            const { children } = props;
            return (
                <I18nProvider>
                    <LocalAuthenticationProvider>
                        <ServiceProvider baseUrl={mockBaseUrl}>
                            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                        </ServiceProvider>
                    </LocalAuthenticationProvider>
                </I18nProvider>
            );
        },
    });
};
