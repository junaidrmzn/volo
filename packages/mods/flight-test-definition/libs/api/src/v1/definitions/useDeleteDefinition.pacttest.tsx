import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useDeleteDefinition } from "./useDeleteDefinition";

const { term } = Matchers;

const deleteDefinitionRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+",
    }),
    method: "DELETE",
});
const deleteDefnitionResponse: ResponseOptions = {
    status: 204,
};
pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("deletes a specific definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a definition with id ${definitionId} exists`,
            uponReceiving: `a request for deleting definition with id ${definitionId}`,
            withRequest: deleteDefinitionRequest(definitionId),
            willRespondWith: deleteDefnitionResponse,
        });

        const { result } = renderHook(useDeleteDefinition, {
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

        await act(async () => {
            await result.current.deleteDefinition(definitionId, "5bce990b-b76c-4241-95a1-674f9f2a62e3");
        });
    });
});
