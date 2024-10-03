import { useContextSelector } from "use-context-selector";
import { SchedulerRowHeightContext } from "../SchedulerRowHeightContext";

export const useToggleItemVisibility = () => {
    const toggleItemVisibility = useContextSelector(SchedulerRowHeightContext, (value) => value?.toggleItemVisibility);

    if (toggleItemVisibility === undefined) {
        throw new Error("useToggleItemVisibility must be used within ItemRowCountProvider");
    }

    return { toggleItemVisibility };
};
