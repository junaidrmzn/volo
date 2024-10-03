import { renderHook as renderHookTestingLibrary } from "@testing-library/react-hooks";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "../context/ServiceProvider";

const assertNonNullable = <T extends {} | undefined>(data: T): asserts data is NonNullable<T> => {
    if (!data) {
        throw new Error("Data is not defined");
    }
};
// Typescript needs this reassignment for the assertion function to be explicitly typed
export const expectToBeDefined: typeof assertNonNullable = assertNonNullable;

export const renderHook = <TProps, TResult>(callback: (props: TProps) => TResult) =>
    renderHookTestingLibrary(callback, {
        wrapper: (props) => (
            <I18nProvider>
                <LocalAuthenticationProvider>
                    <ServiceProvider baseUrl="https://api.voloiq.com">{props.children}</ServiceProvider>
                </LocalAuthenticationProvider>
            </I18nProvider>
        ),
    });
