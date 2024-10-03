import type { Esu } from "@voloiq-typescript-api/battery-management-types";
import type { Column } from "@voloiq/table";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import type { EsuListItem } from "./EsuListItem";

export const useEsuAssignmentTableColumns = () => {
    const { t } = useResourcesTranslation();

    const EsuAssignmentTableColumns: Column<EsuListItem>[] = [
        { Header: t("battery.esuAssignmentTable.name"), accessor: (data: Esu) => data.name, id: "name" },
        { Header: t("battery.esuAssignmentTable.status"), accessor: (data: Esu) => data.status, id: "status" },
        { Header: t("battery.esuAssignmentTable.technicalStatus"), accessor: "technicalStatus" },
        { Header: t("battery.esuAssignmentTable.location"), accessor: "location" },
        { Header: t("battery.esuAssignmentTable.flightPermit"), accessor: "flightPermits" },
    ];
    return { EsuAssignmentTableColumns };
};
