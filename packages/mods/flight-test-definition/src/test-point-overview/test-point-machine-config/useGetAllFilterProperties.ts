import { FilterProperty } from "@voloiq/resource-overview";
import { useTestPointMachineConfigTranslation } from "./translations/useTestPointMachineConfigTranslation";

export const useGetAllFilterProperties = () => {
    const { t } = useTestPointMachineConfigTranslation();

    const getAllFilterProperties = (): FilterProperty[] => {
        return [
            {
                type: "number",
                propertyName: "ata",
                label: t("ATA"),
                group: t("Filters"),
            },
            {
                type: "text",
                label: t("Definition ID"),
                propertyName: "definitionId",
                group: t("Filters"),
            },
            {
                type: "text",
                label: t("Procedure ID"),
                propertyName: "procedureId",
                group: t("Filters"),
            },
            {
                type: "text",
                label: t("Procedure Title"),
                propertyName: "procedureTitle",
                group: t("Filters"),
            },
        ];
    };
    return { getAllFilterProperties };
};
