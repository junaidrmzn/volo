import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditSignatureRecords } from "./useBulkEditSignatureRecords";

const { term, eachLike, uuid } = Matchers;

const bulkEditSignatureRecordsRequest = (definitionId: string, signatureRecordId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/approval-signatory`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/approval-signatory",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: signatureRecordId,
        team: "DE",
        role: "DE",
        name: "John Doe",
        approvalType: "Authored (DE)",
        approvalSection: "Test Request Approval",
    }),
});

const editSignatureRecordsResponse: ResponseOptions = {
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
            definitionId: uuid(),
            approvalType: "Authored (DE)",
            approvalSection: "Test Request Approval",
        }),
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates signature records assigned to a flight test definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const signatureRecordId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";

        await provider.addInteraction({
            state: `some signature records with ids [${signatureRecordId}] exist assigned to a definition with id ${definitionId}`,
            uponReceiving: `a request for updating signature records with ids [${signatureRecordId}]`,
            withRequest: bulkEditSignatureRecordsRequest(definitionId, signatureRecordId),
            willRespondWith: editSignatureRecordsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkEditSignatureRecords({ definitionId }), {
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
            result.current.bulkEditSignatureRecords(
                [
                    {
                        id: "e7ad28d3-20c6-4447-8f07-d4071f53a538",
                        name: "John Doe",
                        role: "DE",
                        team: "DE",
                        approvalType: "Authored (DE)",
                        approvalSection: "Test Request Approval",
                    },
                ],
                "5bce990b-b76c-4241-95a1-674f9f2a62e3"
            );
        });

        await waitForNextUpdate();
    });
});
