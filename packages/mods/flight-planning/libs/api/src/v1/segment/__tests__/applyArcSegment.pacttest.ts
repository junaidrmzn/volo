import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useApplyArcSegment } from "../applyArcSegment";

const { like } = Matchers;

const applyArcSegmentRequest = (routeId: number, waypointId: number): RequestOptions => ({
    method: "POST",
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/waypoints/${waypointId}/segment`,
    headers: { "Content-Type": "application/json" },
    body: like({
        segmentData: {
            radius: 100.5,
            latitude: 50.5,
            longitude: 50.5,
            isInverted: false,
        },
        segmentType: "arc",
    }),
});

const applyArcSegmentResponse: ResponseOptions = {
    status: 201,
    body: like({
        pagination: { page: null, size: null, totalPages: null, totalElements: null },
        error: null,
        data: null,
    }),
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("creates a new arc segment to on a waypoint", async () => {
        const routeId = 1;
        const waypointId = 1;

        await provider.addInteraction({
            state: `route with id ${routeId} exists and its waypoint with id ${waypointId} does not contain an arc segment`,
            uponReceiving: `request to create a new arc segment on route with id ${routeId} and its waypoint with id ${waypointId}`,
            withRequest: applyArcSegmentRequest(routeId, waypointId),
            willRespondWith: applyArcSegmentResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useApplyArcSegment({ routeId, waypointId }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.applyArcSegment({
                data: {
                    segmentData: {
                        radius: 100.5,
                        latitude: 50.5,
                        longitude: 50.5,
                        isInverted: false,
                    },
                    segmentType: "arc",
                },
            });
        });

        await waitForNextUpdate();
    });
});
