import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarVertiportPageFragment = {
    filter: (
        vertiportData: Partial<{ services: string; region: string; leonId: boolean; comparisonOperatorLabel: string }>
    ) => {
        const { services, region, leonId, comparisonOperatorLabel } = vertiportData;
        FilterBarPageFragment.expandFilterBar();
        if (services) {
            FilterBarPageFragment.setSelectValue({ label: "Services" }, services);
        }
        if (region) {
            FilterBarPageFragment.setSelectValue({ label: "Region ID" }, region);
        }
        if (leonId) {
            FilterBarPageFragment.setNullCheckbox(
                { label: "LEON ID", propertyName: "leonId" },
                comparisonOperatorLabel
            );
        }
        FilterBarPageFragment.applyFilters();
    },
    sorting: (sortingData: { sortingOption: string; comparisonOperatorLabel?: string }) => {
        const { sortingOption, comparisonOperatorLabel } = sortingData;
        FilterBarPageFragment.setSortingValue(sortingOption, comparisonOperatorLabel);
        FilterBarPageFragment.applyFilters();
    },
};
