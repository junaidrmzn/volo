import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditTestPointSequences } from "./useBulkEditTestPointSequences";

const { term, eachLike } = Matchers;

const editTestPointSequenceRequest = (flightTestOrderId: string, testPointSequenceId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
        matcher: "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/test\\-point\\-sequence",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: testPointSequenceId,
        type: "Test Type",
        testPoint: "Test Test Point",
        successCriteria: "Test Success Criteria",
    }),
});

const editTestPointSequenceResponse: ResponseOptions = {
    status: 200,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-updates test point sequences", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointSequenceId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `a test point sequence with id ${testPointSequenceId} exists for a flight test order with id ${flightTestOrderId}`,
            uponReceiving: "a request for bulk-updating test point sequences",
            withRequest: editTestPointSequenceRequest(flightTestOrderId, testPointSequenceId),
            willRespondWith: editTestPointSequenceResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkEditTestPointSequences({ flightTestOrderId }), {
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
            result.current.bulkEditTestPointSequences({
                data: [
                    {
                        id: testPointSequenceId,
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
