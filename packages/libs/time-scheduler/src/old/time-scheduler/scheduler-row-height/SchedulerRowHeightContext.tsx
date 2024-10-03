import { createContext } from "use-context-selector";
import type { SchedulerRowVisibilityMap, ToggleItemVisibility } from "./item-visibility/useRowVisibilityMap";
import type { RowLabelHeightMap, SetRowLabelHeight } from "./row-label-height/useRowLabelHeightMap";

export type SchedulerRowHeightContextType = {
    schedulerRowVisibilityMap: SchedulerRowVisibilityMap;
    toggleItemVisibility: ToggleItemVisibility;
    rowLabelHeightMap: RowLabelHeightMap;
    setRowLabelHeight: SetRowLabelHeight;
};

export const SchedulerRowHeightContext = createContext<SchedulerRowHeightContextType | undefined>(undefined);
