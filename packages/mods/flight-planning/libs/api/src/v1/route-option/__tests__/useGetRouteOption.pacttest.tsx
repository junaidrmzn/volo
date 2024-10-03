import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { act } from "@voloiq/testing";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { anyRouteOption } from "../anyRouteOption";
import { useGetRouteOption } from "../useGetRouteOption";

const getRouteOptionRequest = (routeOptionId: number): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/route-options/${routeOptionId}`,
    method: "GET",
});

const getRouteOptionResponse: ResponseOptions = {
    status: 200,
    body: {
        pagination: { page: null, size: null, totalPages: null, totalElements: null },
        error: null,
        data: Matchers.like(pactify(anyRouteOption)()),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch single route option", async () => {
        const routeOptionId = 1;

        await provider.addInteraction({
            state: `route option with id ${routeOptionId} exists`,
            uponReceiving: "request to fetch single route option",
            withRequest: getRouteOptionRequest(routeOptionId),
            willRespondWith: getRouteOptionResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetRouteOption({ routeOptionId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
