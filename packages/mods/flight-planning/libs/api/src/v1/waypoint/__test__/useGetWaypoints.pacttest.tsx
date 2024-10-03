import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderReactQueryHook } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { anyWaypoint } from "../anyWaypoint";
import { useGetWaypoints } from "../useGetWaypoints";

const routeId = 1;
const getWaypointsRequest: RequestOptions = {
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/waypoints`,
    method: "GET",
    query: {
        page: "1",
        size: "100",
    },
};

const getWaypointsResponse: ResponseOptions = {
    status: 200,
    body: {
        pagination: {
            page: Matchers.like(1),
            size: Matchers.like(1),
            totalPages: Matchers.like(1),
            totalElements: Matchers.like(1),
        },
        error: null,
        data: Matchers.eachLike(pactify(anyWaypoint)()),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    test("fetch waypoints of route", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} exists and has waypoints`,
            uponReceiving: "request to fetch route's waypoints",
            withRequest: getWaypointsRequest,
            willRespondWith: getWaypointsResponse,
        });

        const { result, waitFor } = renderReactQueryHook(
            () => useGetWaypoints(routeId),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        await waitFor(() => result.current.isSuccess);
    });
});
