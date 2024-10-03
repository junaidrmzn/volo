import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { anyNegotiate } from "./anyNegotiate";
import { useGetNegotiate } from "./useGetNegotiate";

const { like } = Matchers;

const negotiateRequest = (): RequestOptions => ({
    path: `/notification/v1/negotiate`,
    method: "GET",
});

const negotiateResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: anyNegotiate(),
    }),
});

pactWith({ consumer: "voloiq.notification.ui", provider: "voloiq.notification.api" }, (provider) => {
    test("fetches a specific websocket connection negotiation", async () => {
        await provider.addInteraction({
            state: undefined,
            uponReceiving: "a request for negotiating a new websocket connection",
            withRequest: negotiateRequest(),
            willRespondWith: negotiateResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetNegotiate({ manual: true }), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
