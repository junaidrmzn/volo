import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetAllChangeLogs } from "./useGetAllChangeLogs";

const { eachLike, iso8601DateTimeWithMillis, term } = Matchers;

const date = "2022-04-19T13:45:51.209700+00:00";
const changeLogsRequest = (definitionId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/changelogs`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+/changelogs",
    }),
    method: "GET",
});

const changeLogsResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: "5bce990b-b76c-4241-95a1-674f9f2a62e3",
            userName: "Calvin Bayer",
            userId: "short summary description",
            updateTime: iso8601DateTimeWithMillis(date),
            updateType: term({ matcher: "Status Change|Content Editing|Creation", generate: "Status Change" }),
            entityType: "flightTestDefinition",
            status: "DRAFT",
            title: "Test Title",
            referenceId: "test-reference-id",
        }),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches a list of changes for a specific definition", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        await provider.addInteraction({
            state: `a change log for a definition with id ${definitionId} exists`,
            uponReceiving: `a request for the changelog of a definition with id ${definitionId}`,
            withRequest: changeLogsRequest(definitionId),
            willRespondWith: changeLogsResponse(),
        });

        const { result, waitForNextUpdate } = renderHook(() => useGetAllChangeLogs({ definitionId, manual: false }), {
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
            result.current.getChangeLogs();
        });

        await waitForNextUpdate();
    });
});
