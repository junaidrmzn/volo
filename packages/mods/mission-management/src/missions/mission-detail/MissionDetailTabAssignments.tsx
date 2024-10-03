import { Divider, VStack } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq-typescript-api/network-scheduling-types";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { SectionHeader, TextWithLabel } from "@voloiq/text-layouts";
import { MissionConflicts } from "../mission-list-item/MissionConflicts";
import { getPilotName } from "../mission-list-item/getPilotName";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { MissionTimeScheduler } from "./MissionTimeScheduler";
import { MissionTimeSchedulerOld } from "./MissionTimeSchedulerOld";

type MissionDetailTabAssignmentsProps = {
    mission: Mission;
    routeOption: RouteOption | undefined;
};
export const MissionDetailTabAssignments = (props: MissionDetailTabAssignmentsProps) => {
    const { mission, routeOption } = props;
    const { missionConflicts, assignments } = mission;
    const assignedPilot = {
        pilotFirstName: assignments?.pilotFirstName,
        pilotMiddleName: assignments?.pilotMiddleName,
        pilotSurName: assignments?.pilotSurName,
    };
    const { t } = useMissionTranslations();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <>
            <Divider mb={3} mt={4} />
            <MissionConflicts conflicts={missionConflicts} />
            {isFeatureFlagEnabled("vao-1889-timegrid-2.0") ? (
                <MissionTimeScheduler mission={mission} />
            ) : (
                <MissionTimeSchedulerOld mission={mission} />
            )}
            <SectionHeader label={t("departureArrival")} mt={6} mb={3} />
            <VStack width="50%" alignItems="stretch" spacing={4}>
                <TextWithLabel
                    size="small"
                    label={t("assignedPilot")}
                    text={assignments?.pilotId ? getPilotName(assignedPilot) : t("noAssignment")}
                />
                {assignments?.crewMemberAssignments && assignments?.crewMemberAssignments?.length > 0 && (
                    <TextWithLabel
                        size="small"
                        label={t("assignedCrewMembers")}
                        text={assignments?.crewMemberAssignments
                            .map((crewMember) => {
                                return `${crewMember.firstName} ${crewMember.surName} - ${crewMember.crewMemberRole}`;
                            })
                            .join(", ")}
                    />
                )}
                {routeOption && routeOption.name !== "" && (
                    <TextWithLabel size="small" label={t("RouteOption")} text={routeOption.name} />
                )}
                <TextWithLabel
                    size="small"
                    label={t("assignedAircraft")}
                    text={
                        assignments?.aircraftId
                            ? `${assignments?.aircraftTypeName} - MSN ${assignments?.aircraftMSN}${
                                  assignments?.aircraftRegistration ? ` - ${assignments?.aircraftRegistration}` : ""
                              }`
                            : t("noAssignment")
                    }
                />
                <TextWithLabel size="small" label={t("assignedBattery")} text={assignments?.batteryName} />
            </VStack>
        </>
    );
};
