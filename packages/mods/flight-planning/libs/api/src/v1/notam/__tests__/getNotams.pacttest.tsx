import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderReactQueryHook } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useGetNotamsByLatLng } from "../getNotams";
import { anyPactNotams } from "./anyNotams";

const { like } = Matchers;

const getNotamsRequest = (routeOptionId: number, latitude: number, longitude: number): RequestOptions => ({
    method: "POST",
    path: `${FLIGHT_PLANNING_V1}/route-options/${routeOptionId}/notams`,
    headers: { "Content-Type": "application/json" },
    query: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
    },
});
const getNotamsResponse: ResponseOptions = {
    status: 201,
    body: {
        pagination: { page: null, size: null, totalPages: null, totalElements: null },
        error: null,
        data: like(anyPactNotams()),
    },
};

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch notams", async () => {
        const routeOptionId = 1;
        const latitude = 10;
        const longitude = 20;

        await provider.addInteraction({
            state: `route option exists with id ${routeOptionId} which has notams against latitude ${latitude} and longitude ${longitude}`,
            uponReceiving: "request to fetch notams",
            withRequest: getNotamsRequest(routeOptionId, latitude, longitude),
            willRespondWith: getNotamsResponse,
        });

        const { result, waitFor } = renderReactQueryHook(
            () => useGetNotamsByLatLng(routeOptionId, latitude, longitude),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        await waitFor(() => result.current.isSuccess);
    });
});
