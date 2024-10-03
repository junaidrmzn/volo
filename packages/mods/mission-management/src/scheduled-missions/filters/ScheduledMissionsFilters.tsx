import { VStack } from "@volocopter/design-library-react";
import { FilterBar } from "@voloiq/network-scheduling-components";
import { ScheduledMissionsQuickFilters } from "../quick-filters/ScheduledMissionsQuickFilters";
import { useScheduledMissionsFilterPropterties } from "./useScheduledMissionsFilterProperties";

type ScheduledMissionsFiltersProps = {
    handleFilterChange: (filters: string) => void;
};
export const ScheduledMissionsFilters = (props: ScheduledMissionsFiltersProps) => {
    const { handleFilterChange } = props;
    const { properties } = useScheduledMissionsFilterPropterties();

    return (
        <VStack alignItems="stretch" width="full" pb={2} gap={3}>
            <FilterBar properties={properties} onFilterChange={handleFilterChange} isSerialized />
            <ScheduledMissionsQuickFilters />
        </VStack>
    );
};
