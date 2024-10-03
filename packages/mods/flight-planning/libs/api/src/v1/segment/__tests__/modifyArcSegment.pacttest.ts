import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useModifyArcSegment } from "../modifyArcSegment";

const { like } = Matchers;

const modifyArcSegmentRequest = (routeId: number, waypointId: number): RequestOptions => ({
    method: "PUT",
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/waypoints/${waypointId}/segment`,
    headers: { "Content-Type": "application/json" },
    body: like({
        segmentData: {
            radius: 100.5,
            latitude: 50.5,
            longitude: 50.5,
        },
        segmentType: "arc",
    }),
});

const modifyArcSegmentResponse: ResponseOptions = {
    status: 200,
    body: like({
        pagination: { page: null, size: null, totalPages: null, totalElements: null },
        error: null,
        data: {
            id: 5,
            created_at: "2023-10-13T05:02:19.186857Z",
            radius: 100.5,
            latitude: 50.5,
            longitude: 50.5,
        },
    }),
};

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("modifies an existing arc segment on a waypoint", async () => {
        const routeId = 1;
        const waypointId = 1;

        await provider.addInteraction({
            state: `route with id ${routeId} exists and its waypoint with id ${waypointId} that contains an arc segment ready for modification`,
            uponReceiving: `request to modify an existing arc segment on route with id ${routeId} and its  waypoint with id ${waypointId}`,
            withRequest: modifyArcSegmentRequest(routeId, waypointId),
            willRespondWith: modifyArcSegmentResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useModifyArcSegment({ routeId, waypointId }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.modifyArcSegment({
                data: {
                    segmentData: {
                        radius: 100.5,
                        latitude: 50.5,
                        longitude: 50.5,
                    },
                    segmentType: "arc",
                },
            });
        });

        await waitForNextUpdate();
    });
});
