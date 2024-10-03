import type { Property } from "@volocopter/filter-react";
import { Service, StatusOfMission, TypeOfOperation } from "@voloiq-typescript-api/network-scheduling-types";
import { MissionConflict } from "@voloiq/network-schedule-management-api/v1";
import {
    useGetAllAircraftTypes,
    useGetAllAircrafts,
    useGetAllRegions,
    useGetAllVertiports,
} from "../../api-hooks/useNetworkSchedulingService";
import { useScheduledMissionFilterTranslation } from "./translations/useScheduledMissionFilterTranslation";

export const useScheduledMissionsFilterPropterties = () => {
    const { t } = useScheduledMissionFilterTranslation();
    const { data: aircraftTypes } = useGetAllAircraftTypes(1, 100);
    const { data: aircrafts } = useGetAllAircrafts(1, 100);

    const { data: regions } = useGetAllRegions();
    const { data: vertiports } = useGetAllVertiports();

    const properties: Property[] = [
        // Flight number
        {
            type: "text",
            propertyName: "flightNumber",
            label: t("filterPanel.flightNumber"),
            group: t("filterPanel.filters"),
        },
        // Status
        {
            type: "select-multiple",
            propertyName: "statusOfMission",
            label: t("filterPanel.missionStatus.caption"),
            options: [
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.PLANNED}`),
                    value: StatusOfMission.PLANNED,
                },
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.CANCELLED}`),
                    value: StatusOfMission.CANCELLED,
                },
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.BOARDING}`),
                    value: StatusOfMission.BOARDING,
                },
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.FLYING}`),
                    value: StatusOfMission.FLYING,
                },
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.DIVERTED}`),
                    value: StatusOfMission.DIVERTED,
                },
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.PERFORMED}`),
                    value: StatusOfMission.PERFORMED,
                },
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.CLOSED}`),
                    value: StatusOfMission.CLOSED,
                },
                {
                    label: t(`filterPanel.missionStatus.${StatusOfMission.UNKNOWN}`),
                    value: StatusOfMission.UNKNOWN,
                },
            ],
            group: t("filterPanel.filters"),
        },
        // Type of operation
        {
            type: "select",
            propertyName: "typeOfOperation",
            label: t("filterPanel.typeOfOperation.caption"),
            options: [
                {
                    label: t(`filterPanel.typeOfOperation.${TypeOfOperation.PILOTED}`),
                    value: TypeOfOperation.PILOTED,
                },
                {
                    label: t(`filterPanel.typeOfOperation.${TypeOfOperation.REMOTE_PILOTED}`),
                    value: TypeOfOperation.REMOTE_PILOTED,
                },
            ],
            group: t("filterPanel.filters"),
        },
        // Conflicts
        {
            type: "select-multiple",
            propertyName: "missionConflicts",
            label: t("filterPanel.mbStatus.caption"),
            options: [
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED}`),
                    value: MissionConflict.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS}`),
                    value: MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT}`),
                    value: MissionConflict.PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.AIRCRAFT_ASSIGNMENT_INCOMPLETE}`),
                    value: MissionConflict.AIRCRAFT_ASSIGNMENT_INCOMPLETE,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.PILOT_ASSIGNMENT_INCOMPLETE}`),
                    value: MissionConflict.PILOT_ASSIGNMENT_INCOMPLETE,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.AIRCRAFT_UNSERVICEABLE}`),
                    value: MissionConflict.AIRCRAFT_UNSERVICEABLE,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.AIRCRAFT_SERVICE_TYPE_INVALID}`),
                    value: MissionConflict.AIRCRAFT_SERVICE_TYPE_INVALID,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.BOOKINGS_EXCEED_SEAT_NUMBER}`),
                    value: MissionConflict.BOOKINGS_EXCEED_SEAT_NUMBER,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.VERTIPORT_DELETED}`),
                    value: MissionConflict.VERTIPORT_DELETED,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.WEATHER_OUT_OF_LIMITS}`),
                    value: MissionConflict.WEATHER_OUT_OF_LIMITS,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.NOTAMS_INCOMPLETE}`),
                    value: MissionConflict.NOTAMS_INCOMPLETE,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.ROUTE_OPTION_ASSIGNMENT_INCOMPLETE}`),
                    value: MissionConflict.ROUTE_OPTION_ASSIGNMENT_INCOMPLETE,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.ROUTE_OPTION_VALIDATION_INCOMPLETE}`),
                    value: MissionConflict.ROUTE_OPTION_VALIDATION_INCOMPLETE,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.PAD_ASSIGNMENT_INCOMPLETE}`),
                    value: MissionConflict.PAD_ASSIGNMENT_INCOMPLETE,
                },
                {
                    label: t(`filterPanel.mbStatus.${MissionConflict.MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN}`),
                    value: MissionConflict.MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN,
                },
            ],
            group: t("filterPanel.filters"),
        },
        // Service
        {
            type: "select",
            propertyName: "service",
            label: t("filterPanel.service.caption"),
            options: [
                {
                    label: t(`filterPanel.service.${Service.TRAINING}`),
                    value: Service.TRAINING,
                },
                {
                    label: t(`filterPanel.service.${Service.FERRY_FLIGHT}`),
                    value: Service.FERRY_FLIGHT,
                },
                {
                    label: t(`filterPanel.service.${Service.PASSENGER}`),
                    value: Service.PASSENGER,
                },
                {
                    label: t(`filterPanel.service.${Service.CARGO}`),
                    value: Service.CARGO,
                },
                {
                    label: t(`filterPanel.service.${Service.TEST}`),
                    value: Service.TEST,
                },
            ],
            group: t("filterPanel.filters"),
        },
        // Departure
        {
            type: "date-range",
            propertyName: "departureDateTime",
            label: t("filterPanel.departureDate"),
            minLabel: t("filterPanel.from"),
            maxLabel: t("filterPanel.to"),
            group: t("filterPanel.filters"),
        },
        // Arrival
        {
            type: "date-range",
            propertyName: "arrivalDateTime",
            label: t("filterPanel.arrivalDate"),
            minLabel: t("filterPanel.from"),
            maxLabel: t("filterPanel.to"),
            group: t("filterPanel.filters"),
        },
        // Actual departure
        {
            type: "date-range",
            propertyName: "actualDepartureDateTime",
            label: t("filterPanel.departureActual"),
            minLabel: t("filterPanel.from"),
            maxLabel: t("filterPanel.to"),
            group: t("filterPanel.filters"),
        },
        // Actual arrival
        {
            type: "date-range",
            propertyName: "actualArrivalDateTime",
            label: t("filterPanel.arrivalActual"),
            minLabel: t("filterPanel.from"),
            maxLabel: t("filterPanel.to"),
            group: t("filterPanel.filters"),
        },
        {
            type: "select",
            propertyName: "aircraftId",
            propertyNameSerializer: () => "mission.missionAircraftAssignmentEntity.aircraftEntity.id",
            options: aircrafts?.map((aircraft) => ({
                label: `${aircraft.msn}${aircraft.registration ? ` - ${aircraft.registration}` : ""}`,
                value: aircraft.id,
            })),
            label: t("filterPanel.aircraft"),
            group: t("filterPanel.filters"),
        },
        {
            type: "select",
            propertyName: "aircraftTypeId",
            propertyNameSerializer: () => "mission.missionAircraftAssignmentEntity.aircraftEntity.aircraftTypeId",
            options: aircraftTypes?.map((aircraftType) => ({
                label: aircraftType.name,
                value: aircraftType.id,
            })),
            label: t("filterPanel.aircraftType"),
            group: t("filterPanel.filters"),
        },
        {
            type: "text",
            propertyName: "pilotEmail",
            propertyNameSerializer: () => "mission.pilotAssignmentEntity.crewMemberEntity.email",
            label: t("filterPanel.pilotEmail"),
            group: t("filterPanel.filters"),
        },
        {
            type: "text",
            propertyName: "departureVertiportCode",
            propertyNameSerializer: () => "mission.scheduledDepartureVertiportEntity.code",
            label: t("filterPanel.departureVertiportCode"),
            group: t("filterPanel.filters"),
        },
        {
            type: "text",
            propertyName: "arrivalVertiportCode",
            propertyNameSerializer: () => "mission.scheduledArrivalVertiportEntity.code",
            label: t("filterPanel.arrivalVertiportCode"),
            group: t("filterPanel.filters"),
        },
        {
            type: "text",
            propertyName: "leonServiceId",
            label: t("filterPanel.leonId"),
            group: t("filterPanel.filters"),
        },
        {
            type: "select",
            propertyName: "departureVertiportId",
            options: vertiports?.map((vertiport) => ({
                label: vertiport.name,
                value: vertiport.id,
            })),
            group: t("filterPanel.filters"),
            label: t("filterPanel.departureVertiport"),
        },
        {
            type: "select",
            propertyName: "arrivalVertiportId",
            options: vertiports?.map((vertiport) => ({
                label: vertiport.name,
                value: vertiport.id,
            })),
            group: t("filterPanel.filters"),
            label: t("filterPanel.arrivalVertiport"),
        },
        {
            type: "select",
            propertyName: "departureRegionId",
            options: regions?.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            group: t("filterPanel.filters"),
            label: t("filterPanel.departureRegion"),
        },
        {
            type: "select",
            propertyName: "arrivalRegionId",
            options: regions?.map((region) => ({
                label: region.name,
                value: region.id,
            })),
            group: t("filterPanel.filters"),
            label: t("filterPanel.arrivalRegion"),
        },
    ];

    return { properties };
};
