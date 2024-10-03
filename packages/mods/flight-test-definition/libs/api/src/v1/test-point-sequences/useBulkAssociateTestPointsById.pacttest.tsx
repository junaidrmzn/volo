import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkAssociateTestPointsById } from "./useBulkAssociateTestPointsById";

const { eachLike, term } = Matchers;

const bulkAssociateTestPointsByIdRequest = (
    flightTestOrderId: string,
    testPointSequenceId: string,
    testPointId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-points`,
        matcher: "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/test\\-point\\-sequence\\/[\\da-fA-F\\-]+\\/test\\-points",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike(testPointId),
});

const bulkAssociateTestPointsByIdResponse: ResponseOptions = {
    status: 201,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("assigns a number of test points to an test point sequence", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointSequenceId = "e328a143-07c6-4bfe-8be9-c513c0da3694";
        const testPointId = "c4146023-8f8a-444c-a1d3-3d83b58151dd";

        await provider.addInteraction({
            state: `a test point sequence with id ${testPointSequenceId} exists for a flight test order with id ${flightTestOrderId} and a test point with id ${testPointId} exists`,
            uponReceiving: `a request for bulk-creating test point sequence test point associations from test points with ids [${testPointId}]`,
            withRequest: bulkAssociateTestPointsByIdRequest(flightTestOrderId, testPointSequenceId, testPointId),
            willRespondWith: bulkAssociateTestPointsByIdResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkAssociateTestPointsById({ flightTestOrderId, testPointSequenceId }),
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
            result.current.bulkAssociateTestPointsById({ data: [testPointId] });
        });

        await waitForNextUpdate();
    });
});
