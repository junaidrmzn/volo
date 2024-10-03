import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { Matchers } from "@pact-foundation/pact";
import { act, renderHook } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { pactify } from "../../../pactify";
import { ReactQueryClientProvider } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { anyWaypointCreate } from "../anyWaypoint";
import { useCreateWaypoint } from "../useCreateWaypoint";

const routeId = 1;
const createWaypointRequest: RequestOptions = {
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/waypoints`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: Matchers.like(pactify(anyWaypointCreate)()),
};

const createWaypointResponse: ResponseOptions = {
    status: 201,
    body: {
        pagination: {
            page: null,
            size: null,
            totalPages: null,
            totalElements: null,
        },
        error: null,
        data: Matchers.like(pactify(anyWaypointCreate)()),
    },
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    test("add a waypoint of route", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} exists and has waypoint data`,
            uponReceiving: "request to add waypoint on existing route",
            withRequest: createWaypointRequest,
            willRespondWith: createWaypointResponse,
        });

        const { result, waitFor } = renderHook(() => useCreateWaypoint(routeId), {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl + FLIGHT_PLANNING_V1}>
                                <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                            </ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });
        act(() => {
            result.current.createWaypoint(anyWaypointCreate());
        });
        await waitFor(() => result.current.isSuccess);
    });
});
