import type { Property } from "@volocopter/filter-react";
import { useGetAllAircraftZones, useGetAllWorkgroups } from "@voloiq/flight-test-definition-api/v1";
import { useFilterbarTranslation } from "./translations/useFlightTestRequestSectionTranslation";

export const useGetFilterBarProperties = () => {
    const { data: aircraftZones } = useGetAllAircraftZones();
    const { data: workGroups } = useGetAllWorkgroups();
    const { t } = useFilterbarTranslation();

    const properties: Property[] = [
        {
            type: "text",
            propertyName: t("Filter bar.FTI Code.propertyName"),
            group: t("Filter bar.Title"),
            label: t("Filter bar.FTI Code.label"),
        },
        {
            type: "text",
            propertyName: t("Filter bar.Short Description.propertyName"),
            group: t("Filter bar.Title"),
            label: t("Filter bar.Short Description.label"),
        },
        {
            type: "select-multiple",
            propertyName: t("Filter bar.Aircraft Zones.propertyName"),
            group: t("Filter bar.Title"),
            label: t("Filter bar.Aircraft Zones.label"),
            options: aircraftZones?.map((aircrafiZone) => ({
                label: aircrafiZone.label,
                value: aircrafiZone.id,
            })),
        },
        {
            type: "select-multiple",
            propertyName: t("Filter bar.Work Groups.propertyName"),
            group: t("Filter bar.Title"),
            label: t("Filter bar.Work Groups.label"),
            options: workGroups?.map((workGroup) => ({
                label: workGroup.label,
                value: workGroup.id,
            })),
        },
    ];

    return { properties };
};
