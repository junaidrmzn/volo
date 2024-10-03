import type { Property } from "@volocopter/filter-react";
import { TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { useGetAllAircraftTypes, useGetAllRegions } from "../../../../api-hooks/useNetworkSchedulingService";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

export const useAircraftFilterPropterties = () => {
    const { t } = useMissionTranslations();
    const { data: aircraftTypes } = useGetAllAircraftTypes(1, 100);
    const { data: regions } = useGetAllRegions();

    const properties: Property[] = [
        {
            type: "text",
            propertyName: "registration",
            group: "Workflows",
            label: t("aircrafAssignment.filters.registration"),
        },
        {
            type: "select",
            propertyName: "aircraftTypeId",
            options: aircraftTypes?.map((acType) => ({
                label: acType.name,
                value: acType.id,
            })),
            group: "Workflows",
            label: t("aircrafAssignment.filters.aircraftType"),
        },
        {
            type: "select",
            propertyName: "regionId",
            options: regions?.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            group: "Workflows",
            label: t("aircrafAssignment.filters.region"),
        },
        {
            type: "text",
            propertyName: "msn",
            group: "Workflows",
            label: t("aircrafAssignment.filters.msn"),
        },
        {
            type: "select",
            propertyName: "technicalStatus",
            options: [
                { label: t("technicalStatus.SERVICEABLE"), value: TechnicalStatus.SERVICEABLE },
                {
                    label: t("technicalStatus.SERVICEABLE_WITH_LIMITATIONS"),
                    value: TechnicalStatus.SERVICEABLE_WITH_LIMITATIONS,
                },
                { label: t("technicalStatus.UNSERVICEABLE"), value: TechnicalStatus.UNSERVICEABLE },
            ],
            group: "Workflows",
            label: t("aircrafAssignment.filters.technicalStatus"),
        },
    ];

    return { properties };
};
