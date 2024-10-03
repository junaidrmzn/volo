import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook, waitFor } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { anyPactAttachedFile } from "./anyPactAttachedFile";
import { useGetAllAttachedFiles } from "./useGetAllAttachedFiles";

const allAttachedFilesRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/files`,
    method: "GET",
});

const allAttachedFilesResponse = (definitionId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.eachLike(anyPactAttachedFile({ definitionId })),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
});
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all attached files of a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are attached files for definition with id ${definitionId}`,
            uponReceiving: `a request for all files of definition with id ${definitionId}`,
            withRequest: allAttachedFilesRequest(definitionId),
            willRespondWith: allAttachedFilesResponse(definitionId),
        });

        const { result } = renderHook(() => useGetAllAttachedFiles(definitionId), {
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
        await waitFor(() => expect(result.current?.attachedFiles).toHaveLength(1));
    });
});
