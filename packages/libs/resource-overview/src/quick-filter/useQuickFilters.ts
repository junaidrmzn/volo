import { useCallback } from "react";
import { useGlobalState } from "../global-state/useGlobalState";
import type { QuickFilter } from "./state-machine/Types";

export const useQuickFilters = () => {
    const [state, send] = useGlobalState();
    const {
        context: { appliedQuickFilter = {}, quickFilterProperties = [] },
    } = state;

    const applyQuickFilter = useCallback(
        (appliedQuickFilter: QuickFilter) => {
            send("APPLY_QUICK_FILTER", { appliedQuickFilter });
        },
        [send]
    );

    const resetQuickFilter = useCallback(() => {
        send("APPLY_QUICK_FILTER", { appliedQuickFilter: {} });
    }, [send]);

    return { appliedQuickFilter, quickFilterProperties, applyQuickFilter, resetQuickFilter };
};
