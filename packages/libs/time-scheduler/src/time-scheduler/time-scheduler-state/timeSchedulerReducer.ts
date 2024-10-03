import { match } from "ts-pattern";
import type { SetScrollPositionAction } from "../persist-settings/scroll-position/setScrollPositionReducer";
import { setScrollPositionReducer } from "../persist-settings/scroll-position/setScrollPositionReducer";
import type { SetCurrenStartDateAction } from "../persist-settings/set-start-date/setCurrentStartDateReducer";
import { setCurrentStartDateReducer } from "../persist-settings/set-start-date/setCurrentStartDateReducer";
import type { SetStartDateAction } from "../persist-settings/set-start-date/setStartDateReducer";
import { setStartDateReducer } from "../persist-settings/set-start-date/setStartDateReducer";
import type { ScrollAction } from "../scroll/scrollReducer";
import { scrollReducer } from "../scroll/scrollReducer";
import type { SetDateRangeAction } from "../zoom/dateRangeReducer";
import { dateRangeReducer } from "../zoom/dateRangeReducer";
import type { ZoomAction } from "../zoom/zoomReducer";
import { zoomReducer } from "../zoom/zoomReducer";
import type { TimeSchedulerState } from "./timeSchedulerState";

export type TimeSchedulerAction =
    | ZoomAction
    | ScrollAction
    | SetScrollPositionAction
    | SetCurrenStartDateAction
    | SetStartDateAction
    | SetDateRangeAction;

export const timeSchedulerReducer = (state: TimeSchedulerState, action: TimeSchedulerAction) =>
    match(action)
        .with({ type: "zoom" }, zoomReducer(state))
        .with({ type: "scroll" }, scrollReducer(state))
        .with({ type: "setScrollPosition" }, setScrollPositionReducer(state))
        .with({ type: "setCurrentStartDate" }, setCurrentStartDateReducer(state))
        .with({ type: "setStartDate" }, setStartDateReducer(state))
        .with({ type: "setDateRange" }, dateRangeReducer(state))
        .exhaustive();
