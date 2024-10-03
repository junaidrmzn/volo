import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarLogbookPageFragments = {
    filter: (logBookData: Partial<{ location: string; minVelocity: number; maxVelocity: number }>) => {
        const { location, maxVelocity, minVelocity } = logBookData;

        FilterBarPageFragment.expandFilterBar();

        if (location) {
            FilterBarPageFragment.setSelectValue({ label: "Location" }, location);
        }

        if (minVelocity) {
            FilterBarPageFragment.setNumberRangeMaxValue(
                { label: "Max. Velocity (m/s)", maxLabel: "From" },
                minVelocity
            );
        }

        if (maxVelocity) {
            FilterBarPageFragment.setNumberRangeMaxValue({ label: "Max. Velocity (m/s)", maxLabel: "To" }, maxVelocity);
        }

        FilterBarPageFragment.applyFilters();
    },

    multiSelectFilter: (logBookData: Partial<{ aircraft: string[] }>) => {
        const { aircraft } = logBookData;

        FilterBarPageFragment.expandFilterBar();

        if (aircraft) {
            FilterBarPageFragment.setSelectMultipleValues({ label: "Aircraft" }, aircraft);
        }

        FilterBarPageFragment.applyFilters();
    },
};
