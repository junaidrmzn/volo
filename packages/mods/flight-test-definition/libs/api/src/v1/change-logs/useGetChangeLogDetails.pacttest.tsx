import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook, waitFor } from "@voloiq/testing";
import { PACT_CONSUMER_FTD_UI, PACT_PROVIDER_FTD_API } from "../../../config/pactConfig";
import { useGetChangeLogDetails } from "./useGetChangeLogDetails";

const { eachLike, iso8601DateTimeWithMillis, term, like } = Matchers;

const date = "2022-04-19T13:45:51.209700+00:00";
const changeLogRequest = (definitionId: string, referenceId: string): RequestOptions => ({
    path: term({
        generate: `/ftd/v1/definitions/${definitionId}/changelogs/${referenceId}`,
        matcher: "\\/ftd\\/v1\\/definitions\\/[\\da-fA-F\\-]+/changelogs\\/[\\da-fA-F\\-]+",
    }),
    method: "GET",
});

const changeLogResponse = (): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: eachLike({
            id: like("5bce990b-b76c-4241-95a1-674f9f2a62e3"),
            userName: like("Calvin Bayer"),
            userId: like("short summary description"),
            updateTime: iso8601DateTimeWithMillis(date),
            updateType: term({ matcher: "Status Change|Content Editing|Creation", generate: "Status Change" }),
            entity: like({}),
            changes: like({}),
        }),
    },
});

pactWith({ consumer: PACT_CONSUMER_FTD_UI, provider: PACT_PROVIDER_FTD_API }, (provider) => {
    test("fetches a changelog for a specific definition or procedure", async () => {
        const definitionId = "5bce990b-b76c-4241-95a1-674f9f2a62e3";
        const referenceId = "12345";
        await provider.addInteraction({
            state: `a change log for a definition with id ${definitionId} exists`,
            uponReceiving: `a request for the changelog of a definition with id ${definitionId}`,
            withRequest: changeLogRequest(definitionId, referenceId),
            willRespondWith: changeLogResponse(),
        });

        const { result } = renderHook(() => useGetChangeLogDetails({ definitionId, referenceId, manual: false }), {
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
            result.current.getChangeLog();
        });
        await waitFor(() => expect(result.current.changeLog).toEqual(expect.any(Object)));
    });
});
