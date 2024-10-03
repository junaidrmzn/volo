import type { CrewRole } from "@voloiq-typescript-api/crew-api-types";
import type { Region } from "@voloiq-typescript-api/vertiport-management-types";
import type { FilterProperty } from "@voloiq/resource-overview";
import { useCrewMemberFilterTranslation } from "./translations/useCrewMemberFilterTranslation";

type UseGetAllFilterPropertiesProps = {
    crewRoles: CrewRole[];
    regions: Region[];
};

export const useGetAllFilterProperties = () => {
    const { t } = useCrewMemberFilterTranslation();
    const getAllFilterProperties = (props: UseGetAllFilterPropertiesProps): FilterProperty[] => {
        const { regions, crewRoles } = props;
        return [
            {
                type: "select",
                propertyName: "homeBase",
                options: regions?.map((region) => ({
                    label: region.name,
                    value: region.id,
                })),
                label: t("filterPanel.homeBase"),
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "department",
                label: t("filterPanel.department"),
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "firstName",
                label: t("filterPanel.firstName"),
                group: t("filterPanel.filters"),
            },
            {
                type: "text",
                propertyName: "surName",
                label: t("filterPanel.surName"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select-multiple",
                propertyName: "roleAssignments",
                options: crewRoles?.map((role) => ({
                    label: role.description,
                    value: role.id,
                })),
                label: t("filterPanel.roles"),
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "validFrom",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.validFrom"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "validTo",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.validTo"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
        ];
    };

    return { getAllFilterProperties };
};
