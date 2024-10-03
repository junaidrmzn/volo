import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { act } from "@voloiq/testing";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../../constants";
import { pactify } from "../../../../pactify";
import { renderServiceHook } from "../../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../../serviceEndpoints";
import { useGetFullEnvelopeValidation } from "../useGetFullEnvelopeValidation";
import { anyFullEnvelopeValidation } from "./anyFullEnvelopeValidation";

const getFullEnvelopeValidationRequest = (routeId: number): RequestOptions => ({
    path: `/v1/flight-planning/routes/${routeId}/full-envelope-validation`,
    method: "GET",
});

const getFullEnvelopeValidationResponse: ResponseOptions = {
    status: 200,
    body: {
        pagination: {
            page: null,
            size: null,
            totalPages: null,
            totalElements: null,
        },
        error: null,
        data: Matchers.like(pactify(anyFullEnvelopeValidation)()),
    },
};

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch route's full envelope validation result", async () => {
        const routeId = 1;

        await provider.addInteraction({
            state: `route with id ${routeId} exists and has full envelope validation result`,
            uponReceiving: "request to fetch route's full envelope validation result",
            withRequest: getFullEnvelopeValidationRequest(routeId),
            willRespondWith: getFullEnvelopeValidationResponse,
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetFullEnvelopeValidation({ routeId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData();
        });

        await waitForNextUpdate();
    });
});
