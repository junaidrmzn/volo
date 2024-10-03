import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { actAndGet, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { FlightTestOrderInsert } from "../../v1/flight-test-orders/apiModels";
import { anyFlightTestOrder } from "./anyFlightTestOrder";
import { useAddFlightTestOrder } from "./useAddFlightTestOrder";

const { like } = Matchers;

const mockFlightTestOrder = anyFlightTestOrder();
const postFlightTestOrderRequestBody: FlightTestOrderInsert = {
    masterModel: mockFlightTestOrder.masterModel,
    missionTitle: mockFlightTestOrder.missionTitle,
    msn: mockFlightTestOrder.msn,
};

const addFlightTestOrderRequest = (): RequestOptions => ({
    path: "/ftd/v2/orders",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: like(postFlightTestOrderRequestBody),
});

const allFlightTestOrdersResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates a flight test order", async () => {
        await provider.addInteraction({
            state: "no flight test orders exist",
            uponReceiving: "a request for creating a flight test order",
            withRequest: addFlightTestOrderRequest(),
            willRespondWith: allFlightTestOrdersResponse,
        });

        const { result } = renderHook(() => useAddFlightTestOrder(), {
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

        await actAndGet(() =>
            result.current.addFlightTestOrder({
                data: postFlightTestOrderRequestBody,
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            })
        );
    });
});
