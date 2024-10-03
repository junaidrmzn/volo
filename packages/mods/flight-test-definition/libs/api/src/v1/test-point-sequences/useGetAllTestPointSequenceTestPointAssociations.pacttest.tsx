import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyTestPointSequenceTestPointAssociation } from "./anyTestPointSequenceTestPointAssociation";
import { useGetAllTestPointSequenceTestPointAssociations } from "./useGetAllTestPointSequenceTestPointAssociations";

const { eachLike } = Matchers;

const getAllTestPointSequenceTestPointAssociationsRequest = (
    flightTestOrderId: string,
    testPointSequenceId: string
): RequestOptions => ({
    path: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
    method: "GET",
});

const getAllTestPointSequenceTestPointAssociationsResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike(
            anyTestPointSequenceTestPointAssociation({
                testPointParameters: [
                    {
                        id: "ce118b6e-d8e1-11e7-9296-cec278b6b50b",
                        name: "Test Parameter Name",
                        unit: "param unit",
                        value: "Test Parameter Value",
                    },
                ],
            })
        ),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all test point associations of a test point sequence", async () => {
        const flightTestOrderId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const testPointSequenceId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const testPointAssociationId = "c4146023-8f8a-444c-a1d3-3d83b58151dd";

        await provider.addInteraction({
            state: `a test point sequence with id ${testPointSequenceId} exists for a flight test order with id ${flightTestOrderId} and has an associated test point with id ${testPointAssociationId}`,
            uponReceiving: `a request for fetching all test point associations of a test point sequence with id ${testPointSequenceId} from a flight test order with id ${flightTestOrderId}`,
            withRequest: getAllTestPointSequenceTestPointAssociationsRequest(flightTestOrderId, testPointSequenceId),
            willRespondWith: getAllTestPointSequenceTestPointAssociationsResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useGetAllTestPointSequenceTestPointAssociations({ flightTestOrderId, testPointSequenceId }),
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
            result.current.getAllTestPointSequenceTestPointAssociations();
        });

        await waitForNextUpdate();
    });
});
