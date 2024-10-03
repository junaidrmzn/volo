import type { Flight, Route } from "@voloiq-typescript-api/flight-planning-types";
import { useEffect, useState } from "react";
import { useGetFlightByVtolRegistration } from "../../api-hooks/Flight/useGetFlightByVtolRegistration";
import { useGetFlightPlanInformation } from "../../api-hooks/Flight/useGetFlightPlanInformation";
import { useGetFlightRoute } from "../../api-hooks/Flight/useGetFlightRoute";

export const useActiveFlight = (vtolRegistration: string | null) => {
    const [activeFlight, setActiveFlight] = useState<Flight>();
    const [plannedRouteCoords, setPlannedRouteCoords] = useState<number[][]>();
    const { requestFlight } = useGetFlightByVtolRegistration();
    const { requestFlightPlanInformation } = useGetFlightPlanInformation();
    const { requestFlightRoute } = useGetFlightRoute();
    const mockedRouteCoords = [
        [2.441, 48.969],
        [2.471, 48.974],
        [2.471, 48.974],
        [2.515, 48.963],
        [2.515, 48.963],
        [2.528, 48.994],
        [2.528, 48.994],
        [2.538, 49.008],
        [2.536, 49.011],
        [2.538, 49.009],
        [2.538, 49.011],
        [2.536, 49.011],
    ];

    const createCoordinatesArray = (preferredRoute: Route) => {
        const latLngArray = preferredRoute.waypoints?.map((waypoint) => {
            return [waypoint.lng, waypoint.lat];
        });
        setPlannedRouteCoords(latLngArray);
    };

    const getPreferredRoute = async () => {
        const flightPlanInfo = await requestFlightPlanInformation();
        // if there are no flights in flight-plans use mockedRouteCoords
        if (Object.keys(flightPlanInfo.data).length === 0) {
            setPlannedRouteCoords(mockedRouteCoords);
        } else {
            const preferredRoute = await requestFlightRoute(flightPlanInfo.data.preferredRoute);
            createCoordinatesArray(preferredRoute.data);
        }
    };
    useEffect(() => {
        // For now we use the preferred route of the first flight until we have the task queue
        if (activeFlight !== undefined) {
            getPreferredRoute();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFlight]);

    useEffect(() => {
        if (!vtolRegistration) {
            setActiveFlight(undefined);
            return;
        }
        requestFlight(vtolRegistration).then((flight) => {
            if (flight && flight.data) setActiveFlight(flight.data);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vtolRegistration]);

    return { activeFlight, plannedRouteCoords };
};
