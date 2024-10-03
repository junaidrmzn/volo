import { assign } from "xstate";
import type { ApplySortEvent } from "./ApplySortEvent";
import type { SortContext } from "./SortContext";

export const applySort = () =>
    assign<SortContext, ApplySortEvent>({
        appliedSortingConfiguration: (_, event) => event.appliedSortingConfiguration,
    });
