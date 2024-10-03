import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarParameterPageFragment = {
    filter: (parameterData: Partial<{ name: string; acronym: string; unit: string }>) => {
        const { name, acronym, unit } = parameterData;

        FilterBarPageFragment.expandFilterBar();

        if (name) {
            FilterBarPageFragment.setTextValue({ label: "Name" }, name);
        }
        if (acronym) {
            FilterBarPageFragment.setTextValue({ label: "Acronym" }, acronym);
        }
        if (unit) {
            FilterBarPageFragment.setTextValue({ label: "Unit" }, unit);
        }

        FilterBarPageFragment.applyFilters();
    },
};
