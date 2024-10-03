import { Box, Divider, Icon, IconButton, Popover, Portal, VStack } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { ArrivalPadActionButtons } from "../../../mission-list-item/mission-actions-popover/ArrivalPadActionButtons";
import { DeparturePadActionButtons } from "../../../mission-list-item/mission-actions-popover/DeparturePadActionButtons";
import { ActionsPopoverProvider } from "../../../mission-list-item/mission-actions-popover/popover-context/ActionsPopoverProvider";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

type ActionsPopoverState = "departurePad" | "arrivalPad";
type PadAssignmentPopoverProps = {
    mission: Mission;
    onReloadList: () => void;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    type: ActionsPopoverState;
};

export const PadAssignmentPopover = (props: PadAssignmentPopoverProps) => {
    const { onReloadList, isOpen, onClose, onOpen, mission, type } = props;
    const { t } = useMissionTranslations();
    return (
        <Box>
            <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="auto">
                {mission.statusOfMission !== StatusOfMission.CANCELLED && (
                    <Popover.Trigger>
                        <IconButton aria-label={t("popover.groundOps")} variant="ghost" size="sm">
                            <Icon icon="ellipsis" size={4} />
                        </IconButton>
                    </Popover.Trigger>
                )}
                <Popover.Overlay />
                <Portal>
                    <Popover.Content>
                        <Popover.Header closeButtonAriaLabel={t("buttons.close")} title={t("missionActions.label")} />
                        <Divider mb={4} />
                        <Popover.Body>
                            <VStack alignItems="start">
                                <ActionsPopoverProvider>
                                    {match(type)
                                        .with("departurePad", () => (
                                            <DeparturePadActionButtons mission={mission} onReloadList={onReloadList} />
                                        ))
                                        .with("arrivalPad", () => (
                                            <ArrivalPadActionButtons mission={mission} onReloadList={onReloadList} />
                                        ))
                                        .exhaustive()}
                                </ActionsPopoverProvider>
                            </VStack>
                        </Popover.Body>
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
