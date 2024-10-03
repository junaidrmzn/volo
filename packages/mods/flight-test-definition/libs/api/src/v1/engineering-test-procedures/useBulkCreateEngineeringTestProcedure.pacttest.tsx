import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkCreateEngineeringTestProcedure } from "./useBulkCreateEngineeringTestProcedure";

const { eachLike, like, term } = Matchers;

const addEngineeringTestProceduresRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/engineering-test-procedures`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/engineering\\-test\\-procedures",
    }),
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        title: like("Hover Turn"),
        details: like("The Flight Control System shall provide control for Altitude"),
    }),
});
const addEngineeringTestProceduresResponse: ResponseOptions = {
    status: 201,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("creates one or more engineering test procedures", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a definition with id ${definitionId} exists`,
            uponReceiving: "a request for creating a number of engineering test procedures",
            withRequest: addEngineeringTestProceduresRequest(definitionId),
            willRespondWith: addEngineeringTestProceduresResponse,
        });

        const { result, waitForNextUpdate } = renderHook(
            () => useBulkCreateEngineeringTestProcedure({ definitionId }),
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
            result.current.bulkAddEngineeringTestProcedures({
                data: [
                    {
                        title: "Hover Turn",
                        details: "The Flight Control System shall provide control for Altitude",
                    },
                ],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });

        await waitForNextUpdate();
    });
});
