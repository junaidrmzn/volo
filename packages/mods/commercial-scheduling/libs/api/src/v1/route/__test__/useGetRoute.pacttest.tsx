import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../pactConstants";
import { pactify } from "../../../pactify";
import { ROUTE_BASE_URL } from "../../../serviceEndpoints";
import { anyRoute } from "../anyRoute";
import { useGetRoute } from "../useGetRoute";

const { like } = Matchers;
const routeId = "1";

pactWith.skip({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    test("will fetch a route by id for commercial schedule", async () => {
        await provider.addInteraction({
            state: `a route with id ${routeId} for commercial schedule`,
            uponReceiving: "request to fetch a route by id for commercial schedule",
            withRequest: {
                path: `${ROUTE_BASE_URL}/${routeId}`,
                method: "GET",
                query: { withWaypoints: "false" },
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like(pactify(anyRoute)()),
                    error: null,
                    meta: null,
                    pagination: null,
                },
            },
        });

        const { waitForNextUpdate } = renderHook(() => useGetRoute(routeId), {
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
