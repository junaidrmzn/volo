import { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useRemoveArcSegment } from "../removeArcSegment";

const removeArcSegmentRequest = (routeId: number, waypointId: number): RequestOptions => ({
    method: "DELETE",
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/waypoints/${waypointId}/segment`,
});

const removeArcSegmentResponse: ResponseOptions = {
    status: 204,
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("removes an existing arc segment on a waypoint", async () => {
        const routeId = 1;
        const waypointId = 1;

        await provider.addInteraction({
            state: `route with id ${routeId} exists which and its waypoint with id ${waypointId} that contains an arc segment ready for deletion`,
            uponReceiving: `request to delete an existing arc segment on route with id ${routeId} and its waypoint with id ${waypointId}`,
            withRequest: removeArcSegmentRequest(routeId, waypointId),
            willRespondWith: removeArcSegmentResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useRemoveArcSegment({ routeId, waypointId }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.removeArcSegment();
        });

        await waitForNextUpdate();
    });
});
