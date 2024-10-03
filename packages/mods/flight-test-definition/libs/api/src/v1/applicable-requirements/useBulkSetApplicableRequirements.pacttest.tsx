import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkSetApplicableRequirements } from "./useBulkSetApplicableRequirements";

const { term, eachLike, uuid, like } = Matchers;

const setApplicableRequirementRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/applicable-requirements`,
        matcher:
            "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/applicable\\-requirements",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: uuid(),
        applicable: like(true),
    }),
});
const setApplicableRequirementResponse: ResponseOptions = {
    status: 200,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("bulk-setting applicable requirements", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const applicableRequirementId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `an applicable requirement with id ${applicableRequirementId} exists for a procedure with id ${procedureId} for definition with id ${definitionId}`,
            uponReceiving: "a request for bulk-setting applicable requirements",
            withRequest: setApplicableRequirementRequest(definitionId, procedureId),
            willRespondWith: setApplicableRequirementResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkSetApplicableRequirements({ definitionId, procedureId }),
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
            result.current.bulkSetApplicableRequirements({
                data: [
                    {
                        id: applicableRequirementId,
                        applicable: true,
                    },
                ],
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            });
        });

        await waitForNextUpdate();
    });
});
