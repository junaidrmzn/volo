import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderReactQueryHook } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useGetAirspaces } from "../getAirspaces";
import { anyAirspace } from "./anyAirspace";

const { eachLike, like } = Matchers;

const getAirspacesRequest = (routeOptionId: number): RequestOptions => ({
    method: "GET",
    path: `${FLIGHT_PLANNING_V1}/route-options/${routeOptionId}/airspaces`,
});
const getAirspacesResponse: ResponseOptions = {
    status: 200,
    body: {
        data: like({
            type: "FeatureCollection",
            features: eachLike(pactify(anyAirspace)()),
        }),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch airspaces", async () => {
        const routeOptionId = 1;

        await provider.addInteraction({
            state: `a route option exist with id ${routeOptionId} and has airspaces`,
            uponReceiving: `request to fetch airspaces for route option with id ${routeOptionId}`,
            withRequest: getAirspacesRequest(routeOptionId),
            willRespondWith: getAirspacesResponse,
        });

        const { result, waitFor } = renderReactQueryHook(
            () => useGetAirspaces(routeOptionId),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        await waitFor(() => result.current.isSuccess);
    });
});
