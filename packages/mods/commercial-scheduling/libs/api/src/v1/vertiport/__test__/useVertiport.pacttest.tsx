import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { VERTIPORT_BASE_URL } from "../../../serviceEndpoints";
import { useGetVertiports } from "../useGetVertiports";

const { eachLike, like } = Matchers;

pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will fetch a list of vertiport for commercial schedule", async () => {
        await provider.addInteraction({
            state: "a list of vertiports for commercial schedule",
            uponReceiving: "request to fetch a list of vertiport for commercial schedule",
            withRequest: {
                path: VERTIPORT_BASE_URL,
                method: "GET",
                query: {
                    page: "1",
                    size: "100",
                },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike({
                        id: "00000000-0000-0000-0000-000000000001",
                        validFrom: "2024-01-01T00:00:000Z",
                        name: "Vertiport",
                        validTo: "2025-01-01T00:00:000Z",
                        code: "code",
                        regionId: "00000000-0000-0000-0000-000000000002",
                    }),
                    error: null,
                    meta: null,
                    pagination: {
                        totalElements: like(1),
                        page: like(1),
                        size: like(1),
                    },
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(useGetVertiports, {
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
