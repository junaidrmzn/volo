import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { anySelectedCsflSite } from "../anySelectedCsflSite";
import { useSaveCsflSites } from "../useSaveCsflSites";

const { eachLike, like } = Matchers;

const saveCsflSitesRequest = (routeId: number): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/selected-csfl-sites`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
        ids: eachLike(1),
    },
});

const saveCsflSitesResponse: ResponseOptions = {
    status: 200,
    body: {
        pagination: like({
            page: 1,
            size: 10,
            totalPages: 1,
            totalElements: 10,
        }),
        error: null,
        data: like(pactify(anySelectedCsflSite)()),
    },
};

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    const routeId = 1;

    it("will save route's selected CSFL sites", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} exists and has CSFL sites that can be selected for that route`,
            uponReceiving: "request to save route's selected CSFL sites",
            withRequest: saveCsflSitesRequest(routeId),
            willRespondWith: saveCsflSitesResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useSaveCsflSites({ routeId }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.sendRequest({ data: { ids: [1] } });
        });

        await waitForNextUpdate();
    });
});
