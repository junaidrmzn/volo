import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkAddTestPointSequences } from "./useBulkAddTestPointSequences";

const { eachLike, term } = Matchers;

const addTestPointSequenceRequest = (flightTestOrderId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
        matcher: "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/test\\-point\\-sequence",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        type: "Test Type",
        testPoint: "Test Test Point",
        successCriteria: "Test Success Criteria",
    }),
});

const addTestPointSequenceResponse: ResponseOptions = {
    status: 201,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-creates test point sequences", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a flight test order with id ${flightTestOrderId} exists`,
            uponReceiving: "a request for bulk-creating test point sequences",
            withRequest: addTestPointSequenceRequest(flightTestOrderId),
            willRespondWith: addTestPointSequenceResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkAddTestPointSequences({ flightTestOrderId }), {
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
            result.current.bulkAddTestPointSequences({
                data: [
                    {
                        type: "Test Type",
                        testPoint: "Test Test Point",
                        successCriteria: "Test Success Criteria",
                    },
                ],
            });
        });

        await waitForNextUpdate();
    });
});
