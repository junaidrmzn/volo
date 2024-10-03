import { Aircraft } from "@voloiq/network-scheduling-management-api/v1";
import type { FilterProperty } from "@voloiq/resource-overview";
import { useEventFilterTranslation } from "./translations/useEventFilterTranslation";

type UseGetAllFilterPropertiesProps = {
    aircrafts: Aircraft[];
};

export const useGetAllFilterProperties = () => {
    const { t } = useEventFilterTranslation();
    const getAllFilterProperties = (props: UseGetAllFilterPropertiesProps): FilterProperty[] => {
        const { aircrafts } = props;
        return [
            {
                type: "text",
                propertyName: "name",
                label: t("filterPanel.name"),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "event.eventAircraftAssignment.aircraft.id",
                label: t("filterPanel.aircraft"),
                options: aircrafts?.map((event) => ({
                    label: `${event.msn}${event.registration ? ` - ${event.registration}` : ""}`,
                    value: event.aircraftId,
                })),
                group: t("filterPanel.filters"),
            },
            {
                type: "select",
                propertyName: "isBlockedForMission",
                label: t("filterPanel.blockedForMission.caption"),
                options: [
                    { label: t("filterPanel.blockedForMission.true"), value: "true" },
                    {
                        label: t("filterPanel.blockedForMission.false"),
                        value: "false",
                    },
                ],
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "startDate",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.startDate"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
            {
                type: "date-range",
                propertyName: "endDate",
                minLabel: t("filterPanel.from"),
                maxLabel: t("filterPanel.to"),
                label: t("filterPanel.endDate"),
                withUtcTime: true,
                group: t("filterPanel.filters"),
            },
        ];
    };

    return { getAllFilterProperties };
};
