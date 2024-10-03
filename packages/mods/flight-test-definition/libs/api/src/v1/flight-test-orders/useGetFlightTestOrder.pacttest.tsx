import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { anyFlightTestOrder } from ".";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetFlightTestOrder } from "./useGetFlightTestOrder";

const { like } = Matchers;

const flightTestOrderRequest = (flightTestOrderId: string): RequestOptions => ({
    path: `/ftd/v1/orders/${flightTestOrderId}`,
    method: "GET",
});

const flightTestOrderResponse = (flightTestOrderId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: anyFlightTestOrder({
            id: flightTestOrderId,
            createTime: "2022-04-19T13:45:51.209700+00:00",
        }),
    }),
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches a specific flight test order", async () => {
        const flightTestOrderId = "913bbd82-373e-4574-9ada-56b04872d54a";
        await provider.addInteraction({
            state: `there is a flight test order with id ${flightTestOrderId}`,
            uponReceiving: "a request for a specific flight test order",
            withRequest: flightTestOrderRequest(flightTestOrderId),
            willRespondWith: flightTestOrderResponse(flightTestOrderId),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetFlightTestOrder({ flightTestOrderId }), {
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
            result.current.getFlightTestOrder();
        });

        await waitForNextUpdate();
    });
});
