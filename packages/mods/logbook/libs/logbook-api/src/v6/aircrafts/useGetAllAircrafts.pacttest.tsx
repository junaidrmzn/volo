import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { anyAircraft } from "./anyAircraft";
import { useGetAllAircrafts } from "./useGetAllAircrafts";

const { eachLike, iso8601DateTimeWithMillis, string, uuid } = Matchers;

pactWith({ consumer: "voloiq-ui", provider: "voloiq-logbook-api" }, (provider) => {
    describe("The Aircraft API is called and", () => {
        it(" returns a list of aircraft", async () => {
            const date = "2022-04-19T13:45:51.209700+00:00";
            await provider.addInteraction({
                state: "there are aircraft",
                uponReceiving: "a request to aircraft",
                withRequest: {
                    path: "/aircraft",
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
                            createTime: iso8601DateTimeWithMillis(date),
                            updateTime: iso8601DateTimeWithMillis(date),
                            aircraftType: string("VC1-2"),
                            msn: string("01"),
                            productLine: string("VoloDrone"),
                        }),
                    },
                },
            });

            const { result, waitFor } = renderHook(() => useGetAllAircrafts(), {
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
                expect(result.current.aircrafts.length).toBeGreaterThan(0);
            });

            expect(result.current.aircrafts[0]).toEqual(
                anyAircraft({
                    updateTime: date,
                    createTime: date,
                    id: "d2913ca2-b915-4877-8865-460a8c855533",
                    aircraftType: "VC1-2",
                    msn: "01",
                    productLine: "VoloDrone",
                })
            );
        });
    });
});
