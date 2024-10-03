import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkAddFlightTestCrew } from "./useBulkAddFlightTestCrew";

const { eachLike, term } = Matchers;

const addFlightTestCrewRequest = (flightTestOrderId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/crew`,
        matcher: "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/crew",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        name: "John Doe",
        role: "Pilot in Command",
        category: "Cat. 1",
        position: "TM",
    }),
});

const addFlightTestCrewResponse: ResponseOptions = {
    status: 201,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("creates one or more flight test crew members", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a flight test order with id ${flightTestOrderId} exists`,
            uponReceiving: "a request for creating a number of flight test crew members",
            withRequest: addFlightTestCrewRequest(flightTestOrderId),
            willRespondWith: addFlightTestCrewResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkAddFlightTestCrew({ flightTestOrderId }), {
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
            result.current.bulkAddFlightTestCrew({
                data: [
                    {
                        name: "John Doe",
                        role: "Pilot in Command",
                        category: "Cat. 1",
                        position: "TM",
                    },
                ],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });

        await waitForNextUpdate();
    });
});
