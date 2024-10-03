import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarFtiParameterPageFragment = {
    filter: (ftiParameterData: Partial<{ shortDescription: string; ftiCode: string }>) => {
        const { shortDescription, ftiCode } = ftiParameterData;

        FilterBarPageFragment.expandFilterBar();

        if (shortDescription) {
            FilterBarPageFragment.setTextValue({ label: "Short Description" }, shortDescription);
        }

        if (ftiCode) {
            FilterBarPageFragment.setTextValue({ label: "FTI Code" }, ftiCode);
        }

        FilterBarPageFragment.applyFilters();
    },
};
