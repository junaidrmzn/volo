import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarCrewMemberPageFragment = {
    filter: (filterData: Partial<{ firstName: string; roles: string }>) => {
        const { roles, firstName } = filterData;
        FilterBarPageFragment.expandFilterBar();
        if (roles) FilterBarPageFragment.setSelectMultipleValues({ label: "Roles" }, [roles]);
        if (firstName) FilterBarPageFragment.setTextValue({ label: "First name" }, firstName);
        FilterBarPageFragment.applyFilters();
    },
    sorting: (sortingData: { sortingOption: string; comparisonOperatorLabel?: string }) => {
        const { sortingOption, comparisonOperatorLabel } = sortingData;
        FilterBarPageFragment.setSortingValue(sortingOption, comparisonOperatorLabel);
        FilterBarPageFragment.applyFilters();
    },
};
