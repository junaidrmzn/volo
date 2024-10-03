import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { useBulkDeleteTestPointSequenceTestPointAssociations } from ".";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";

const { term, eachLike } = Matchers;

const deleteTestPointSequenceTestPointAssociationsRequest = (
    flightTestOrderId: string,
    testPointSequenceId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
        matcher:
            "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/test\\-point\\-sequence/[\\da-fA-F\\-]+\\/test\\-point\\-associations",
    }),
    method: "DELETE",
    body: eachLike("e7ad28d3-20c6-4447-8f07-d4071f53a538"),
});
const deleteTestPointSequenceTestPointAssociationsResponse: ResponseOptions = {
    status: 204,
};

// Skipped because it's not possible to test DELETE requests with `body` via Pact in the back end.
pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-deletes specific test point sequence test point associations", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointSequenceId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const testPointSequenceTestPointAssociationId = "c4146023-8f8a-444c-a1d3-3d83b58151dd";
        await provider.addInteraction({
            state: `a test point sequence with id ${testPointSequenceId} exists for a flight test order with id ${flightTestOrderId} and has an associated test point with id ${testPointSequenceTestPointAssociationId}`,
            uponReceiving: `a request for bulk-deleting test point sequence test point associations with ids [${testPointSequenceId}]`,
            withRequest: deleteTestPointSequenceTestPointAssociationsRequest(flightTestOrderId, testPointSequenceId),
            willRespondWith: deleteTestPointSequenceTestPointAssociationsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkDeleteTestPointSequenceTestPointAssociations({ flightTestOrderId, testPointSequenceId }),
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
            result.current.bulkDeleteTestPointSequenceTestPointAssociations({
                data: [testPointSequenceTestPointAssociationId],
            });
        });

        await waitForNextUpdate();
    });
});
