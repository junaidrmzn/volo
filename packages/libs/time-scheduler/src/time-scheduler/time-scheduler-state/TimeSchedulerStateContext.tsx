import type { Dispatch } from "react";
import { createContext } from "react";
import type { TimeSchedulerAction } from "./timeSchedulerReducer";
import type { TimeSchedulerState } from "./timeSchedulerState";

export type TimeSchedulerStateContextType = {
    dispatch: Dispatch<TimeSchedulerAction>;
} & TimeSchedulerState;
export const TimeSchedulerStateContext = createContext<TimeSchedulerStateContextType | undefined>(undefined);
