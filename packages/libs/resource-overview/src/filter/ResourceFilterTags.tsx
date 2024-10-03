import type { FilterSet } from "@voloiq/filter-panel";
import { FilterTags } from "@voloiq/filter-panel";
import { useGlobalState } from "../global-state/useGlobalState";
import type { BaseResource } from "../state-machine/BaseResource";
import { useFilterParameters } from "./useFilterParameters";

export const ResourceFilterTags = <Resource extends BaseResource>() => {
    const [state, send] = useGlobalState();
    const {
        context: { filters, appliedFilterSet = { filters: [] } },
        meta: {
            resourceOverview: { getResourceName },
        },
    } = state;

    const { setFilterSet } = useFilterParameters<Resource>(getResourceName(), filters);

    const onDeleteFilter = (filterSet: FilterSet<Resource>) => {
        setFilterSet(filterSet);
        send("APPLY_UPDATE_FILTER", { appliedFilterSet: filterSet });
    };

    if (appliedFilterSet.filters.length === 0) {
        return null;
    }

    return (
        <FilterTags
            filterSet={appliedFilterSet}
            listAriaLabel="Filter Tags"
            allowDelete
            onFilterDelete={onDeleteFilter}
        />
    );
};
