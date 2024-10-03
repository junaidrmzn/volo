import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useEsuAssignmentTableColumns } from "./useEsuAssignmentTableColumns";

export const useEsuTable = () => {
    const { EsuAssignmentTableColumns } = useEsuAssignmentTableColumns();
    const { t } = useResourcesTranslation();

    const esuTableProps = {
        columns: EsuAssignmentTableColumns,
        paginationProps: {
            hasClientSidePagination: true,
            itemsPerPage: 10,
            nextPageAriaLabel: t("battery.edit.next"),
            paginationAriaLabel: t("battery.edit.pagination"),
            previousPageAriaLabel: t("battery.edit.previous"),
        } as const,
        sortingProps: {
            isSortable: true,
        } as const,
    };
    return { esuTableProps };
};
