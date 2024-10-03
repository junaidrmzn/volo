import type { RequestOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyTestPointSequenceTestPointAssociation } from "./anyTestPointSequenceTestPointAssociation";
import { useBulkEditTestPointSequenceTestPointAssociations } from "./useBulkEditTestPointSequenceTestPointAssociations";

const { term, eachLike } = Matchers;

const editTestPointSequenceTestPointAssociationsRequest = (
    flightTestOrderId: string,
    testPointSequenceId: string,
    testPointSequenceTestPointAssociationId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
        matcher:
            "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/test\\-point\\-sequence\\/[\\da-fA-F\\-]+\\/test\\-point\\-associations",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike(anyTestPointSequenceTestPointAssociation({ id: testPointSequenceTestPointAssociationId })),
});
const editTestPointSequenceTestPointAssociationsResponse = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-updates test point sequence test point associations", async () => {
        const testPointSequenceTestPointAssociationId = "c4146023-8f8a-444c-a1d3-3d83b58151dd";
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointSequenceId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `a test point sequence with id ${testPointSequenceId} exists for a flight test order with id ${flightTestOrderId} and has an associated test point with id ${testPointSequenceTestPointAssociationId}`,
            uponReceiving: "a request for bulk-updating test point sequence test point associations",
            withRequest: editTestPointSequenceTestPointAssociationsRequest(
                flightTestOrderId,
                testPointSequenceId,
                testPointSequenceTestPointAssociationId
            ),
            willRespondWith: editTestPointSequenceTestPointAssociationsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkEditTestPointSequenceTestPointAssociations({ flightTestOrderId, testPointSequenceId }),
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
            result.current.bulkEditTestPointSequenceTestPointAssociations({
                data: [anyTestPointSequenceTestPointAssociation({ id: testPointSequenceTestPointAssociationId })],
            });
        });

        await waitForNextUpdate();
    });
});
