import type { Property, SortingConfig } from "@volocopter/filter-react";
import { propertyToPropertyFilter, sortingConfigToSortingState } from "@volocopter/filter-react";
import { isNotNullish } from "@volocopter/typescript-utils";
import type { FilterProps } from "@voloiq/filter-panel";
import { useFilterParameters as useOldFilterParameters } from "../../filter/useFilterParameters";
import type { BaseResource } from "../../state-machine/BaseResource";
import { transformPropertyFiltersToFilterSet } from "../conversion/transformPropertyFiltersToFilterSet";
import { transformSortingStateToSortingConfiguration } from "../conversion/transformSortingStateToSortingConfiguration";
import { useFilterParameters as useNewFilterParameters } from "./useFilterParameters";

export const useInitialFilterSet = <Entity extends BaseResource>(
    localStorageKey: string,
    properties: Property[],
    filters: FilterProps<Entity>[],
    withOldFilter = true,
    sortingConfig?: SortingConfig
) => {
    const { filterSet: oldFilterSet } = useOldFilterParameters(localStorageKey, filters);

    const { propertiesWithValues, sortingConfigWithValue } = useNewFilterParameters(
        localStorageKey,
        properties,
        sortingConfig
    );

    const newFilterSet = transformPropertyFiltersToFilterSet(
        propertiesWithValues.map(propertyToPropertyFilter).filter(isNotNullish)
    );

    const sortingConfiguration = sortingConfigWithValue
        ? transformSortingStateToSortingConfiguration(sortingConfigToSortingState(sortingConfigWithValue))
        : undefined;

    return { filters: withOldFilter ? oldFilterSet : newFilterSet, sortingConfiguration };
};
