import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { useBulkAddTestPointSequenceManualRows } from ".";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";

const { eachLike, term } = Matchers;
const addTestPointSequenceManualRowsRequest = (
    flightTestOrderId: string,
    testPointSequenceId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
        matcher:
            "\\/ftd\\/v1\\/orders\\/[\\da-fA-F\\-]+\\/test\\-point\\-sequence/[\\da-fA-F\\-]+\\/test\\-point\\-associations",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        sequenceIndex: 1,
        procedureTitle: "Test Procedure Title",
        testPointId: "Test Test Point Id",
        isManual: true,
        testPointParameters: [
            {
                id: "5bce990b-b76c-4241-95a1-674f9f2a62e0",
                name: "Test Parameter Name",
                value: "Test Parameter Value",
            },
            {
                id: "5bce990b-b76c-4241-95a1-674f9f2a62e1",
                name: "Test Parameter Name 2",
                value: "Test Parameter Value 2",
            },
        ],
        notes: "Test Note",
    }),
});

const addTestPointSequenceManualRowsResponse: ResponseOptions = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-creates test point sequence manual rows", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointSequenceId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `a test point sequence with id ${testPointSequenceId} exists for a flight test order with id ${flightTestOrderId}`,
            uponReceiving: "a request for bulk-creating manual rows in a test point sequence",
            withRequest: addTestPointSequenceManualRowsRequest(flightTestOrderId, testPointSequenceId),
            willRespondWith: addTestPointSequenceManualRowsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkAddTestPointSequenceManualRows({ flightTestOrderId, testPointSequenceId }),
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
            result.current.bulkAddTestPointSequenceManualRows({
                data: [
                    {
                        sequenceIndex: 1,
                        procedureTitle: "Test Procedure Title",
                        testPointId: "Test Test Point Id",
                        notes: "Test Note",
                        isManual: true,
                        testPointParameters: [
                            {
                                id: "5bce990b-b76c-4241-95a1-674f9f2a62e0",
                                name: "Test Parameter Name",
                                value: "Test Parameter Value",
                            },
                            {
                                id: "5bce990b-b76c-4241-95a1-674f9f2a62e1",
                                name: "Test Parameter Name 2",
                                value: "Test Parameter Value 2",
                            },
                        ],
                    },
                ],
            });
        });

        await waitForNextUpdate();
    });
});
