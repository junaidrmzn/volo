import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useAssignWindchillRequirements } from "./useAssignWindchillRequirements";

const { eachLike, term } = Matchers;

const addRequirementRequest = (definitionId: string, windchillRequirementId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/windchill-associated-requirements`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/windchill\\-associated\\-requirements",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike(windchillRequirementId),
});
const addRequirementResponse: ResponseOptions = {
    status: 201,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("assigns a number of windchill requirements to a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const windchillRequirementId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a definition with id ${definitionId} and a windchill requirement with id ${windchillRequirementId} exist`,
            uponReceiving: "a request for assigning a number of windchill requirements to a definition",
            withRequest: addRequirementRequest(definitionId, windchillRequirementId),
            willRespondWith: addRequirementResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useAssignWindchillRequirements({ definitionId }), {
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
            result.current.assignWindchillRequirements(
                [windchillRequirementId],
                "5bce990b-b76c-4241-95a1-674f9f2a62e3"
            );
        });

        await waitForNextUpdate();
    });
});
