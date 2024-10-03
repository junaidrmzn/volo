import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderReactQueryHook } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useGetRouteTemplate } from "../getRouteTemplate";
import { anyRouteTemplate } from "./anyRouteTemplate";

const { like } = Matchers;

const getRouteTemplateRequest = (routeTemplateId: number): RequestOptions => ({
    method: "GET",
    path: `${FLIGHT_PLANNING_V1}/route-templates/${routeTemplateId}`,
});
const getRouteTemplateResponse: ResponseOptions = {
    status: 200,
    body: {
        data: like(anyRouteTemplate()),
    },
};
pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch a route template", async () => {
        const routeTemplateId = 1;
        const withWaypoints = true;

        await provider.addInteraction({
            state: `a route template with id ${routeTemplateId} exists`,
            uponReceiving: `request to fetch route template with id ${routeTemplateId}`,
            withRequest: getRouteTemplateRequest(routeTemplateId),
            willRespondWith: getRouteTemplateResponse,
        });

        const { result, waitFor } = renderReactQueryHook(
            () => useGetRouteTemplate(routeTemplateId, withWaypoints),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        await waitFor(() => result.current.isSuccess);
    });
});
