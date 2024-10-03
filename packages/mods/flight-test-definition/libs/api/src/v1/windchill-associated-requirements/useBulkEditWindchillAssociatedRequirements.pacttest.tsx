import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkEditWindchillAssociatedRequirements } from "./useBulkEditWindchillAssociatedRequirements";

const { like, term, eachLike } = Matchers;

const bulkEditWindchillAssociatedRequirementsRequest = (
    definitionId: string,
    windchillRequirementId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/windchill-associated-requirements`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/windchill-associated-requirements",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: [
        {
            id: windchillRequirementId,
            passOrFailCriteria: like(
                "This is some Pass and Fail Criteria that are super important to follow or else it has dramatic consequences."
            ),
        },
    ],
});

const editSpecialCommentResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: "1a3afe6d-43dc-43e7-a69a-3efde5f612ef",
            passOrFailCriteria: "Foo",
        }),
    },
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates a windchill associated requirement", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const windchillRequirementId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const windchillRequirementIds = [windchillRequirementId];
        await provider.addInteraction({
            state: `some windchill requirements with ids [${windchillRequirementIds}] exist associated to the definition with id ${definitionId}`,
            uponReceiving: "a request for updating a windchill associated requirement",
            withRequest: bulkEditWindchillAssociatedRequirementsRequest(definitionId, windchillRequirementId),
            willRespondWith: editSpecialCommentResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkEditWindchillAssociatedRequirements({ definitionId }),
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
            result.current.bulkEditWindchillAssociatedRequirements(
                [
                    {
                        id: windchillRequirementId,
                        passOrFailCriteria:
                            "This is some Pass and Fail Criteria that are super important to follow or else it has dramatic consequences.",
                    },
                ],
                "5bce990b-b76c-4241-95a1-674f9f2a62e3"
            );
        });

        await waitForNextUpdate();
    });
});
