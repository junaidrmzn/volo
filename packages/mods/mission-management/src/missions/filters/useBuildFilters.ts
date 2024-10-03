import { Service } from "@voloiq-typescript-api/aircraft-management-types";
import { StatusOfMission, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types";
import type { FilterProps } from "@voloiq/filter-panel";
import { MissionConflict } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../translations/useMissionTranslations";

export const useBuildFilters = <Resource>() => {
    const { t } = useMissionTranslations();

    const buildFilters = (): FilterProps<Resource>[] => {
        return [
            // Flight number
            {
                type: "text",
                propertyName: "flightNumber",
                propertyNameSerializer: () => "flightNumber",
                displayName: t("Flight number"),
            },
            // Status
            {
                type: "multiSelect",
                propertyName: "statusOfMission",
                propertyNameSerializer: () => "statusOfMission",
                displayName: t("mission-status.caption"),
                options: [
                    {
                        label: t(`mission-status.${StatusOfMission.PLANNED}`),
                        value: StatusOfMission.PLANNED,
                    },
                    {
                        label: t(`mission-status.${StatusOfMission.CANCELLED}`),
                        value: StatusOfMission.CANCELLED,
                    },
                    {
                        label: t(`mission-status.${StatusOfMission.BOARDING}`),
                        value: StatusOfMission.BOARDING,
                    },
                    {
                        label: t(`mission-status.${StatusOfMission.FLYING}`),
                        value: StatusOfMission.FLYING,
                    },
                    {
                        label: t(`mission-status.${StatusOfMission.DIVERTED}`),
                        value: StatusOfMission.DIVERTED,
                    },
                    {
                        label: t(`mission-status.${StatusOfMission.PERFORMED}`),
                        value: StatusOfMission.PERFORMED,
                    },
                    {
                        label: t(`mission-status.${StatusOfMission.CLOSED}`),
                        value: StatusOfMission.CLOSED,
                    },
                    {
                        label: t(`mission-status.${StatusOfMission.UNKNOWN}`),
                        value: StatusOfMission.UNKNOWN,
                    },
                ],
            },
            // Type of operation
            {
                type: "select",
                propertyName: "typeOfOperation",
                propertyNameSerializer: () => "typeOfOperation",
                displayName: t("Type of operation"),
                options: [
                    {
                        label: t(`type-of-operation.${TypeOfOperation.PILOTED}`),
                        value: TypeOfOperation.PILOTED,
                    },
                    {
                        label: t(`type-of-operation.${TypeOfOperation.REMOTE_PILOTED}`),
                        value: TypeOfOperation.REMOTE_PILOTED,
                    },
                ],
            },
            // Conflicts
            {
                type: "multiSelect",
                propertyName: "missionConflicts",
                propertyNameSerializer: () => "missionConflicts",
                displayName: t("Conflicts"),
                options: [
                    {
                        label: t(`mbStatus.${MissionConflict.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED}`),
                        value: MissionConflict.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS}`),
                        value: MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT}`),
                        value: MissionConflict.PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.AIRCRAFT_ASSIGNMENT_INCOMPLETE}`),
                        value: MissionConflict.AIRCRAFT_ASSIGNMENT_INCOMPLETE,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.PILOT_ASSIGNMENT_INCOMPLETE}`),
                        value: MissionConflict.PILOT_ASSIGNMENT_INCOMPLETE,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.AIRCRAFT_UNSERVICEABLE}`),
                        value: MissionConflict.AIRCRAFT_UNSERVICEABLE,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.AIRCRAFT_SERVICE_TYPE_INVALID}`),
                        value: MissionConflict.AIRCRAFT_SERVICE_TYPE_INVALID,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.BOOKINGS_EXCEED_SEAT_NUMBER}`),
                        value: MissionConflict.BOOKINGS_EXCEED_SEAT_NUMBER,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.VERTIPORT_DELETED}`),
                        value: MissionConflict.VERTIPORT_DELETED,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.WEATHER_OUT_OF_LIMITS}`),
                        value: MissionConflict.WEATHER_OUT_OF_LIMITS,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.NOTAMS_INCOMPLETE}`),
                        value: MissionConflict.NOTAMS_INCOMPLETE,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.ROUTE_OPTION_ASSIGNMENT_INCOMPLETE}`),
                        value: MissionConflict.ROUTE_OPTION_ASSIGNMENT_INCOMPLETE,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.ROUTE_OPTION_VALIDATION_INCOMPLETE}`),
                        value: MissionConflict.ROUTE_OPTION_VALIDATION_INCOMPLETE,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.PAD_ASSIGNMENT_INCOMPLETE}`),
                        value: MissionConflict.PAD_ASSIGNMENT_INCOMPLETE,
                    },
                    {
                        label: t(`mbStatus.${MissionConflict.MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN}`),
                        value: MissionConflict.MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN,
                    },
                ],
            },
            // Service
            {
                type: "select",
                propertyName: "service",
                propertyNameSerializer: () => "service",
                displayName: t("Service"),
                options: [
                    {
                        label: t(`service.${Service.TRAINING}`),
                        value: Service.TRAINING,
                    },
                    {
                        label: t(`service.${Service.FERRY_FLIGHT}`),
                        value: Service.FERRY_FLIGHT,
                    },
                    {
                        label: t(`service.${Service.PASSENGER}`),
                        value: Service.PASSENGER,
                    },
                    {
                        label: t(`service.${Service.CARGO}`),
                        value: Service.CARGO,
                    },
                    {
                        label: t(`service.${Service.TEST}`),
                        value: Service.TEST,
                    },
                ],
            },
            // Departure
            {
                type: "range",
                propertyName: "departureDateTime",
                propertyNameSerializer: () => "departureDateTime",
                displayName: t("Departure date"),
                fromLabel: t("datetime range filter.from"),
                toLabel: t("datetime range filter.to"),
            },
            // Arrival
            {
                type: "range",
                propertyName: "arrivalDateTime",
                propertyNameSerializer: () => "arrivalDateTime",
                displayName: t("Arrival date"),
                fromLabel: t("datetime range filter.from"),
                toLabel: t("datetime range filter.to"),
            },
            // Actual departure
            {
                type: "range",
                propertyName: "actualDepartureDateTime",
                propertyNameSerializer: () => "actualDepartureDateTime",
                displayName: t("Departure actual"),
                fromLabel: t("datetime range filter.from"),
                toLabel: t("datetime range filter.to"),
            },
            // Actual arrival
            {
                type: "range",
                propertyName: "actualArrivalDateTime",
                propertyNameSerializer: () => "actualArrivalDateTime",
                displayName: t("Arrival actual"),
                fromLabel: t("datetime range filter.from"),
                toLabel: t("datetime range filter.to"),
            },
        ];
    };

    return { buildFilters };
};
