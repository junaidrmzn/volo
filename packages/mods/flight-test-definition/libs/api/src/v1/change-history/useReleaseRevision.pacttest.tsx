import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useReleaseRevision } from "./useReleaseRevision";

const releaseRevisionRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/revisions`,
    method: "POST",
});

const releaseRevisionResponse: ResponseOptions = {
    status: 204,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("releases a new revision", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `There is a definition with id ${definitionId} that fulfills the requirements for a revision release`,
            uponReceiving: `a request for releasing a revision with definitionId ${definitionId}`,
            withRequest: releaseRevisionRequest(definitionId),
            willRespondWith: releaseRevisionResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useReleaseRevision({ definitionId }), {
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
            result.current.sendRequest();
        });

        await waitForNextUpdate();
    });
});
