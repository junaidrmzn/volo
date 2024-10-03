import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { actAndGet, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useEditDefinition } from "./useEditDefinition";

const { like, term } = Matchers;

const editDefinitionRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v2/definitions/${definitionId}`,
        matcher: "\\/ftd\\/v2\\/definitions\\/[\\da-fA-F\\-]+",
    }),
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: like({
        title: like("FCS Commission flight Integration off"),
        summary: like("short summary description"),
        scope: like("short scope description"),
        testArticle: like("short test article / specific aircraft configuration description"),
        testType: like("GROUND"),
        masterModel: like("VC2-1"),
        msn: like("01"),
        ata: like(27),
        testNumber: like(41),
        revision: like("A00"),
    }),
});
const allDefinitionsResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("updates a definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a definition with id ${definitionId} exists`,
            uponReceiving: "a request for updating a definition in the v2 endpoint",
            withRequest: editDefinitionRequest(definitionId),
            willRespondWith: allDefinitionsResponse,
        });

        const { result } = renderHook(() => useEditDefinition(definitionId), {
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

        await actAndGet(() =>
            result.current.editDefinition({
                data: {
                    title: "FCS Commission flight Integration off",
                    summary: "short summary description",
                    scope: "short scope description",
                    testArticle: "short test article / specific aircraft configuration description",
                    testType: "GROUND",
                    masterModel: "VC2-1",
                    msn: "01",
                    ata: 27,
                    testNumber: 41,
                    revision: "A00",
                },
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            })
        );
    });
});
