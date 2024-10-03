import { useContext } from "react";
import { TimeSchedulerStateContext } from "./TimeSchedulerStateContext";

export const useTimeSchedulerState = () => {
    const timeSchedulerState = useContext(TimeSchedulerStateContext);

    if (timeSchedulerState === undefined) {
        throw new Error("useTimeSchedulerState must be used within TimeSchedulerStateProvider");
    }

    return timeSchedulerState;
};
