import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook, waitFor } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetDefinition } from "./useGetDefinition";

const { term, like } = Matchers;

const definitionRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v2/definitions/${definitionId}`,
        matcher: "\\/ftd\\/v2\\/definitions\\/[\\da-fA-F\\-]+",
    }),
    method: "GET",
});
const definitionResponse = (definitionId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: like({
            id: definitionId,
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
            requesterName: "Calvin Bayer",
            specialEquipment: "Foo",
            dataAnalysisPlan: "Foo",
        }),
    },
});
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches a specific definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a definition with id ${definitionId} exists`,
            uponReceiving: `a request for definition with id ${definitionId} in the v2 endpoint`,
            withRequest: definitionRequest(definitionId),
            willRespondWith: definitionResponse(definitionId),
        });

        const { result } = renderHook(() => useGetDefinition({ definitionId, manual: false }), {
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

        await waitFor(() => expect(result.current.definition).toEqual(expect.any(Object)));
    });
});
