import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceParameters, ServiceProvider } from "@voloiq/service";

type Hook<T> = (params?: ServiceParameters) => T;

export const renderServiceHook = <T extends unknown>(hookToRender: Hook<T>, mockBaseUrl: string) => {
    return renderHook(() => hookToRender(), {
        wrapper: (props: PropsWithChildren<{}>) => {
            const { children } = props;
            return (
                <I18nProvider>
                    <LocalAuthenticationProvider>
                        <ServiceProvider baseUrl={mockBaseUrl}>{children}</ServiceProvider>
                    </LocalAuthenticationProvider>
                </I18nProvider>
            );
        },
    });
};
