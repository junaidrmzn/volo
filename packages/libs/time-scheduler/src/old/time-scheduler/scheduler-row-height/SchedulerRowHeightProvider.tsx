import type { PropsWithChildren } from "react";
import { SchedulerRowHeightContext } from "./SchedulerRowHeightContext";
import { useRowVisibilityMap } from "./item-visibility/useRowVisibilityMap";
import { useRowLabelHeightMap } from "./row-label-height/useRowLabelHeightMap";

export const SchedulerRowHeightProvider = (props: PropsWithChildren<{}>) => {
    const { children } = props;

    const { schedulerRowVisibilityMap, toggleItemVisibility } = useRowVisibilityMap();
    const { rowLabelHeightMap, setRowLabelHeight } = useRowLabelHeightMap();

    return (
        <SchedulerRowHeightContext.Provider
            value={{ schedulerRowVisibilityMap, toggleItemVisibility, rowLabelHeightMap, setRowLabelHeight }}
        >
            {children}
        </SchedulerRowHeightContext.Provider>
    );
};
