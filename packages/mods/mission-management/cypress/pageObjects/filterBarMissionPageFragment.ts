import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarMissionPageFragment = {
    filter: (missionData: Partial<{ service: string; flightNumber: string }>) => {
        const { flightNumber, service } = missionData;
        FilterBarPageFragment.expandFilterBar();
        if (service) {
            FilterBarPageFragment.setSelectValue({ label: "Service" }, service);
        }
        if (flightNumber) {
            FilterBarPageFragment.setTextValue({ label: "Flight number" }, flightNumber);
        }
        FilterBarPageFragment.applyFilters();
    },
};
