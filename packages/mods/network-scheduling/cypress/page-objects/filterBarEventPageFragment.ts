import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarEventPageFragment = {
    filter: (filterData: Partial<{ aircraft: string; name: string }>) => {
        const { aircraft, name } = filterData;
        FilterBarPageFragment.expandFilterBar();
        if (aircraft) FilterBarPageFragment.setSelectValue({ label: "Aircraft" }, aircraft);
        if (name) FilterBarPageFragment.setTextValue({ label: "Event" }, name);
        FilterBarPageFragment.applyFilters();
    },
    sorting: (sortingData: { sortingOption: string; comparisonOperatorLabel?: string }) => {
        const { sortingOption, comparisonOperatorLabel } = sortingData;
        FilterBarPageFragment.setSortingValue(sortingOption, comparisonOperatorLabel);
        FilterBarPageFragment.applyFilters();
    },
};
