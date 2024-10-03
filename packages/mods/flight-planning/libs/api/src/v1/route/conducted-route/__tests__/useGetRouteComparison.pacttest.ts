import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../../constants";
import { pactify } from "../../../../pactify";
import { renderServiceHook } from "../../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../../serviceEndpoints";
import { useGetRouteComparison } from "../useGetRouteComparison";
import { anyRouteComparison } from "./anyRouteComparison";

const { like } = Matchers;
const routeComparisonRequest = (routeId: number): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/conducted-route`,
    method: "GET",
});

const routeComparisonResponse: ResponseOptions = {
    status: 200,
    body: {
        data: like(pactify(anyRouteComparison)()),
    },
};

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    const routeId = 1;

    it("will fetch conducted route and deviation from planned route", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} and SIMULATOR file exists associated with that route`,
            uponReceiving: "request to fetch conducted route and deviation from planned route",
            withRequest: routeComparisonRequest(routeId),
            willRespondWith: routeComparisonResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetRouteComparison({ routeId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
