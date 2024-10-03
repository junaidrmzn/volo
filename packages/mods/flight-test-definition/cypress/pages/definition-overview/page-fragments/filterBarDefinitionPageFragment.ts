import { FilterBarPageFragment } from "@voloiq/resource-overview-cypress-page-objects";

export const FilterBarDefinitionPageFragment = {
    filter: (definitionData: Partial<{ title: string; requesterName: string; ata: number }>) => {
        const { title, requesterName, ata } = definitionData;

        FilterBarPageFragment.expandFilterBar();

        if (title) {
            FilterBarPageFragment.setTextValue({ label: "Title" }, title);
        }
        if (requesterName) {
            FilterBarPageFragment.setTextValue({ label: "Requester Name" }, requesterName);
        }
        if (ata) {
            FilterBarPageFragment.setNumberValue({ label: "ATA" }, ata);
        }
        FilterBarPageFragment.applyFilters();
    },
};
