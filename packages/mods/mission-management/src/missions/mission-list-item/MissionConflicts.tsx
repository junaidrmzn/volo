import { Divider, Text, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { MissionConflict, MissionConflictType } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../translations/useMissionTranslations";

export type MissionConflictsProps = {
    conflicts: MissionConflictType[] | undefined;
};
export const MissionConflicts = (props: MissionConflictsProps) => {
    const { conflicts } = props;
    const { t } = useMissionTranslations();
    return conflicts && conflicts.length > 0 ? (
        <>
            <VStack alignItems="flex-start" mb={3}>
                <Text color="red.500" fontSize="xs">
                    {`${t("conflictDetected")}: `}
                    {conflicts
                        .map((missionConflict) =>
                            match(missionConflict)
                                .with(MissionConflict.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED, () =>
                                    t("mbStatus.TOTAL_TAKE_OFF_WEIGHT_EXCEEDED")
                                )
                                .with(MissionConflict.MASS_AND_BALANCE_OUT_OF_LIMITS, () =>
                                    t("mbStatus.MASS_AND_BALANCE_OUT_OF_LIMITS")
                                )
                                .with(MissionConflict.AIRCRAFT_ASSIGNMENT_INCOMPLETE, () =>
                                    t("mbStatus.AIRCRAFT_ASSIGNMENT_INCOMPLETE")
                                )
                                .with(MissionConflict.PILOT_ASSIGNMENT_INCOMPLETE, () =>
                                    t("mbStatus.PILOT_ASSIGNMENT_INCOMPLETE")
                                )
                                .with(MissionConflict.PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT, () =>
                                    t("mbStatus.PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT")
                                )
                                .with(MissionConflict.AIRCRAFT_UNSERVICEABLE, () =>
                                    t("mbStatus.AIRCRAFT_UNSERVICEABLE")
                                )
                                .with(MissionConflict.AIRCRAFT_SERVICE_TYPE_INVALID, () =>
                                    t("mbStatus.AIRCRAFT_SERVICE_TYPE_INVALID")
                                )
                                .with(MissionConflict.BOOKINGS_EXCEED_SEAT_NUMBER, () =>
                                    t("mbStatus.BOOKINGS_EXCEED_SEAT_NUMBER")
                                )
                                .with(MissionConflict.VERTIPORT_DELETED, () => t("mbStatus.VERTIPORT_DELETED"))
                                .with(MissionConflict.WEATHER_OUT_OF_LIMITS, () => t("mbStatus.WEATHER_OUT_OF_LIMITS"))
                                .with(MissionConflict.NOTAMS_INCOMPLETE, () => t("mbStatus.NOTAMS_INCOMPLETE"))
                                .with(MissionConflict.ROUTE_OPTION_ASSIGNMENT_INCOMPLETE, () =>
                                    t("mbStatus.ROUTE_OPTION_ASSIGNMENT_INCOMPLETE")
                                )
                                .with(MissionConflict.ROUTE_OPTION_VALIDATION_INCOMPLETE, () =>
                                    t("mbStatus.ROUTE_OPTION_VALIDATION_INCOMPLETE")
                                )
                                .with(MissionConflict.PAD_ASSIGNMENT_INCOMPLETE, () =>
                                    t("mbStatus.PAD_ASSIGNMENT_INCOMPLETE")
                                )
                                .with(MissionConflict.MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN, () =>
                                    t("mbStatus.MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN")
                                )
                                .with(MissionConflict.UNKNOWN, () => t("mbStatus.UNKNOWN"))
                                .exhaustive()
                        )
                        .join(", ")}
                </Text>
            </VStack>
            <Divider />
        </>
    ) : null;
};
