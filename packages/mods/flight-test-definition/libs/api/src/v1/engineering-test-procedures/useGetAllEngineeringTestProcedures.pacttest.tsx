import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllEngineeringTestProcedures } from "./useGetAllEngineeringTestProcedures";

const { eachLike } = Matchers;

const getAllEngineeringTestProceduresRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/engineering-test-procedures`,
    method: "GET",
});
const getAllEngineeringTestProceduresResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            title: "This is a test Engineering Test Procedure Title",
            details: "This is a test Engineering Test Procedure Details",
        }),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all engineering test procedures for a specific definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const engineeringTestProcedureId = "edddd43d-6b17-4fb4-ad25-bf429563a0ea";

        await provider.addInteraction({
            state: `there exists a definition with id ${definitionId} that has an engineering test procedure with id ${engineeringTestProcedureId}`,
            uponReceiving: `a request for all engineering test procedures for definition with id ${definitionId}`,
            withRequest: getAllEngineeringTestProceduresRequest(definitionId),
            willRespondWith: getAllEngineeringTestProceduresResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllEngineeringTestProcedures({ definitionId }), {
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
            result.current.getAllEngineeringTestProcedures();
        });

        await waitForNextUpdate();
    });
});
