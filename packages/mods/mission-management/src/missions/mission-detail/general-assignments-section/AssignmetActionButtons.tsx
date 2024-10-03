import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { MissionAircraftAssignmentModal } from "../../mission-list-item/mission-actions-popover/aircraft-assignment/MissionAircraftAssignmentModal";
import { TestCrewAssignmentModal } from "../../mission-list-item/mission-actions-popover/crew-assignment/TestCrewAssignmentModal";
import { MissionPilotAssignmentModal } from "../../mission-list-item/mission-actions-popover/pilot-assignment/MissionPilotAssignmentModal";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { useAssignmentsPopover } from "./assignments-popover-context/useAssignmentsPopover";

type AssignmentsActionButtonsProps = {
    mission: Mission;
    onReloadList: () => void;
    onClosePopover: () => void;
};

export const AssignmetActionButtons = (props: AssignmentsActionButtonsProps) => {
    const { mission, onReloadList, onClosePopover } = props;
    const { assignmentsPopoverState } = useAssignmentsPopover();
    const { t } = useMissionTranslations();
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

    return (
        <>
            <VStack
                spacing={3}
                alignItems="start"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {match(assignmentsPopoverState)
                    .with("aircraft", () => (
                        <Button
                            leftIcon={<Icon icon="aircraft" />}
                            variant="ghost"
                            size="lg"
                            aria-label={t("missionAssignments.assignAircraft")}
                            onClick={() => {
                                onOpenAircraftAssignmentModal();
                                onClosePopover();
                            }}
                        >
                            {mission.assignments?.aircraftId
                                ? t("missionAssignments.reassignAircraft")
                                : t("missionAssignments.assignAircraft")}
                        </Button>
                    ))

                    .with("pilot", () => (
                        <Button
                            leftIcon={<Icon icon="pilot" />}
                            variant="ghost"
                            size="lg"
                            aria-label={t("missionAssignments.assignPilot")}
                            onClick={() => {
                                onOpenPilotAssignmentModal();
                                onClosePopover();
                            }}
                        >
                            {mission.assignments?.pilotId
                                ? t("missionAssignments.reassignPilot")
                                : t("missionAssignments.assignPilot")}
                        </Button>
                    ))
                    .with("crewMember", () => (
                        <Button
                            leftIcon={<Icon icon="pilot" />}
                            variant="ghost"
                            size="lg"
                            aria-label={t("missionAssignments.assignCrew")}
                            onClick={() => {
                                onOpenCrewAssignmentModal();
                                onClosePopover();
                            }}
                        >
                            {t("missionAssignments.assignCrew")}
                        </Button>
                    ))
                    .with("fato", () => (
                        <>
                            <Button
                                leftIcon={<Icon icon="infoLight" />}
                                variant="ghost"
                                size="lg"
                                aria-label={t("missionAssignments.assignFato")}
                                onClick={() => {}}
                            >
                                {mission.scheduledArrivalFatoId
                                    ? t("missionAssignments.reassignFato")
                                    : t("missionAssignments.assignFato")}
                            </Button>
                            <Button leftIcon={<Icon icon="cancel" />} variant="ghost" size="lg">
                                {t("missionAssignments.unassignFato")}
                            </Button>
                        </>
                    ))
                    .with("stand", () => (
                        <>
                            <Button
                                leftIcon={<Icon icon="aircraft" />}
                                variant="ghost"
                                size="lg"
                                aria-label={t("missionAssignments.assignStand")}
                                onClick={() => {}}
                            >
                                {mission.scheduledArrivalStandId
                                    ? t("missionAssignments.reassignStand")
                                    : t("missionAssignments.assignStand")}
                            </Button>
                            <Button leftIcon={<Icon icon="cancel" />} variant="ghost" size="lg">
                                {t("missionAssignments.unassignStand")}
                            </Button>
                        </>
                    ))
                    .exhaustive()}
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
