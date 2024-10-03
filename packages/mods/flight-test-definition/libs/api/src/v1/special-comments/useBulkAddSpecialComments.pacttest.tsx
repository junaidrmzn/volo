import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useOnBulkAddSpecialComments } from "./useBulkAddSpecialComments";

const { eachLike } = Matchers;

const addSpecialCommentRequest = (definitionId: string): RequestOptions => ({
    path: `/ftd/v1/definitions/${definitionId}/special-comments`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: eachLike({
        comment: "Harness configuration IDs and associated failed motors are detailed in the table.",
    }),
});

const addSpecialCommentResponse: ResponseOptions = {
    status: 201,
};

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("creates a special comment", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `there are no specialComments yet created for a definition with id ${definitionId}`,
            uponReceiving: "a request for creating a specialComment",
            withRequest: addSpecialCommentRequest(definitionId),
            willRespondWith: addSpecialCommentResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useOnBulkAddSpecialComments({ definitionId }), {
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
            result.current.onBulkAddSpecialComments(
                [
                    {
                        comment: "Failure configurations",
                    },
                ],
                "5bce990b-b76c-4241-95a1-674f9f2a62e3"
            );
        });

        await waitForNextUpdate();
    });
});
