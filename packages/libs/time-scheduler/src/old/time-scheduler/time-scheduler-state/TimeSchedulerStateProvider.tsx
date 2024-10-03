import { useReducer } from "react";
import { TimeSchedulerStateContext } from "./TimeSchedulerStateContext";
import { timeSchedulerReducer } from "./timeSchedulerReducer";
import { initialTimeSchedulerState } from "./timeSchedulerState";

export const TimeSchedulerStateProvider: FCC = (props) => {
    const { children } = props;
    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const [state, dispatch] = useReducer(timeSchedulerReducer, initialTimeSchedulerState);
    return (
        <TimeSchedulerStateContext.Provider value={{ dispatch, ...state }}>
            {children}
        </TimeSchedulerStateContext.Provider>
    );
};
