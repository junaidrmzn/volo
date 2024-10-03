import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetSignatureRecords } from "./useGetSignatureRecords";

const { like, eachLike, uuid } = Matchers;

const signatureRecordsRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/approval-signatory`,
    method: "GET",
});

const signatureRecordsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            team: "DE",
            role: "DE",
            name: "John Doe",
            approvalType: "Authored (DE)",
            approvalSection: "Test Request Approval",
        }),
        pagination: {
            totalElements: like(1),
        },
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all signature records of a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const signatureRecordId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";

        await provider.addInteraction({
            state: `some signature records with ids [${signatureRecordId}] exist assigned to a definition with id ${definitionId}`,
            uponReceiving: `a request for signature records assigned to definition with id ${definitionId}`,
            withRequest: signatureRecordsRequest(definitionId),
            willRespondWith: signatureRecordsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetSignatureRecords({ definitionId }), {
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
            result.current.getSignatureRecords();
        });

        await waitForNextUpdate();
    });
});
