import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { renderReactQueryHook } from "../../../testing/renderReactQueryHook";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../constants";
import { FLIGHT_PLANNING } from "../../serviceEndpoints";
import { useGetRouteOptions } from "../getRouteOptions";

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    describe("Pact with Route Options API", () => {
        describe("given there are route options", () => {
            describe("when a call to the API is made", () => {
                it("will receive the list of route options", async () => {
                    await provider.addInteraction({
                        state: "there are route options",
                        uponReceiving: "a request for route options",
                        withRequest: {
                            path: "/v1/flight-planning/route-options",
                            method: "GET",
                        },
                        willRespondWith: {
                            status: 200,
                            body: {
                                data: Matchers.eachLike({
                                    name: Matchers.string(),
                                    aircraftType: Matchers.string(),
                                }),
                            },
                        },
                    });

                    const { result, waitFor } = renderReactQueryHook(
                        useGetRouteOptions,
                        `${provider.mockService.baseUrl}${FLIGHT_PLANNING}`
                    );

                    await waitFor(() => result.current.isSuccess, { timeout: 30_000 });

                    expect(result.current.data?.data?.length).toBeGreaterThan(0);

                    expect(result.current.data?.data?.at(0)).toEqual({
                        name: expect.any(String),
                        aircraftType: expect.any(String),
                    });
                }, 30_000);
            });
        });
    });
});
