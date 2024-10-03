import type { FilterSet } from "@voloiq/filter-panel";

export type ApplyFilterEvent<EntityType> = { type: "APPLY_FILTER"; appliedFilterSet?: FilterSet<EntityType> };
