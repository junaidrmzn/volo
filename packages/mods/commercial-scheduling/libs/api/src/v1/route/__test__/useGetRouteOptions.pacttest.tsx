import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_VERTIPORT_MANAGEMENT_API } from "../../../pactConstants";
import { pactify } from "../../../pactify";
import { ROUTE_OPTION_BASE_URL } from "../../../serviceEndpoints";
import { anyRouteOption } from "../anyRouteOption";
import { useGetRouteOptions } from "../useGetRouteOptions";

const { eachLike, like } = Matchers;

pactWith.skip({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_VERTIPORT_MANAGEMENT_API }, (provider) => {
    test("will fetch a list of route option for commercial schedule", async () => {
        await provider.addInteraction({
            state: `a list of route option for commercial schedule`,
            uponReceiving: "request to fetch a list of route option for commercial schedule",
            withRequest: {
                path: ROUTE_OPTION_BASE_URL,
                method: "GET",
                query: { offset: "0", limit: "100", orderBy: "name:ASC", isValid: "true" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: eachLike(pactify(anyRouteOption)()),
                    pagination: {
                        totalElements: like(1),
                        page: like(1),
                        size: like(1),
                    },
                },
            },
        });

        const { waitForNextUpdate } = renderHook(useGetRouteOptions, {
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

        await waitForNextUpdate();
    });
});
