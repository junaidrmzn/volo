import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../../constants";
import { renderServiceHook } from "../../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../../serviceEndpoints";
import { useGetConductedRouteFileStatus } from "../useGetConductedRouteFileStatus";

const conductedRouteFileStatusRequest = (routeId: number): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/conducted-route/file/status`,
    method: "GET",
});

const conductedRouteFileStatusResponse: ResponseOptions = {
    status: 200,
    body: {
        data: { uploaded: Matchers.boolean() },
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    const routeId = 1;

    it("will check conducted route file is uploaded or not", async () => {
        await provider.addInteraction({
            state: `A route option that has a route with id ${routeId} which has a status of uploaded file`,
            uponReceiving: "a request for checking conducted route file status",
            withRequest: conductedRouteFileStatusRequest(routeId),
            willRespondWith: conductedRouteFileStatusResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetConductedRouteFileStatus({ routeId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
