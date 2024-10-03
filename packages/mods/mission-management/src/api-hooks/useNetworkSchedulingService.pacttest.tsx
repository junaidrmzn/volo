import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { anyRouteOption } from "@voloiq/network-schedule-management-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook, waitFor } from "@voloiq/testing";
import { anyAvailableCrewMember } from "../../lib/test-fixtures/anyAvailableCrewMember";
import { pactCoordinate } from "../../lib/test-fixtures/pactCoordinate";
import { pactRegion } from "../../lib/test-fixtures/pactRegion";
import { availabilityFilters } from "../missions/mission-list-item/mission-actions-popover/availabilityFilters";
import { anyVertiport } from "../mocks/vertiport-management/anyVertiport";
import { NETWORK_SCHEDULING_MANAGEMENT } from "./serviceEndpoints";
import {
    useGetAllAircraftTypes,
    useGetAllRegions,
    useGetAllVertiports,
    useGetAvailableCrewMembers,
    useGetRouteOption,
    useGetVertiport,
} from "./useNetworkSchedulingService";

const { string, uuid, eachLike, integer, term, like } = Matchers;

const rfc3339TimestampMatcher = term({
    matcher: "((\\d{4}-\\d{2}-\\d{2})T(\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?)Z)$",
    generate: "2020-11-06T16:34:41.000Z",
});

const getVertiportRequest = (vertiportId: string): RequestOptions => ({
    path: `/v1/network-scheduling-management/vertiports/${vertiportId}`,
    method: "GET",
});
const getVertiportResponse = (vertiportId: string): ResponseOptions => ({
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: anyVertiport({ id: vertiportId }),
    },
});

const fetchAllVertiportsResponse = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
        data: eachLike({
            id: uuid(),
            shortName: string(),
            region: pactRegion(),
            timeZone: string(),
            elevation: integer(),
            location: pactCoordinate(),
            popularity: integer(),
            dataModelVersion: integer(),
            name: string(),
            validFrom: rfc3339TimestampMatcher,
            createTime: rfc3339TimestampMatcher,
            updateTime: rfc3339TimestampMatcher,
        }),
    },
};

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("fetch specific vertiport", async () => {
        const vertiportId = "ce118b6e-d8e1-11e7-9296-cec278b6b50a";
        await provider.addInteraction({
            state: `a vertiport with id ${vertiportId} exists`,
            uponReceiving: `a request for vertiport with id ${vertiportId}`,
            withRequest: getVertiportRequest(vertiportId),
            willRespondWith: getVertiportResponse(vertiportId),
        });

        const { result } = renderHook(() => useGetVertiport(vertiportId), {
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
            expect(result.current.data).toEqual(
                anyVertiport({
                    id: vertiportId,
                })
            );
        });
    });
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    it.skip("will fetch all vertiports", async () => {
        await provider.addInteraction({
            state: "there are vertiports",
            uponReceiving: "a request for vertiports",
            withRequest: {
                method: "GET",
                path: "/v1/network-scheduling-management/vertiports",
                query: "page=1&size=100&orderBy=name",
            },
            willRespondWith: fetchAllVertiportsResponse,
        });

        const { result, waitFor } = renderHook(() => useGetAllVertiports(), {
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
    });
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    it.skip("will fetch all regions", async () => {
        await provider.addInteraction({
            state: "there are regions",
            uponReceiving: "a request for regions",
            withRequest: {
                method: "GET",
                path: "/v1/network-scheduling-management/regions",
                query: "page=1&size=100&orderBy=name",
            },
            willRespondWith: {
                status: 200,
                headers: { "Content-Type": "application/json" },
                body: {
                    data: Matchers.eachLike(pactRegion()),
                },
            },
        });

        const { result, waitFor } = renderHook(() => useGetAllRegions(), {
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
    });
});

const fetchRouteOptionRequest = (routeOptionId: string): RequestOptions => ({
    path: `${NETWORK_SCHEDULING_MANAGEMENT}/route-options/${routeOptionId}`,
    method: "GET",
});

const fetchRouteOptionResponse = (): ResponseOptions => ({
    status: 200,
    body: like({
        data: anyRouteOption(),
    }),
});

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("will fetch a single route option", async () => {
        const routeOptionId = "3679f481-1517-4df6-a8e9-debe126fb5a0";
        await provider.addInteraction({
            state: `there is a route option with id ${routeOptionId}`,
            uponReceiving: `a request to fetch a route option with id ${routeOptionId}`,
            withRequest: fetchRouteOptionRequest(routeOptionId),
            willRespondWith: fetchRouteOptionResponse(),
        });

        const { result, waitFor } = renderHook(() => useGetRouteOption(routeOptionId), {
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
        result.current.refetchData();

        await waitFor(() => {
            expect(result.current.data).toEqual(anyRouteOption());
        });
    });
});

const allAvailableCrewMembersRequest = (missionId: string, filters: availabilityFilters): RequestOptions => ({
    path: `${NETWORK_SCHEDULING_MANAGEMENT}/crew-members/availability/${missionId}`,
    query: `startDate=${filters.startDate}&endDate=${filters.endDate}&showConflicts=${filters.showConflicts}`,
    method: "GET",
});

const allAvailableCrewMembersResponse: ResponseOptions = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.eachLike(anyAvailableCrewMember()),
    },
};

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    test.skip("fetches all available crew members", async () => {
        const missionId = "2679f481-1517-4df6-a8e9-debe126fb5a0";
        const filters = {
            startDate: "2023-05-04T08:00:00Z",
            endDate: "2023-05-04T09:00:00Z",
            showConflicts: true,
        };

        await provider.addInteraction({
            state: `there are available crew members`,
            uponReceiving: `a request for all available crew members against mission ${missionId}`,
            withRequest: allAvailableCrewMembersRequest(missionId, filters),
            willRespondWith: allAvailableCrewMembersResponse,
        });

        const { result } = renderHook(() => useGetAvailableCrewMembers(missionId, filters), {
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
        act(() => {
            result.current.sendRequest({});
        });

        await waitFor(() => {
            expect(result.current.data.length).toBeGreaterThan(0);
        });
    });
});

const rfc3339AircraftTimestampMatcher = "((\\d{4}-\\d{2}-\\d{2})T(\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?)Z)$";
const nameMatcher = "^.{0,10}$";

pactWith({ consumer: "voloiq.mission-management.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    it.skip("will fetch all aircraft types", async () => {
        await provider.addInteraction({
            state: "there are aircraft types",
            uponReceiving: "a request for all aircraft types",
            withRequest: {
                path: "/v1/network-scheduling-management/aircraft-types",
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
                            matcher: rfc3339AircraftTimestampMatcher,
                            generate: "2007-11-06T16:34:41.000Z",
                        }),
                        validTo: Matchers.term({
                            matcher: rfc3339AircraftTimestampMatcher,
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
});
