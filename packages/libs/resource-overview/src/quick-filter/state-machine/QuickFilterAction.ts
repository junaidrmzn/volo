import { assign } from "xstate";
import type { ApplyQuickFilterEvent } from "./ApplyQuickFilterEvent";
import type { QuickFilterContext } from "./QuickFilterContext";

export const applyQuickFilter = () =>
    assign<QuickFilterContext, ApplyQuickFilterEvent>({
        appliedQuickFilter: (_, event) => event.appliedQuickFilter,
    });
