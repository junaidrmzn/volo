import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarAircraftPageFragment = {
    filter: (
        filterData: Partial<{ aircraftType: string; msn: string; leonId: boolean; comparisonOperatorLabel: string }>
    ) => {
        const { aircraftType, msn, leonId, comparisonOperatorLabel } = filterData;
        FilterBarPageFragment.expandFilterBar();
        if (aircraftType) FilterBarPageFragment.setSelectValue({ label: "Aircraft type" }, aircraftType);
        if (msn) FilterBarPageFragment.setTextValue({ label: "MSN" }, msn);
        if (leonId) {
            FilterBarPageFragment.setNullCheckbox(
                { label: "LEON ID", propertyName: "leonId" },
                comparisonOperatorLabel
            );
        }
        FilterBarPageFragment.applyFilters();
    },
};
