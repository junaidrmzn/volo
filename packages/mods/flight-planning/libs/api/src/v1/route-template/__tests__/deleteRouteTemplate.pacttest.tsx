import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act, renderHook } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { ReactQueryClientProvider } from "../../../react-query";
import { useDeleteRouteTemplate } from "../deleteRouteTemplate";
import { anyRouteTemplate } from "./anyRouteTemplate";

const getRouteTemplateRequest = (routeTemplateId: number): RequestOptions => ({
    method: "DELETE",
    path: `/v1/flight-planning/route-templates/${routeTemplateId}`,
});

const getRouteTemplateResponse: ResponseOptions = {
    status: 204,
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will delete a route template", async () => {
        const routeTemplate = anyRouteTemplate();

        await provider.addInteraction({
            state: `a route template with id ${routeTemplate.id} exists`,
            uponReceiving: `request to delete route template with id ${routeTemplate.id}`,
            withRequest: getRouteTemplateRequest(routeTemplate.id),
            willRespondWith: getRouteTemplateResponse,
        });

        const { result, waitFor } = renderHook(() => useDeleteRouteTemplate(), {
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

        act(() => result.current.deleteRouteTemplate(routeTemplate));

        await waitFor(() => result.current.isSuccess);
    });
});
