import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useGetNotams } from "../useGetNotams";
import { anyPactNotams } from "./anyNotams";

const { like } = Matchers;

const getNotamsRequest = (routeOptionId: number, latitude: number, longitude: number): RequestOptions => ({
    method: "GET",
    path: `${FLIGHT_PLANNING_V1}/route-options/${routeOptionId}/notams-job`,
    query: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
    },
});

const getNotamsResponse: ResponseOptions = {
    status: 200,
    body: {
        pagination: { page: null, size: null, totalPages: null, totalElements: null },
        error: null,
        data: like(anyPactNotams()),
    },
};
// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch notams with job", async () => {
        const routeOptionId = 1;
        const latitude = 10;
        const longitude = 20;

        await provider.addInteraction({
            state: `route option exists with id ${routeOptionId} which has notams with job against latitude ${latitude} and longitude ${longitude}`,
            uponReceiving: "request to fetch notams with job",
            withRequest: getNotamsRequest(routeOptionId, latitude, longitude),
            willRespondWith: getNotamsResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetNotams({ routeOptionId, latitude, longitude, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
