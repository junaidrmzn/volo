import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderReactQueryHook } from "../../../react-query";
import { useGetAirspaceIntersections } from "../getAirspaceIntersections";
import { anyAirspaceIntersection } from "./anyAirspaceIntersection";

const { eachLike } = Matchers;

const getAirspaceIntersectionsRequest = (routeId: number): RequestOptions => ({
    method: "GET",
    path: `/v1/flight-planning/routes/${routeId}/airspaces-vertical-profile`,
});
const getAirspaceIntersectionsResponse: ResponseOptions = {
    status: 200,
    body: {
        data: {
            airspaceIntersections: eachLike(pactify(anyAirspaceIntersection)()),
        },
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch airspace intersections for vertical profile", async () => {
        const routeId = 1;
        const showAirspaces = true;

        await provider.addInteraction({
            state: `a route exist with id ${routeId} which has airspaces and airspace intersections`,
            uponReceiving: `request to fetch airspace intersections for vertical profile for route with id ${routeId}`,
            withRequest: getAirspaceIntersectionsRequest(routeId),
            willRespondWith: getAirspaceIntersectionsResponse,
        });

        const { result: airspaceIntersectionsResult, waitFor: airspaceIntersectionsWaitFor } = renderReactQueryHook(
            () => useGetAirspaceIntersections(routeId, showAirspaces),
            `${provider.mockService.baseUrl}/v1/flight-planning`
        );

        await airspaceIntersectionsWaitFor(() => airspaceIntersectionsResult.current.isSuccess);
    });
});
