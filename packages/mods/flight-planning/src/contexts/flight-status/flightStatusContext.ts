import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { FlightStatus } from "@voloiq/flight-planning-api/v1";

type FlightStatusContextValue = FlightStatus & {
    setFlightStatus: Dispatch<SetStateAction<Partial<FlightStatus>>>;
};
export const FlightStatusContext = createContext<FlightStatusContextValue | undefined>(undefined);
