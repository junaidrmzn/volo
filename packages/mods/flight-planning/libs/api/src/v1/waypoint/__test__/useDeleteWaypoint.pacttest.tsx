import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act, renderHook } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { ReactQueryClientProvider } from "../../../react-query";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useDeleteWaypoint } from "../useDeleteWaypoint";

const routeId = 1;
const waypointId = 1;

const deleteWaypointRequest: RequestOptions = {
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/waypoints/${waypointId}`,
    method: "DELETE",
};

const deleteWaypointResponse: ResponseOptions = {
    status: 204,
};

pactWith({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    test("delete a waypoint of route", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} exists and has chosen waypoint to delete`,
            uponReceiving: "request to delete waypoint on existing route",
            withRequest: deleteWaypointRequest,
            willRespondWith: deleteWaypointResponse,
        });

        const { result, waitFor } = renderHook(() => useDeleteWaypoint(routeId), {
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
            result.current.deleteWaypointOnRoute(waypointId);
        });
        await waitFor(() => result.current.isSuccess);
    });
});
