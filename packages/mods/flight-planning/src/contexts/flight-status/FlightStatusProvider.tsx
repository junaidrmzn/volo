import { FlightStatusContext } from "./flightStatusContext";
import { useFlightStatusProvider } from "./useFlightStatusProvider";

export const FlightStatusProvider: FCC = (props) => {
    const { children } = props;
    const { flightStatus, setFlightStatus } = useFlightStatusProvider();

    return (
        <FlightStatusContext.Provider
            value={{
                ...flightStatus,
                setFlightStatus: (data) => setFlightStatus((previous) => ({ ...previous, ...data })),
            }}
        >
            {children}
        </FlightStatusContext.Provider>
    );
};
