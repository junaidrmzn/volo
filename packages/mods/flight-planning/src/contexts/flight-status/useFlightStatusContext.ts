import { useContext } from "react";
import { FlightStatusContext } from "./flightStatusContext";

export const useFlightStatusContext = () => {
    const context = useContext(FlightStatusContext);

    if (!context) throw new Error("useFlightStatusContext must be used within FlightStatusProvider");

    return context;
};
