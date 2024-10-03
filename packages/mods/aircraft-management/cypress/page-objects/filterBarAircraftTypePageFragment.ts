import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarAircraftTypePageFragment = {
    filter: (filterData: Partial<{ productLine: string[]; aircraftType: string }>) => {
        const { productLine, aircraftType } = filterData;
        FilterBarPageFragment.expandFilterBar();
        if (productLine) FilterBarPageFragment.setSelectMultipleValues({ label: "Product line" }, productLine);
        if (aircraftType) FilterBarPageFragment.setTextValue({ label: "Aircraft type" }, aircraftType);
        FilterBarPageFragment.applyFilters();
    },
};
