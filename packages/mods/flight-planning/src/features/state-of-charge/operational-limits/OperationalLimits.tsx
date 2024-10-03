import { Dispatch, SetStateAction } from "react";
import { WindScenario } from "@voloiq/flight-planning-api/v1";
import { useOperationalLimits } from "./useOperationalLimits";

type OperationalLimitsProps = {
    windScenario: WindScenario;
    setWindScenario: Dispatch<SetStateAction<WindScenario>>;
};
export const OperationalLimits = (props: OperationalLimitsProps) => {
    const { windScenario, setWindScenario } = props;
    useOperationalLimits({ windScenario, setWindScenario });

    return null;
};
