import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { act } from "@voloiq/testing";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../../constants";
import { pactify } from "../../../../pactify";
import { renderServiceHook } from "../../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../../serviceEndpoints";
import { useGetFullEnergy } from "../useGetFullEnergy";
import { anyRouteFullEnergy } from "./anyRouteFullEnergy";

const getFullEnergyRequest = (routeId: number): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/energy`,
    method: "GET",
});

const getFullEnergyWithWindScenarioRequest = (
    routeId: number,
    windSpeed: number,
    windDirection: number
): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/energy`,
    method: "GET",
    query: {
        windSpeed: windSpeed.toString(),
        windDirection: windDirection.toString(),
    },
});

const getFullEnergyResponse: ResponseOptions = {
    status: 200,
    body: {
        data: Matchers.like(pactify(anyRouteFullEnergy)()),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch full energy of route", async () => {
        const routeId = 1;

        await provider.addInteraction({
            state: `route with id ${routeId} exists and has full energy`,
            uponReceiving: "request to fetch route's full energy",
            withRequest: getFullEnergyRequest(routeId),
            willRespondWith: getFullEnergyResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetFullEnergy({ routeId }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });

    it("will fetch full energy of route for specific wind scenario", async () => {
        const routeId = 1;
        const windSpeed = 11;
        const windDirection = 90;

        await provider.addInteraction({
            state: `route with id ${routeId} exists and has full energy for windSpeed:${windSpeed} and windDirection:${windDirection}`,
            uponReceiving: "request to fetch route's full energy for specific wind scenario",
            withRequest: getFullEnergyWithWindScenarioRequest(routeId, windSpeed, windDirection),
            willRespondWith: getFullEnergyResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetFullEnergy({ routeId, windScenario: { windSpeed, windDirection } }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
