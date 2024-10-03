import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllProcedures } from "./useGetAllProcedures";

const { eachLike, uuid, like } = Matchers;

const allProceduresRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/procedures`,
    method: "GET",
});

const allProceduresResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: uuid(),
            procedureId: like("FTD-V21-29-123-123-05"),
            testPointParameters: eachLike({
                id: uuid(),
                name: like("Gross Weight"),
            }),
            title: like("Hover Turn"),
        }),
        pagination: {
            totalElements: Matchers.like(1),
        },
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches all procedures of a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";

        await provider.addInteraction({
            state: `there are procedures for definition with id ${definitionId}`,
            uponReceiving: `a request for every procedure of the definition with id ${definitionId}`,
            withRequest: allProceduresRequest(definitionId),
            willRespondWith: allProceduresResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllProcedures({ definitionId }), {
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
            result.current.getAllProcedures();
        });

        await waitForNextUpdate();
    });
});
