import type { TimeSchedulerState } from "../../time-scheduler-state/timeSchedulerState";

export type SetCurrenStartDateAction = {
    type: "setCurrentStartDate";
};

export const setCurrentStartDateReducer = (state: TimeSchedulerState) => (): TimeSchedulerState => {
    return {
        ...state,
        startDate: new Date(),
    };
};
