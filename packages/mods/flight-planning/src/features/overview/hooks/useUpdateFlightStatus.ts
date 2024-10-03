import { useEffect } from "react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useFlightStatusContext } from "../../../contexts/flight-status";

export const useUpdateFlightStatus = (route?: Route) => {
    const { setFlightStatus } = useFlightStatusContext();

    useEffect(() => {
        if (!route) return;
        const { alerts, remainingEnergy, validationStatus, duration } = route;
        setFlightStatus({ alerts, remainingEnergy, validationStatus, duration });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]);
};
