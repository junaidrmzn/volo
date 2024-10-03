import type { TimeSchedulerState } from "../../time-scheduler-state/timeSchedulerState";

export type SetScrollPositionAction = {
    type: "setScrollPosition";
    leftOffset: number;
    startDate: Date;
};

export const setScrollPositionReducer =
    (state: TimeSchedulerState) =>
    (setScrollPositionAction: SetScrollPositionAction): TimeSchedulerState => {
        const { leftOffset, startDate } = setScrollPositionAction;
        return {
            ...state,
            startDate,
            leftOffset,
        };
    };
