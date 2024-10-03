import type { DoneInvokeEvent } from "xstate";
import { assign } from "xstate";
import type { FilterObject } from "@voloiq/filter-panel";
import type { ApplyFilterEvent } from "./ApplyFilterEvent";
import type { FilterContext } from "./FilterContext";

export const applyFilter = <EntityType>() =>
    assign<FilterContext<EntityType>, ApplyFilterEvent<EntityType>>({
        appliedFilterSet: (_, event) => event.appliedFilterSet,
    });

export const loadFilters = <Resource>() =>
    assign<FilterContext<Resource>, DoneInvokeEvent<FilterObject<Resource>[]>>({
        filters: (_, event) => event.data,
    });
