import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderReactQueryHook } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useGetVertiports } from "../getVertiports";

const { eachLike } = Matchers;

const getVertiportsRequest: RequestOptions = {
    method: "GET",
    path: `${FLIGHT_PLANNING_V1}/vertiports`,
};
const getVertiportsResponse: ResponseOptions = {
    status: 200,
    body: {
        data: eachLike({
            name: "bruchsal",
            lat: 49.139_294_903_096_186,
            lng: 8.585_145_698_059_245,
            alt: 1.2,
        }),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    it("will fetch all vertiports", async () => {
        await provider.addInteraction({
            state: "there exists vertiports",
            uponReceiving: "request to fetch vertiports",
            withRequest: getVertiportsRequest,
            willRespondWith: getVertiportsResponse,
        });

        const { result, waitFor } = renderReactQueryHook(
            useGetVertiports,
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        await waitFor(() => result.current.isSuccess);
    });
});
