import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { anyLocation } from "./anyLocation";
import { useGetAllLocations } from "./useGetAllLocations";

const { uuid, string, decimal, iso8601DateTimeWithMillis, eachLike } = Matchers;

pactWith({ consumer: "voloiq-ui", provider: "voloiq-logbook-api" }, (provider) => {
    describe("The Location API is called and", () => {
        it(" returns a list of locations", async () => {
            const date = "2022-04-19T13:45:51.209700+00:00";

            await provider.addInteraction({
                state: "there are location",
                uponReceiving: "a request to locations",
                withRequest: {
                    path: "/locations",
                    method: "GET",
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        data: eachLike({
                            id: uuid("d2913ca2-b915-4877-8865-460a8c855533"),
                            icaoCode: string("EDNX"),
                            latitude: decimal(48.239_167),
                            longitude: decimal(11.559_444),
                            createTime: iso8601DateTimeWithMillis(date),
                            updateTime: iso8601DateTimeWithMillis(date),
                        }),
                    },
                },
            });

            const { result, waitFor } = renderHook(() => useGetAllLocations(), {
                wrapper: (props) => {
                    const { children } = props;
                    return (
                        <I18nProvider>
                            <LocalAuthenticationProvider>
                                <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                            </LocalAuthenticationProvider>
                        </I18nProvider>
                    );
                },
            });

            await waitFor(() => {
                expect(result.current.locations.length).toBeGreaterThan(0);
            });

            expect(result.current.locations[0]).toEqual(
                anyLocation({
                    updateTime: date,
                    createTime: date,
                    id: "d2913ca2-b915-4877-8865-460a8c855533",
                    icaoCode: "EDNX",
                    latitude: 48.239_167,
                    longitude: 11.559_444,
                })
            );
        });
    });
});
