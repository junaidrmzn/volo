import { SortingPanel } from "@voloiq/sorting-panel";
import { useResourceSortTranslations } from "./translations/useResourceSortTranslations";
import { useSortPanel } from "./useSortPanel";

export const ResourceSort = () => {
    const { sortingOptions, selectedOption, selectedOrder, deleteSort, applySort, close } = useSortPanel();
    const { t } = useResourceSortTranslations();

    return (
        <SortingPanel
            applyButtonLabel={t("Apply")}
            ascendingLabel={t("Ascending")}
            backButtonAriaLabel={t("Back")}
            cancelButtonLabel={t("Cancel")}
            defaultOrder={selectedOrder}
            descendingLabel={t("Descending")}
            title={t("Sort")}
            options={sortingOptions}
            onCancel={close}
            onClose={deleteSort}
            onChange={applySort}
            defaultOption={selectedOption}
        />
    );
};
