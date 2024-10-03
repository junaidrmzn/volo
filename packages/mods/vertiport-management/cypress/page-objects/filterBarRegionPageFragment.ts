import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarRegionPageFragment = {
    filter: (
        regionData: Partial<{ validFromStart: string; validFromEnd: string; validToStart: string; validToEnd: string }>
    ) => {
        const { validFromStart, validFromEnd, validToStart, validToEnd } = regionData;
        FilterBarPageFragment.expandFilterBar();
        if (validFromStart) {
            FilterBarPageFragment.setDateRangeMinValue(
                {
                    label: "Valid from",
                    minLabel: "From",
                },
                new Date(validFromStart)
            );
        }
        if (validFromEnd) {
            FilterBarPageFragment.setDateRangeMaxValue(
                {
                    label: "Valid from",
                    maxLabel: "To",
                },
                new Date(validFromEnd)
            );
        }
        if (validToStart) {
            FilterBarPageFragment.setDateRangeMinValue(
                {
                    label: "Valid to",
                    minLabel: "From",
                },
                new Date(validToStart)
            );
        }
        if (validToEnd) {
            FilterBarPageFragment.setDateRangeMaxValue(
                {
                    label: "Valid to",
                    maxLabel: "To",
                },
                new Date(validToEnd)
            );
        }
        FilterBarPageFragment.applyFilters();
    },
};
