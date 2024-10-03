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
import { useGetAllFlightTestOrders } from "./useGetAllFlightTestOrders";

const { eachLike } = Matchers;

const allFlightTestOrdersRequest = (): RequestOptions => ({
    path: "/ftd/v1/orders",
    method: "GET",
});

const allFlightTestOrdersResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike(
            anyFlightTestOrder({
                id: "913bbd82-373e-4574-9ada-56b04872d54a",
                createTime: "2022-04-19T13:45:51.209700+00:00",
            })
        ),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all flight test orders", async () => {
        await provider.addInteraction({
            state: "there are flight test orders",
            uponReceiving: "a request for all flight test orders",
            withRequest: allFlightTestOrdersRequest(),
            willRespondWith: allFlightTestOrdersResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(useGetAllFlightTestOrders, {
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
            result.current.getAllFlightTestOrders();
        });

        await waitForNextUpdate();
    });
});
