import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useAddDefinition } from "./useAddDefinition";

const { like } = Matchers;

const addDefinitionRequest: RequestOptions = {
    path: "/ftd/v2/definitions",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: {
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
        requesterName: like("Calvin Bayer"),
        model: like("2x"),
    },
};
const addDefinitionResponse: ResponseOptions = {
    status: 201,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("creates a definition", async () => {
        await provider.addInteraction({
            state: "no definitions exist",
            uponReceiving: "a request for creating a definition in the v2 endpoint",
            withRequest: addDefinitionRequest,
            willRespondWith: addDefinitionResponse,
        });

        const { result, waitForNextUpdate } = renderHook(useAddDefinition, {
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
            result.current.addDefinition({
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
                    requesterName: "Calvin Bayer",
                    model: "2x",
                },
                params: {
                    editSessionId: "ab90e187-0e88-4945-8ada-0d6dd8ffd2b3",
                },
            });
        });

        await waitForNextUpdate();
    });
});
