import { useCallback } from "react";
import { useContextSelector } from "use-context-selector";
import { SchedulerRowHeightContext } from "../SchedulerRowHeightContext";
import type { RowLabelHeight } from "./useRowLabelHeightMap";

export type UseSetRowLabelHeight = {
    schedulerRowIndex: number;
};
export const useSetRowLabelHeight = (props: UseSetRowLabelHeight) => {
    const { schedulerRowIndex } = props;
    const setRowLabelHeight = useContextSelector(SchedulerRowHeightContext, (value) => value?.setRowLabelHeight);

    if (setRowLabelHeight === undefined) {
        throw new Error("useRowLabelHeight must be used within SchedulerRowHeightProvider");
    }

    const setRowLabelHeightForRow = useCallback(
        (rowLabelHeight: RowLabelHeight) => setRowLabelHeight(schedulerRowIndex, rowLabelHeight),
        [setRowLabelHeight, schedulerRowIndex]
    );

    return { setRowLabelHeight: setRowLabelHeightForRow };
};
