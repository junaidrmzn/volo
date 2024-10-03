import type { TimeSchedulerState } from "../../time-scheduler-state/timeSchedulerState";

export type SetStartDateAction = {
    type: "setStartDate";
    startDate: Date;
};

export const setStartDateReducer =
    (state: TimeSchedulerState) =>
    (setScrollPositionAction: SetStartDateAction): TimeSchedulerState => {
        return {
            ...state,
            startDate: setScrollPositionAction.startDate,
        };
    };
