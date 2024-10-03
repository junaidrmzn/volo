import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { act } from "@voloiq/testing";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { anyRouteOption, anyRouteOptionUpdate } from "../anyRouteOption";
import { useEditRouteOption } from "../useEditRouteOption";

const editRouteOptionRequest = (routeOptionId: number): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/route-options/${routeOptionId}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: Matchers.like(anyRouteOptionUpdate()),
});

const editRouteOptionResponse: ResponseOptions = {
    status: 200,
    body: {
        pagination: { page: null, size: null, totalPages: null, totalElements: null },
        error: null,
        data: Matchers.like(pactify(anyRouteOption)()),
    },
};

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will edit route option", async () => {
        const routeOptionId = 1;
        const arrivalVertiport = 1;
        const departureVertiport = 2;

        await provider.addInteraction({
            state: `route option with id ${routeOptionId} exists which has arrivalVertiport ${arrivalVertiport} and departureVertiport ${departureVertiport}`,
            uponReceiving: "request to edit route option",
            withRequest: editRouteOptionRequest(routeOptionId),
            willRespondWith: editRouteOptionResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useEditRouteOption({ routeOptionId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.sendRequest({
                data: anyRouteOptionUpdate(),
            });
        });

        await waitForNextUpdate();
    });
});
