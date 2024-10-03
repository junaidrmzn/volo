import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarParametersPageFragment = {
    filter: (parameterData: Partial<{ aircraft: string; aircraftZone: string }>) => {
        const { aircraft, aircraftZone } = parameterData;

        FilterBarPageFragment.expandFilterBar();

        if (aircraft) {
            FilterBarPageFragment.setSelectMultipleValues({ label: "Aircraft" }, [aircraft]);
        }

        if (aircraftZone) {
            FilterBarPageFragment.setSelectMultipleValues({ label: "Aircraft zone" }, [aircraftZone]);
        }

        FilterBarPageFragment.applyFilters();
    },

    multiSelectFilter: (parameterData: Partial<{ aircraft: string[] }>) => {
        const { aircraft } = parameterData;

        FilterBarPageFragment.expandFilterBar();

        if (aircraft) {
            FilterBarPageFragment.setSelectMultipleValues({ label: "Aircraft" }, aircraft);
        }

        FilterBarPageFragment.applyFilters();
    },
};
