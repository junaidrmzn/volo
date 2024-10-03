import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useBulkPatchEngineeringTestProcedure } from "./useBulkPatchEngineeringTestProcedure";

const { like, term, eachLike } = Matchers;

const editEngineeringTestProceduresRequest = (
    definitionId: string,
    engineeringTestProcedureId: string
): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/engineering-test-procedures`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+\\/engineering\\-test\\-procedures",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        id: engineeringTestProcedureId,
        title: like("Hover Turn"),
    }),
});
const editEngineeringTestProceduresResponse: ResponseOptions = {
    status: 200,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates one or more engineering test procedures", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const engineeringTestProcedureId = "edddd43d-6b17-4fb4-ad25-bf429563a0ea";

        await provider.addInteraction({
            state: `there exists a definition with id ${definitionId} that has an engineering test procedure with id ${engineeringTestProcedureId}`,
            uponReceiving: "a request for updating one or more engineering test procedures",
            withRequest: editEngineeringTestProceduresRequest(definitionId, engineeringTestProcedureId),
            willRespondWith: editEngineeringTestProceduresResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useBulkPatchEngineeringTestProcedure({ definitionId }), {
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
            result.current.bulkUpdateEngineeringTestProcedures({
                data: [
                    {
                        id: engineeringTestProcedureId,
                        title: "Hover Turn",
                    },
                ],
                params: { editSessionId: "5bce990b-b76c-4241-95a1-674f9f2a62e3" },
            });
        });

        await waitForNextUpdate();
    });
});
