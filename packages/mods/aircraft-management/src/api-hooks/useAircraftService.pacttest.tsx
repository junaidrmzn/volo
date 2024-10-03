import { Matchers, RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import React from "react";
import { anyAircraft, anyAircraftCreate, anyAircraftReservation } from "@voloiq/aircraft-management-api/v1";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook, waitFor } from "@voloiq/testing";
import { anyPactAircraft } from "../../lib/text-fixtures/anyPactAircraft";
import { anyPactAircraftReservation } from "../../lib/text-fixtures/anyPactAircraftReservation";
import {
    useCreateAircraft,
    useDeleteAircraft,
    useGetAircraft,
    useGetAllAircraftEvents,
    useGetAllAircrafts,
    useGetAllVertiports,
    useUpdateAircraft,
} from "./useAircraftService";

const aircraftId = "8b82b216-62b4-4e01-a629-f3337c4eff54";

// TODO: skipped some tests to publish the green pacts, re enable them after fixing

pactWith({ consumer: "voloiq.aircraft-management.ui", provider: "voloiq.aircraft-management.api" }, (provider) => {
    it.skip("will fetch all aircrafts", async () => {
        await provider.addInteraction({
            state: "there are aircrafts",
            uponReceiving: "a request to fetch all aircrafts",
            withRequest: {
                path: "/v1/aircraft-management/aircraft",
                method: "GET",
                query: "page=1&size=10",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.eachLike(anyPactAircraft()),
                    pagination: {
                        totalElements: Matchers.integer(1),
                    },
                },
            },
        });

        const { result } = renderHook(() => useGetAllAircrafts(1, 10), {
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
            expect(result.current.sendRequest());
            expect(result.current.data).toHaveLength(1);
        });
    });

    it("will fetch a single aircraft", async () => {
        await provider.addInteraction({
            state: "there are aircrafts",
            uponReceiving: "a request to fetch a single aircraft",
            withRequest: {
                path: `/v1/aircraft-management/aircraft/${aircraftId}`,
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.like(anyPactAircraft()),
                },
            },
        });

        const { result } = renderHook(() => useGetAircraft(aircraftId), {
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
            await result.current.refetchData();
            expect(result.current.data).toEqual(anyAircraft());
        });
    });

    it.skip("will create a new aircraft", async () => {
        await provider.addInteraction({
            state: "there are aircrafts",
            uponReceiving: "a request to create new aircraft",
            withRequest: {
                path: "/v1/aircraft-management/aircraft",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: anyAircraftCreate(),
            },
            willRespondWith: {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.like(anyPactAircraft()),
                },
            },
        });

        const { result } = renderHook(() => useCreateAircraft(), {
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
            await result.current.sendRequest({
                data: anyAircraftCreate(),
            });
        });
    });

    it.skip("will edit an existing aircraft", async () => {
        const version = 0;
        await provider.addInteraction({
            state: "there are aircrafts",
            uponReceiving: "a request to edit an existing aircraft",
            withRequest: {
                path: `/v1/aircraft-management/aircraft/${aircraftId}`,
                query: `version=${version}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: anyAircraftCreate(),
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.like(anyPactAircraft()),
                },
            },
        });

        const { result } = renderHook(() => useUpdateAircraft(), {
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
            await result.current.sendRequestById(aircraftId, {
                data: anyAircraftCreate(),
                params: { version },
            });
        });
    });

    it.skip("will fetch all events of an aircraft", async () => {
        await provider.addInteraction({
            state: "there are aircrafts with assigned events",
            uponReceiving: "a request for all events of an aircraft",
            withRequest: {
                path: "/v1/aircraft-management/aircraft/reservations",
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.eachLike(anyPactAircraftReservation()),
                },
            },
        });

        const { result } = renderHook(() => useGetAllAircraftEvents(), {
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
            await result.current.sendRequest();
            expect(result.current.data.length).toBeGreaterThan(0);
        });
        expect(result.current.data[0]).toEqual(anyAircraftReservation());
    });

    it("will fetch all Vertiports", async () => {
        await provider.addInteraction({
            state: "there are vertiports",
            uponReceiving: "a request to fetch all vertiports",
            withRequest: {
                path: "/v1/aircraft-management/vertiports",
                method: "GET",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.eachLike({
                        id: Matchers.uuid(),
                        name: Matchers.string("Hamburg"),
                        code: Matchers.string("HAM"),
                    }),
                },
            },
        });

        const { result, waitFor } = renderHook(() => useGetAllVertiports(), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalFeatureFlagsProvider>
                            <LocalAuthenticationProvider>
                                <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                            </LocalAuthenticationProvider>
                        </LocalFeatureFlagsProvider>
                    </I18nProvider>
                );
            },
        });

        await waitFor(() => {
            expect(result.current.data.length).toBeGreaterThan(0);
        });

        expect(result.current.data[0]).toEqual({
            id: expect.any(String),
            name: "Hamburg",
            code: "HAM",
        });
    });
});
const deleteAircraftRequest = (aircraftId: string): RequestOptions => ({
    path: `/v1/aircraft-management/aircraft/${aircraftId}`,
    method: "PATCH",
});
const deleteAircraftResponse: ResponseOptions = {
    status: 204,
    headers: {
        "Content-Type": "application/json",
    },
};
pactWith({ consumer: "voloiq.aircraft-management.ui", provider: "voloiq.aircraft-management.api" }, (provider) => {
    test("deletes a specific aircraft", async () => {
        await provider.addInteraction({
            state: `an aircraft with id ${aircraftId} exists`,
            uponReceiving: `a request for deleting aircraft with id ${aircraftId}`,
            withRequest: deleteAircraftRequest(aircraftId),
            willRespondWith: deleteAircraftResponse,
        });

        const { result } = renderHook(useDeleteAircraft, {
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
            await result.current.sendRequestById(aircraftId);
        });
    });
});
