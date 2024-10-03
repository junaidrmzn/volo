import type { DoneInvokeEvent } from "xstate";
import { assign } from "xstate";
import type { FilterProps } from "@voloiq/filter-panel";
import type { FilterContext } from "../../filter/state-machine/FilterContext";
import { SortContext } from "../../sort/state-machine/SortContext";
import { transformFilterPropsToProperties } from "../conversion/transformFilterPropsToProperties";
import { transformPropertyFiltersToFilterSet } from "../conversion/transformPropertyFiltersToFilterSet";
import { transformSortingStateToSortingConfiguration } from "../conversion/transformSortingStateToSortingConfiguration";
import type { ApplyFiltersEvent } from "./ApplyFiltersEvent";
import type { FilterBarContext } from "./FilterBarContext";

export const applyFilters = <Resource>() =>
    assign<FilterBarContext & FilterContext<Resource> & SortContext, ApplyFiltersEvent>({
        appliedFilters: (_, event) => event.appliedFilters,
        appliedFilterSet: (_, event) => transformPropertyFiltersToFilterSet(event.appliedFilters.filters),
        appliedSortingConfiguration: (_, event) =>
            transformSortingStateToSortingConfiguration(event.appliedFilters.sorting),
    });

export const loadFilters = <Resource>() =>
    assign<FilterBarContext & FilterContext<Resource>, DoneInvokeEvent<FilterProps<Resource>[]>>({
        filterProperties: (_, event) => transformFilterPropsToProperties<Resource>(event.data),
    });
