import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { anyCorridorClearanceType } from "../anyObstacle";
import { useGetCorridorClearanceData } from "../useGetCorridorClearanceData";

const routeId = 1;
const getObstaclesRequest: RequestOptions = {
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/corridor-clearance`,
    method: "GET",
};

const getObstacleResponse: ResponseOptions = {
    status: 200,
    body: {
        data: Matchers.eachLike(pactify(anyCorridorClearanceType)()),
    },
};

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("fetch obstacles on route corridor", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} exists`,
            uponReceiving: "request to fetch route's obstacles",
            withRequest: getObstaclesRequest,
            willRespondWith: getObstacleResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetCorridorClearanceData(routeId),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
