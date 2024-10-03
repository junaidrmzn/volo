import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllAdditionalComments } from "./useGetAllAdditionalComments";

const { like, uuid, eachLike } = Matchers;

const allAdditionalCommentsRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/additional-comments`,
    method: "GET",
});

const allAdditionalCommentsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            comment: like("Comment"),
        }),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all additional comments of a procedure", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are additional comments for a procedure with id ${procedureId} for a definition with id ${definitionId}`,
            uponReceiving: `a request for every additional comment of procedure with id ${procedureId} of the definition with id ${definitionId}`,
            withRequest: allAdditionalCommentsRequest(definitionId, procedureId),
            willRespondWith: allAdditionalCommentsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useGetAllAdditionalComments({ definitionId, procedureId }),
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
            result.current.getAllAdditionalComments();
        });

        await waitForNextUpdate();
    });
});
