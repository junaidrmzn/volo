import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllApplicableRequirements } from "./useGetAllApplicableRequirements";

const { eachLike, uuid, like, term } = Matchers;

const allApplicableRequirementsRequest = (definitionId: string, procedureId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/applicable-requirements`,
        matcher:
            "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/procedures\\/[\\da-fA-F\\-]+\\/applicable\\-requirements",
    }),
    method: "GET",
});

const allApplicableRequirementsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            applicable: like(true),
            title: like("#1181"),
            content: like("The Flight Control System shall provide control for Altitude."),
            passOrFailCriteria: like(
                "FCS Rate Command and Altitude Hold mode must be able to function with motor(s) failed."
            ),
            procedureId: uuid(),
            source: like("MANUAL"),
        }),
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all applicable requirements of a procedure", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const procedureId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are applicable requirements for a procedure with id ${procedureId} for a definition with id ${definitionId}`,
            uponReceiving: `a request for every applicable requirement of procedure with id ${procedureId} of the definition with id ${definitionId}`,
            withRequest: allApplicableRequirementsRequest(definitionId, procedureId),
            willRespondWith: allApplicableRequirementsResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useGetAllApplicableRequirements({ definitionId, procedureId }),
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
            result.current.getAllApplicableRequirements();
        });

        await waitForNextUpdate();
    });
});
