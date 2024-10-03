import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook, waitFor } from "@voloiq/testing";
import { anyEvent } from "../../lib/test-fixtures/anyEvent";
import { anyPactAircraft } from "../../lib/test-fixtures/anyPactAircraft";
import { anyPactEvent } from "../../lib/test-fixtures/anyPactEvent";
import {
    useCreateEvent,
    useDeleteEvent,
    useGetAllAircraftWithinValidity,
    useGetAllEvents,
    useGetEvent,
    useUpdateEvent,
} from "./useNetworkSchedulingService";

pactWith({ consumer: "voloiq.network-scheduling.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    it("will fetch all aircrafts", async () => {
        await provider.addInteraction({
            state: "there are aircrafts",
            uponReceiving: "a request to fetch all aircrafts",
            withRequest: {
                path: "/v1/network-scheduling-management/aircraft",
                method: "GET",
                query: "page=1&size=100&filter=",
            },
            willRespondWith: {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    data: Matchers.eachLike(anyPactAircraft()),
                    pagination: {
                        totalElements: 1,
                    },
                },
            },
        });

        const { result } = renderHook(() => useGetAllAircraftWithinValidity(), {
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
});

const eventId = "09b11eb3-323c-4a62-99ff-a797db1d35b1";

const addEventResponse = {
    status: 201,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactEvent()),
    },
};

const editEventResponse = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
    body: {
        data: Matchers.like(anyPactEvent()),
    },
};

pactWith({ consumer: "voloiq.network-scheduling.ui", provider: "voloiq.network-scheduling.api" }, (provider) => {
    it("will fetch all events", async () => {
        await provider.addInteraction({
            state: "there are events",
            uponReceiving: "a request for all events",
            withRequest: {
                method: "GET",
                path: "/v1/network-scheduling-management/events",
                query: "page=1&size=10",
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: Matchers.eachLike(anyPactEvent()),
                },
            },
        });

        const { result, waitFor } = renderHook(() => useGetAllEvents(1, 10), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>;
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        await waitFor(() => {
            expect(result.current.data.length).toBeGreaterThan(0);
        });
    });

    it("will fetch a single event", async () => {
        await provider.addInteraction({
            state: "there are events",
            uponReceiving: "a request for a single event",
            withRequest: {
                method: "GET",
                path: `/v1/network-scheduling-management/events/${eventId}`,
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: Matchers.like(anyPactEvent()),
                },
            },
        });

        const { result, waitFor } = renderHook(() => useGetEvent(eventId), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>;
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        await waitFor(() => {
            expect(result.current.data).toEqual(anyEvent());
        });
    });

    it("will add a new event", async () => {
        await provider.addInteraction({
            state: "there are events",
            uponReceiving: "a request to add new events",
            withRequest: {
                method: "POST",
                path: "/v1/network-scheduling-management/events",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    name: Matchers.like("test type"),
                    startDate: Matchers.like("2023-04-06T07:00:00.000Z"),
                    endDate: Matchers.like("2023-04-08T07:00:00.000Z"),
                    description: Matchers.like("test type"),
                    isBlockedForMission: Matchers.like(true),
                    aircraftId: Matchers.like("cc4199b7-fb01-4e99-a89e-378df3d2a236"),
                },
            },
            willRespondWith: addEventResponse,
        });

        const { result } = renderHook(() => useCreateEvent(), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>;
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        await act(async () => {
            await result.current.sendRequest({
                data: {
                    name: "test type",
                    startDate: "2023-04-06T07:00:00.000Z",
                    endDate: "2023-04-08T07:00:00.000Z",
                    description: "test type",
                    isBlockedForMission: true,
                    aircraftId: "cc4199b7-fb01-4e99-a89e-378df3d2a236",
                },
            });
        });
    });

    it("will edit an existing event", async () => {
        await provider.addInteraction({
            state: "there are events",
            uponReceiving: "a request to edit an existing event",
            withRequest: {
                method: "PUT",
                path: `/v1/network-scheduling-management/events/${eventId}`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    name: Matchers.like("test type 1"),
                    startDate: Matchers.like("2024-04-06T07:00:00.000Z"),
                    endDate: Matchers.like("2025-04-08T07:00:00.000Z"),
                    description: Matchers.like("test type 1 for editing"),
                    isBlockedForMission: Matchers.like(true),
                    aircraftId: Matchers.like("cc4199b7-fb01-4e99-a89e-378df3d2a236"),
                },
            },
            willRespondWith: editEventResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useUpdateEvent(), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>;
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(async () => {
            await result.current.sendRequestById(eventId, {
                data: {
                    name: "test type 1",
                    startDate: "2024-04-06T07:00:00.000Z",
                    endDate: "2025-04-08T07:00:00.000Z",
                    description: "test type 1 for editing",
                    isBlockedForMission: true,
                    aircraftId: "cc4199b7-fb01-4e99-a89e-378df3d2a236",
                },
            });
        });

        await waitForNextUpdate();
    });

    it("will delete an existing event", async () => {
        await provider.addInteraction({
            state: "there are events",
            uponReceiving: "a request to delete an existing event",
            withRequest: {
                method: "DELETE",
                path: `/v1/network-scheduling-management/events/${eventId}`,
            },
            willRespondWith: {
                status: 204,
            },
        });

        const { result, waitForNextUpdate } = renderHook(() => useDeleteEvent(), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>;
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(async () => {
            await result.current.sendRequestById(eventId);
        });

        await waitForNextUpdate();
    });
});
