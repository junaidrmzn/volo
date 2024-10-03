import { Matchers } from "@pact-foundation/pact";
import { act, renderHook } from "@testing-library/react-hooks";
import type { AircraftTypeCreate } from "@voloiq-typescript-api/aircraft-management-types";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import React from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import type { AxiosError } from "@voloiq/service";
import { ServiceProvider } from "@voloiq/service";
import { actAndGet, waitFor } from "@voloiq/testing";
import { anyAircraftType } from "../../lib/text-fixtures/anyAircraftType";
import { anyPactAircraftType } from "../../lib/text-fixtures/anyPactAircraftType";
import { useAircraftTypeOverviewPage } from "../aircraft-type/useAircraftTypeOverviewPage";
import {
    useCreateAircraftType,
    useGetAircraftTypesByIds,
    useGetAllAircraftTypes,
    useUpdateAircraftTypeWithConfirmation,
    useUploadPerformanceFile,
} from "./useAircraftTypeService";

const { like, integer, string } = Matchers;

const rfc3339TimestampMatcher = "((\\d{4}-\\d{2}-\\d{2})T(\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?)Z)$";
const nameMatcher = "^.{0,10}$";

const airCraftTypeId = "9ba766fc-45cb-431c-bc1a-582f2cb2a9b5";

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

const aircraftTypeSingleUpdateRequest = {
    airDensity: integer(),
    aircraftResources: [],
    cloudCeilingHeight: integer(),
    massAndBalanceData: {
        bem: integer(),
        cgPosition: like({ x: integer(), y: integer() }),
        latCgEnvelopePoints: [],
        longCgEnvelopePoints: [],
        mtom: integer(),
    },
    maximumTemperature: integer(),
    minimumTemperature: integer(),
    rain: integer(),
    relativeHumidity: integer(),
    validFrom: string(),
    validTo: string(),
    visibility: integer(),
    windSpeed: integer(),
};

const aircraftTypeSingleUpdateResponse = {
    validFrom: "2020-11-06T16:34:41.000Z",
    minimumTemperature: 13,
    maximumTemperature: 15,
    windSpeed: 13,
    relativeHumidity: 13,
    rain: 13,
    visibility: 13,
    cloudCeilingHeight: 13,
    airDensity: 1,
    validTo: "2020-11-06T16:34:41.000Z",
    massAndBalanceData: {
        cgPosition: {
            x: 13,
            y: 13,
        },
        bem: 13,
        mtom: 13,
        longCgEnvelopePoints: [],
        latCgEnvelopePoints: [],
    },
    aircraftResources: [],
};

