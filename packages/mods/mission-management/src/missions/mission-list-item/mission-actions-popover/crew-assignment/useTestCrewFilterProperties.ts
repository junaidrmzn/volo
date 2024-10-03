import type { Property } from "@volocopter/filter-react";
import { useGetAllCrewRoles, useGetAllRegions } from "../../../../api-hooks/useNetworkSchedulingService";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

export const useTestCrewFilterPropterties = () => {
    const { t } = useMissionTranslations();
    const { data: crewRoles } = useGetAllCrewRoles();
    const { data: regions } = useGetAllRegions();
    const properties: Property[] = [
        {
            type: "text",
            propertyName: "firstName",
            group: "Workflows",
            label: t("crewAssignment.filters.firstName"),
        },
        {
            type: "text",
            propertyName: "surName",
            group: "Workflows",
            label: t("crewAssignment.filters.surName"),
        },
        {
            type: "text",
            propertyName: "email",
            group: "Workflows",
            label: t("crewAssignment.filters.email"),
        },
        {
            type: "select-multiple",
            propertyName: "roleAssignments",
            options: crewRoles?.map((role) => ({
                label: role.description,
                value: role.id,
            })),
            group: "Workflows",
            label: t("crewAssignment.filters.roles"),
        },
        {
            type: "select",
            propertyName: "homeBase",
            options: regions?.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            group: "Workflows",
            label: t("crewAssignment.filters.homeBase"),
        },
    ];

    return { properties };
};
