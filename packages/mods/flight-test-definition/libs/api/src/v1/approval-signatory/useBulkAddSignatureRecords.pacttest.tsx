import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkAddSignatureRecords } from "./useBulkAddSignatureRecords";

const { term, eachLike, uuid } = Matchers;

const bulkAddSignatureRecordsRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/approval-signatory`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/approval-signatory",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        team: "DE",
        role: "DE",
        name: "John Doe",
        approvalType: "Authored (DE)",
        approvalSection: "Test Request Approval",
    }),
});

const addSignatureRecordsResponse: ResponseOptions = {
    status: 201,
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
    test("creates signature records assigned to a flight test definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `a definition with id ${definitionId} exists`,
            uponReceiving: `a request for creating signature records and assigning them to a definition with id ${definitionId}`,
            withRequest: bulkAddSignatureRecordsRequest(definitionId),
            willRespondWith: addSignatureRecordsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkAddSignatureRecords({ definitionId }), {
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
            result.current.bulkAddSignatureRecords(
                [
                    {
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
