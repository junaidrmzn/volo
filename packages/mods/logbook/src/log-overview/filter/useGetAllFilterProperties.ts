import type { Aircraft, CrewMember, Location } from "@voloiq/logbook-api/v6";
import { FilterProperty } from "@voloiq/resource-overview";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";

type GetAllFilterPropertiesProps = {
    aircrafts: Aircraft[];
    locations: Location[];
    crewMembers: CrewMember[];
};

export const useGetAllFilterProperties = () => {
    const { t } = useLogbookTranslation();

    const getAllFilterProperties = (props: GetAllFilterPropertiesProps): FilterProperty[] => {
        const { crewMembers, aircrafts, locations } = props;
        return [
            {
                type: "date-range",
                propertyName: "date",
                minLabel: t("filterPanel.dateRangeFilter.fromLabel"),
                maxLabel: t("filterPanel.dateRangeFilter.toLabel"),
                label: t("filterPanel.dateRangeFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "select-multiple",
                propertyName: "pilot",
                propertyNameSerializer: () => `crew.role EQ "PILOT" AND crew.crewMemberId`,
                options: crewMembers.map((crewMember) => ({
                    label: `${crewMember.firstName} ${crewMember.lastName}`,
                    value: crewMember.id,
                })),
                label: t("filterPanel.selectPilotFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "select-multiple",
                propertyName: "aircraftId",
                // This is an optimization for the backend api instead of using aircraft.id
                propertyNameSerializer: () => "aircraftId",
                options: aircrafts?.map((aircraft) => ({
                    label: `${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`,
                    value: aircraft.id,
                })),
                label: t("filterPanel.selectAircraftFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "text",
                propertyName: "flightTestOrder",
                label: t("filterPanel.flightTestOrderTextFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "select-multiple",
                propertyName: "locationId",
                propertyNameSerializer: () => "location.id",
                options: locations.map((location) => ({ label: location.icaoCode, value: location.id })),
                label: t("filterPanel.selectLocationFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "number-range",
                propertyName: "totalFlightDuration",
                propertyNameSerializer: () => "statistics.totalFlightDuration",
                minLabel: t("filterPanel.totalFlightDurationRangeFilter.fromLabel"),
                maxLabel: t("filterPanel.totalFlightDurationRangeFilter.toLabel"),
                label: t("filterPanel.totalFlightDurationRangeFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "number-range",
                propertyName: "maxAltitude",
                propertyNameSerializer: () => "statistics.maxAltitude",
                minLabel: t("filterPanel.maxAltitudeRangeFilter.fromLabel"),
                maxLabel: t("filterPanel.maxAltitudeRangeFilter.toLabel"),
                label: t("filterPanel.maxAltitudeRangeFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "number-range",
                propertyName: "maxVelocity",
                propertyNameSerializer: () => "statistics.maxVelocity",
                minLabel: t("filterPanel.maxVelocityRangeFilter.fromLabel"),
                maxLabel: t("filterPanel.maxVelocityRangeFilter.toLabel"),
                label: t("filterPanel.maxVelocityRangeFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "select-multiple",
                propertyName: "supervisor",
                propertyNameSerializer: () => `crew.role EQ "SUPERVISOR" AND crew.crewMemberId`,
                options: crewMembers.map((crewMember) => ({
                    label: `${crewMember.firstName} ${crewMember.lastName}`,
                    value: crewMember.id,
                })),
                label: t("filterPanel.selectSupervisorFilter.displayName"),
                group: t("filterPanel.title"),
            },
            {
                type: "select",
                propertyName: "dataState",
                options: [
                    {
                        label: "TM Data",
                        value: "TM_DATA",
                    },
                    {
                        label: "Onboard Recorded Data",
                        value: "ONBOARD_RECORDED_DATA",
                    },
                ],
                label: t("filterPanel.selectDataStateFilter.displayName"),
                group: t("filterPanel.title"),
            },
        ];
    };
    return { getAllFilterProperties };
};
