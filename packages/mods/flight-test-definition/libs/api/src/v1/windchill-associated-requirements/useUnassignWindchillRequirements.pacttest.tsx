import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useUnassignWindchillRequirements } from "./useUnassignWindchillRequirements";

const { eachLike, term, uuid } = Matchers;

const deleteRequirementRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/windchill-associated-requirements`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/windchill\\-associated\\-requirements",
    }),
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike(uuid()),
});
const deleteRequirementResponse: ResponseOptions = {
    status: 204,
};

pactWith.skip({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("deletes one or more specific requirements", async () => {
        const definitionId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        const windchillRequirementId = "e7ad28d3-20c6-4447-8f07-d4071f53a538";
        await provider.addInteraction({
            state: `some windchill requirements with ids [${windchillRequirementId}] are assigned to the definition with id ${definitionId}`,
            uponReceiving: `a request for unassigning windchill requirements with ids [${windchillRequirementId}]`,
            withRequest: deleteRequirementRequest(definitionId),
            willRespondWith: deleteRequirementResponse,
        });

        const { result } = renderHook(() => useUnassignWindchillRequirements({ definitionId }), {
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

        await act(async () => {
            await result.current.unassignWindchillRequirements(
                [windchillRequirementId],
                "5bce990b-b76c-4241-95a1-674f9f2a62e3"
            );
        });
    });
});
