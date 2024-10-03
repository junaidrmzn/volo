import { useState } from "react";
import { FlightStatus } from "@voloiq/flight-planning-api/v1";

export const useFlightStatusProvider = () => {
    const [flightStatus, setFlightStatus] = useState<FlightStatus>({
        alerts: [],
        remainingEnergy: 0,
        validationStatus: "not_yet_validated",
        duration: 0,
    });

    return { flightStatus, setFlightStatus };
};
