import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditRequirements } from "./useBulkEditRequirements";

const { like, term, eachLike } = Matchers;

const editRequirementRequest = (definitionId: string, requirementId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/requirements`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/requirements",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: requirementId,
        title: like("Hover Turn"),
    }),
});
const editRequirementResponse: ResponseOptions = {
    status: 200,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates one or more requirements", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const requirementId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `some requirements with ids [${requirementId}] exist for definition with id ${definitionId}`,
            uponReceiving: "a request for updating one or more requirements",
            withRequest: editRequirementRequest(definitionId, requirementId),
            willRespondWith: editRequirementResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkEditRequirements({ definitionId }), {
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
            result.current.bulkEditRequirements({
                data: [
                    {
                        id: requirementId,
                        title: "Hover Turn",
                    },
                ],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });

        await waitForNextUpdate();
    });
});
