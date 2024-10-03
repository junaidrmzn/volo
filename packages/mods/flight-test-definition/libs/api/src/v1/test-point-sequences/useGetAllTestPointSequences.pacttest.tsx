import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyTestPointSequence } from "./anyTestPointSequence";
import { useGetAllTestPointSequences } from "./useGetAllTestPointSequences";

const { like } = Matchers;

const allTestPointSequencesRequest = (flightTestOrderId: string): RequestOptions => ({
    path: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
    method: "GET",
});

const allTestPointSequencesResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: [anyTestPointSequence()],
    }),
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all test point sequences of a flight test order", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are test point sequences for a flight test order with id ${flightTestOrderId}`,
            uponReceiving: `a request for fetching all test point sequences of a flight test order with id ${flightTestOrderId}`,
            withRequest: allTestPointSequencesRequest(flightTestOrderId),
            willRespondWith: allTestPointSequencesResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllTestPointSequences({ flightTestOrderId }), {
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
            result.current.getAllTestPointSequences();
        });

        await waitForNextUpdate();
    });
});
