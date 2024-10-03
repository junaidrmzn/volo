import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { act } from "react-dom/test-utils";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import type { AxiosError } from "@voloiq/service";
import { ServiceProvider } from "@voloiq/service";
import { renderHook } from "@voloiq/testing";
import { anyLocation } from "./anyLocation";
import type { LocationInsert } from "./apiModels";
import { useAddLocation } from "./useAddLocation";

const { uuid, string, decimal, iso8601DateTimeWithMillis, integer } = Matchers;

pactWith({ consumer: "voloiq-ui", provider: "voloiq-logbook-api" }, (provider) => {
    describe("The Location API is called and", () => {
        it(" returns a aircraft after creating it", async () => {
            const date = "2022-04-19T13:45:51.209700+00:00";

            const postPayload: LocationInsert = {
                icaoCode: "EDNX",
                latitude: 48.239_167,
                longitude: 11.559_444,
            };

            await provider.addInteraction({
                state: "there are location",
                uponReceiving: "a request to create a location",
                withRequest: {
                    path: "/locations",
                    method: "POST",
                    body: { icaoCode: string("EDNX"), latitude: decimal(48.239_167), longitude: decimal(11.559_444) },
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json, text/plain, */*",
                    },
                },
                willRespondWith: {
                    status: 201,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        data: {
                            id: uuid("d2913ca2-b915-4877-8865-460a8c855533"),
                            icaoCode: string("EDNX"),
                            latitude: decimal(48.239_167),
                            longitude: decimal(11.559_444),
                            createTime: iso8601DateTimeWithMillis(date),
                            updateTime: iso8601DateTimeWithMillis(date),
                        },
                    },
                },
            });

            const { result } = renderHook(() => useAddLocation(), {
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

            await act(async () => {
                await result.current.addLocation({
                    data: postPayload,
                });
            });

            expect(result.current.location).toEqual(
                anyLocation({
                    updateTime: date,
                    createTime: date,
                    id: "d2913ca2-b915-4877-8865-460a8c855533",
                    icaoCode: "EDNX",
                    latitude: 48.239_167,
                    longitude: 11.559_444,
                })
            );

            expect(result.current.statusCode).toEqual(201);
        });

        it(" returns a error if wrong values are submitted", async () => {
            const badPostPayload: LocationInsert = {
                icaoCode: "EDNX",
                latitude: 0,
                longitude: 11.559_444,
            };

            await provider.addInteraction({
                state: "there are location",
                uponReceiving: "a request that returns an client error",
                withRequest: {
                    path: "/locations",
                    method: "POST",
                },
                willRespondWith: {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        error: {
                            id: uuid(),
                            timestamp: iso8601DateTimeWithMillis(),
                            code: integer(400),
                            message: string("Bad Request."),
                            status: string("INVALID_ARGUMENT"),
                        },
                    },
                },
            });

            const { result } = renderHook(() => useAddLocation(), {
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

            let responseStatus = 200;
            await act(async () => {
                await result.current
                    .addLocation({
                        data: badPostPayload,
                    })
                    .catch((error: AxiosError) => {
                        if (error.response) {
                            responseStatus = error.response.status;
                        }
                    });
            });

            expect(result.current.statusCode).toEqual(400);
            expect(responseStatus).toEqual(400);
        });
    });
});
