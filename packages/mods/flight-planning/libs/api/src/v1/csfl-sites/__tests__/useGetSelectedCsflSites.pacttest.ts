import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { anySelectedCsflSite } from "../anySelectedCsflSite";
import { useGetSelectedCsflSites } from "../useGetSelectedCsflSites";

const { eachLike, like } = Matchers;

const getSelectedCsflSitesRequest = (routeId: number): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/selected-csfl-sites`,
    method: "GET",
});

const getSelectedCsflSitesResponse: ResponseOptions = {
    status: 200,
    body: {
        pagination: {
            page: like(1),
            size: like(10),
            totalPages: like(1),
            totalElements: like(10),
        },
        error: null,
        data: eachLike(pactify(anySelectedCsflSite)()),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    const routeId = 1;

    it("will fetch route's selected CSFL sites", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} exists and has CSFL sites associated with that route`,
            uponReceiving: "request to fetch route's selected CSFL sites",
            withRequest: getSelectedCsflSitesRequest(routeId),
            willRespondWith: getSelectedCsflSitesResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetSelectedCsflSites({ routeId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.sendRequest();
        });

        await waitForNextUpdate();
    });
});
