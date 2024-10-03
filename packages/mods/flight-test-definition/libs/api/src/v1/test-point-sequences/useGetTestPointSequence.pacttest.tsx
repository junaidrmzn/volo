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
import { useGetTestPointSequence } from "./useGetTestPointSequence";

const { like } = Matchers;

const testPointSequenceRequest = (flightTestOrderId: string, testPointSequenceId: string): RequestOptions => ({
    path: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}`,
    method: "GET",
});

const testPointSequenceResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        data: anyTestPointSequence(),
    }),
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all test point sequences of a flight test order", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointSequenceId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";

        await provider.addInteraction({
            state: `there are test point sequences for a flight test order with id ${flightTestOrderId}`,
            uponReceiving: `a request for fetching all test point sequences of a flight test order with id ${flightTestOrderId}`,
            withRequest: testPointSequenceRequest(flightTestOrderId, testPointSequenceId),
            willRespondWith: testPointSequenceResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useGetTestPointSequence({ flightTestOrderId, testPointSequenceId }),
            {
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
            }
        );

        act(() => {
            result.current.getTestPointSequence();
        });

        await waitForNextUpdate();
    });
});
