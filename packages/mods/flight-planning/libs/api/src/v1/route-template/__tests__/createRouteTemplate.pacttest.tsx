import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { act, renderHook } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { ReactQueryClientProvider } from "../../../react-query";
import { useCreateRouteTemplate } from "../createRouteTemplate";
import { anyRouteTemplate } from "./anyRouteTemplate";

const { like } = Matchers;
const createRoutesTemplateRequest = (routeId: number): RequestOptions => ({
    path: "/v1/flight-planning/route-templates",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: like({
        routeId,
        name: "Demo",
        plannedBy: "voloiq-flightplanning",
    }),
});
const createRoutesTemplateResponse: ResponseOptions = {
    status: 201,
    body: {
        data: like(pactify(anyRouteTemplate)()),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("creates a route template", async () => {
        const routeId = 1;

        await provider.addInteraction({
            state: `route with id ${routeId} exists and has route template`,
            uponReceiving: "request for creating route template",
            withRequest: createRoutesTemplateRequest(routeId),
            willRespondWith: createRoutesTemplateResponse,
        });

        const { result, waitFor } = renderHook(() => useCreateRouteTemplate(), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={`${provider.mockService.baseUrl}/v1/flight-planning`}>
                                <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(() => {
            result.current.createRouteTemplate({
                routeId,
                name: "Demo",
                plannedBy: "voloiq-flightplanning",
            });
        });

        await waitFor(() => result.current.isSuccess);
    });
});
