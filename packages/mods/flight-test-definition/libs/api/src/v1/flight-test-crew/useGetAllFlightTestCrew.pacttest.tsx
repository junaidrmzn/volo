import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllFlightTestCrew } from "./useGetAllFlightTestCrew";

const { like, eachLike, uuid } = Matchers;

const allFlightTestCrewRequest = (flightTestOrderId: string): RequestOptions => ({
    path: `/ftd/v1/orders/${flightTestOrderId}/crew`,
    method: "GET",
});

const allFlightTestCrewResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            name: "John Doe",
            role: "Pilot in Command",
            category: "Cat. 1",
            position: "TM",
        }),
        pagination: {
            totalElements: like(1),
        },
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all flight test crew members of a flight test order", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are flight test crew members for a flight test order with id ${flightTestOrderId}`,
            uponReceiving: `a request for all flight test crew members of a flight test order with id ${flightTestOrderId}`,
            withRequest: allFlightTestCrewRequest(flightTestOrderId),
            willRespondWith: allFlightTestCrewResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllFlightTestCrew({ flightTestOrderId }), {
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
            result.current.getAllFlightTestCrew();
        });

        await waitForNextUpdate();
    });
});