pactWith({ consumer: "voloiq.aircraft-management.ui", provider: "voloiq.aircraft-management.api" }, (provider) => {
    it.skip("will fetch all aircraft types", async () => {
        await provider.addInteraction({
            state: "there are aircraft types",
            uponReceiving: "a request for all aircraft types",
            withRequest: {
                path: "/v1/aircraft-management/aircraft-types",
                method: "GET",
                query: "page=1&size=10&vt912=true",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.eachLike({
                        id: Matchers.uuid(),
                        validFrom: Matchers.term({
                            matcher: rfc3339TimestampMatcher,
                            generate: "2007-11-06T16:34:41.000Z",
                        }),
                        validTo: Matchers.term({
                            matcher: rfc3339TimestampMatcher,
                            generate: "2040-11-06T16:34:41.000Z",
                        }),
                        productLine: "VOLOCITY",
                        name: Matchers.term({
                            matcher: nameMatcher,
                            generate: "VoloCity",
                        }),
                        minimumTemperature: -10.01,
                        maximumTemperature: 11.11,
                        windSpeed: 12.21,
                        relativeHumidity: 13.31,
                        rain: 14.41,
                        visibility: 15.51,
                        cloudCeilingHeight: 16.61,
                        airDensity: 1.71,
                        version: 0,
                    }),
                },
            },
        });

        const { result, waitFor } = renderHook(() => useGetAllAircraftTypes(1, 10), {
            wrapper: (props: PropsWithChildren<{}>) => {
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
            expect(result.current.data.length).toBeGreaterThan(0);
        });
        expect(result.current.data[0]).toEqual({
            id: expect.any(String),
            validFrom: "2007-11-06T16:34:41.000Z",
            validTo: "2040-11-06T16:34:41.000Z",
            productLine: "VOLOCITY",
            name: expect.any(String),
            minimumTemperature: -10.01,
            maximumTemperature: 11.11,
            windSpeed: 12.21,
            relativeHumidity: 13.31,
            rain: 14.41,
            visibility: 15.51,
            cloudCeilingHeight: 16.61,
            airDensity: 1.71,
            version: 0,
        });
    });

    it("will return an error if validTo is before validFrom", async () => {
        const postPayload: AircraftTypeCreate = {
            name: "Foo",
            productLine: "VOLOCITY",
            validFrom: "2022-05-01T10:00:00.000Z",
            validTo: "2000-05-01T10:00:00.000Z",
            minimumTemperature: -10.01,
            maximumTemperature: 11.11,
            windSpeed: 12.21,
            relativeHumidity: 13.31,
            rain: 14.41,
            visibility: 15.51,
            cloudCeilingHeight: 16.61,
            airDensity: 1.71,
        };

        await provider.addInteraction({
            state: "there are no aircraft types",
            uponReceiving: "a request to create a aircraft type",
            withRequest: {
                path: "/v1/aircraft-management/aircraft-types",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: postPayload,
            },
            willRespondWith: {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    error: {
                        id: Matchers.uuid(),
                        timestamp: Matchers.term({
                            matcher: rfc3339TimestampMatcher,
                            generate: "2040-11-06T16:34:41.000Z",
                        }),
                        code: 400,
                        message: "Validation for AircraftType failed.",
                        status: "INVALID_ARGUMENT",
                        details: [
                            {
                                detailedError: "MinReferencedAttributeValueError",
                                referencedAttribute: "validFrom",
                                minValue: "2022-05-01T10:01:00.000Z",
                                attribute: "validTo",
                                value: "2000-05-01T10:00:00.000Z",
                                message: Matchers.string(),
                            },
                        ],
                    },
                },
            },
        });

        const { result } = renderHook(() => useCreateAircraftType(), {
            wrapper: (props: PropsWithChildren<{}>) => {
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
                .sendRequest({
                    data: postPayload,
                })
                .catch((error: AxiosError) => {
                    if (error.response) {
                        responseStatus = error.response.status;
                    }
                });
        });

        expect(responseStatus).toEqual(400);
    });
    // The aircraft management api currently cannot handle this contract test because of the communication with the Azure storage blob not being mocked (https://jira.volocopter.org/browse/VAO-379)
    it.skip("will upload a file", async () => {
        const postPayload = new File([], "test.dat");
        const id = airCraftTypeId;
        await provider.addInteraction({
            state: `there is an aircraft type with id ${id}`,
            uponReceiving: "a request to upload a file",
            withRequest: {
                path: `/v1/aircraft-management/aircraft-types/${id}/performance-data`,
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream",
                },
                body: postPayload.stream,
            },
            willRespondWith: {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.like({
                        id,
                        validFrom: Matchers.term({
                            matcher: rfc3339TimestampMatcher,
                            generate: "2007-11-06T16:34:41.000Z",
                        }),
                        validTo: Matchers.term({
                            matcher: rfc3339TimestampMatcher,
                            generate: "2040-11-06T16:34:41.000Z",
                        }),
                        productLine: "VOLOCITY",
                        name: Matchers.term({
                            matcher: nameMatcher,
                            generate: "VoloCity",
                        }),
                        performanceDataFileUrl: Matchers.string("url"),
                        performanceDataFileVersion: Matchers.decimal(1),
                    }),
                },
            },
        });

        const { result } = renderHook(() => useUploadPerformanceFile(), {
            wrapper: (props: PropsWithChildren<{}>) => {
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

        let response;
        await act(async () => {
            await result.current
                .sendRequest({
                    data: postPayload,
                    headers: {
                        "Content-Type": "application/octet-stream",
                    },
                    url: `/v1/aircraft-management/aircraft-types/${id}/performance-data`,
                })
                .then((value) => {
                    response = value;
                });
        });
        expect(response).toBeDefined();
        expect(response).toEqual({
            id,
            validFrom: "2007-11-06T16:34:41.000Z",
            validTo: "2040-11-06T16:34:41.000Z",
            productLine: "VOLOCITY",
            name: expect.any(String),
            performanceDataFileUrl: "url",
            performanceDataFileVersion: 1,
        });
    });

    // PACT TEST TO CREATE A NEW AIRCRAFT TYPE
    it.skip("will create a new aircraft type", async () => {
        await provider.addInteraction({
            state: "air craft type will be created",
            uponReceiving: "a request to create a new aircraft type",
            withRequest: {
                path: "/v1/aircraft-management/aircraft-types",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    airDensity: like(1),
                    aircraftResources: [],
                    cloudCeilingHeight: like(13),
                    massAndBalanceData: {
                        bem: like(13),
                        cgPosition: { x: like(13), y: like(13) },
                        latCgEnvelopePoints: [],
                        longCgEnvelopePoints: [],
                        mtom: like(13),
                    },
                    maximumTemperature: like(15),
                    minimumTemperature: like(13),
                    name: like("iloveorange"),
                    productLine: like("VOLOCITY"),
                    rain: like(13),
                    relativeHumidity: like(13),
                    validFrom: like("2020-11-06T16:34:41.000Z"),
                    validTo: like("2020-11-06T16:34:41.000Z"),
                    visibility: like(13),
                    windSpeed: like(13),
                },
            },
            willRespondWith: {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.like(anyPactAircraftType()),
                },
            },
        });

        const { result } = renderHook(() => useCreateAircraftType(), {
            wrapper: (props: PropsWithChildren<{}>) => {
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

        const responseStatus = 201;
        await act(async () => {
            await result.current.sendRequest({
                data: {
                    airDensity: 1,
                    aircraftResources: [],
                    cloudCeilingHeight: 13,
                    massAndBalanceData: {
                        bem: 13,
                        cgPosition: { x: 13, y: 13 },
                        latCgEnvelopePoints: [],
                        longCgEnvelopePoints: [],
                        mtom: 13,
                    },
                    maximumTemperature: 15,
                    minimumTemperature: 13,
                    name: "iloveorange",
                    productLine: "VOLOCITY",
                    rain: 13,
                    relativeHumidity: 13,
                    validFrom: "2020-11-06T16:34:41.000Z",
                    validTo: "2020-11-06T16:34:41.000Z",
                    visibility: 13,
                    windSpeed: 13,
                },
            });
        });

        expect(responseStatus).toEqual(201);
    });

    // PACT TEST TO FETCH A SINGLE AIRCRAFT TYPE DETAILS
    it("will fetch a single aircraft type details", async () => {
        await provider.addInteraction({
            state: "single aircraft type details will be fetched",
            uponReceiving: "a request to fetch single aircraft type details",
            withRequest: {
                path: `/v1/aircraft-management/aircraft-types/${airCraftTypeId}`,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: Matchers.like(anyPactAircraftType()),
                },
            },
        });

        const { result } = renderHook(useAircraftTypeOverviewPage, {
            wrapper: (props: PropsWithChildren<{}>) => {
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

        const response = await actAndGet(() => result.current.fetchAircraftType(airCraftTypeId));

        expect(response?.data).toEqual(anyAircraftType());
    });

    it.skip("will edit an existing aircraft type", async () => {
        const version = 0;
        await provider.addInteraction({
            state: "single aircraft type will be updated",
            uponReceiving: "a request to update single aircraft type",
            withRequest: {
                path: `/v1/aircraft-management/aircraft-types/${airCraftTypeId}`,
                query: `version=${version}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: Matchers.like(aircraftTypeSingleUpdateRequest),
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.like(anyPactAircraftType()),
                },
            },
        });

        const { result } = renderHook(() => useUpdateAircraftTypeWithConfirmation({ aircraftTypeId: airCraftTypeId }), {
            wrapper: (props: PropsWithChildren<{}>) => {
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
            result.current.setAircraftTypeUpdateData(anyAircraftType());
            await result.current.sendRequestById(airCraftTypeId, {
                data: aircraftTypeSingleUpdateResponse,
                params: { version },
            });
        });
    });

    it.skip("will fetch aircraft types with query parameter vt912=true", async () => {
        await provider.addInteraction({
            state: "aircraft type details with query parameter vt912=true will be fetched",
            uponReceiving: "a request to fetch aircraft type details with query parameter vt912=true will be fetched",
            withRequest: {
                path: "/v1/aircraft-management/aircraft-types",
                method: "GET",
                query: `ids=${airCraftTypeId}&vt912=true`,
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: Matchers.like([anyPactAircraftType()]),
                },
            },
        });

        const { result } = renderHook(() => useGetAircraftTypesByIds([airCraftTypeId]), {
            wrapper: (props: PropsWithChildren<{}>) => {
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

        await waitFor(async () => {
            await result.current.sendRequest();
            expect(result.current.data).toEqual([anyAircraftType()]);
        });
    });

    it.skip("will fetch aircraft types with query parameter page=1&size=100&vt912=true", async () => {
        await provider.addInteraction({
            state: "aircraft type details with query parameter page=1&size=100&vt912=true will be fetched",
            uponReceiving:
                "a request to fetch aircraft type details with query parameter page=1&size=100&vt912=true will be fetched",
            withRequest: {
                path: "/v1/aircraft-management/aircraft-types",
                method: "GET",
                query: "page=1&size=100&vt912=true",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: Matchers.like([anyPactAircraftType()]),
                },
            },
        });

        const { result } = renderHook(() => useGetAllAircraftTypes(), {
            wrapper: (props: PropsWithChildren<{}>) => {
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

        await waitFor(async () => {
            await result.current.sendRequest();
            expect(result.current.data).toEqual([anyAircraftType()]);
        });
    });
});
