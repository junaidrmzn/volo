import type { FilterObject, FilterSet } from "@voloiq/filter-panel";

export type FilterContext<EntityType> = {
    filters: FilterObject<EntityType>[];
    appliedFilterSet?: FilterSet<EntityType>;
};
