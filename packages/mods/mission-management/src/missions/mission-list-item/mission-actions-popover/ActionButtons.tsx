import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import { Service, StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { AcceptMissionButton } from "./AcceptMissionButton";
import { DivertMissionButton } from "./DivertMissionButton";
import { PadActionButtons } from "./PadActionButtons";
import { RouteOptionsButton } from "./RouteOptionsButton";
import { UpdateScheduleButton } from "./UpdateScheduleButton";
import { MissionAircraftAssignmentModal } from "./aircraft-assignment/MissionAircraftAssignmentModal";
import { canCreateOperationFlightPlanning } from "./canCreateOperationFlightPlanning";
import { TestCrewAssignmentModal } from "./crew-assignment/TestCrewAssignmentModal";
import { MissionPilotAssignmentModal } from "./pilot-assignment/MissionPilotAssignmentModal";
import { useActionsPopover } from "./popover-context/useActionsPopover";

type ActionButtonsProps = {
    mission: Mission;
    onReloadList: () => void;
};

const createIqsmsUrl = () => window.open("https://volocopter.asqs.net/modules/sms/main/sms_enter_report.php", "_blank");

export const ActionButtons = (props: ActionButtonsProps) => {
    const { mission, onReloadList } = props;
    const { setActionsPopoverState } = useActionsPopover();
    const { t } = useMissionTranslations();
    const canDelete = useIsAuthorizedTo(["delete"], ["Mission"]);
    const navigate = useNavigate();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const {
        isOpen: isAircraftAssignmentModalOpen,
        onClose: onCloseAircraftAssignmentModal,
        onOpen: onOpenAircraftAssignmentModal,
    } = useDisclosure();
    const {
        isOpen: isPilotAssignmentModalOpen,
        onClose: onClosePilotAssignmentModal,
        onOpen: onOpenPilotAssignmentModal,
    } = useDisclosure();
    const {
        isOpen: isCrewAssignmentModalOpen,
        onClose: onCloseCrewAssignmentModal,
        onOpen: onOpenCrewAssignmentModal,
    } = useDisclosure();

    const { onClosePopover } = useActionsPopover();

    return (
        <>
            <VStack
                spacing={3}
                alignItems="start"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {mission.statusOfMission !== StatusOfMission.CANCELLED && (
                    <Button
                        leftIcon={<Icon icon="aircraft" />}
                        variant="ghost"
                        size="lg"
                        aria-label={t("missionActions.assignAircraft")}
                        onClick={() => {
                            onOpenAircraftAssignmentModal();
                            onClosePopover();
                        }}
                    >
                        {mission.assignments?.aircraftId
                            ? t("missionActions.reassignAircraft")
                            : t("missionActions.assignAircraft")}
                    </Button>
                )}
                {mission.assignments?.aircraftId && (
                    <Button
                        leftIcon={<Icon icon="pilot" />}
                        variant="ghost"
                        size="lg"
                        onClick={() => {
                            onOpenPilotAssignmentModal();
                            onClosePopover();
                        }}
                    >
                        {mission.assignments?.pilotId
                            ? t("missionActions.reassignPilot")
                            : t("missionActions.assignPilot")}
                    </Button>
                )}
                {mission.service === Service.TEST && mission.assignments?.pilotId && (
                    <Button
                        leftIcon={<Icon icon="user" />}
                        variant="ghost"
                        size="lg"
                        onClick={() => {
                            onOpenCrewAssignmentModal();
                            onClosePopover();
                        }}
                    >
                        {t("missionActions.assignCrew")}
                    </Button>
                )}
                <DivertMissionButton {...props} />
                <AcceptMissionButton {...props} />
                {mission.statusOfMission !== StatusOfMission.CANCELLED && <UpdateScheduleButton {...props} />}
                {canCreateOperationFlightPlanning(mission) && (
                    <Button
                        leftIcon={<Icon icon="internalLink" />}
                        variant="ghost"
                        size="lg"
                        onClick={() => navigate(`/flight-planning/missions/${mission.id}`)}
                    >
                        {t("missionActions.fileFlightPlan")}
                    </Button>
                )}
                {mission.statusOfMission !== StatusOfMission.CANCELLED &&
                    mission.statusOfMission !== StatusOfMission.FLYING && (
                        <RouteOptionsButton mission={mission} onReloadList={onReloadList} />
                    )}

                {mission.statusOfMission !== StatusOfMission.CANCELLED && (
                    <PadActionButtons mission={mission} onReloadList={onReloadList} />
                )}
                {isFeatureFlagEnabled("vao-1741") && (
                    <Button
                        leftIcon={<Icon icon="curvedArrowRight" />}
                        variant="ghost"
                        size="lg"
                        onClick={createIqsmsUrl}
                    >
                        {t("missionActions.createIqsms")}
                    </Button>
                )}
                {canDelete && mission.statusOfMission !== StatusOfMission.CANCELLED && (
                    <Button
                        leftIcon={<Icon icon="cancel" />}
                        variant="ghost"
                        size="lg"
                        onClick={() => setActionsPopoverState("cancel")}
                    >
                        {t("missionActions.cancel")}
                    </Button>
                )}
            </VStack>
            <MissionAircraftAssignmentModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isAircraftAssignmentModalOpen}
                onClose={onCloseAircraftAssignmentModal}
            />
            <MissionPilotAssignmentModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isPilotAssignmentModalOpen}
                onClose={onClosePilotAssignmentModal}
            />
            <TestCrewAssignmentModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isCrewAssignmentModalOpen}
                onClose={onCloseCrewAssignmentModal}
            />
        </>
    );
};
