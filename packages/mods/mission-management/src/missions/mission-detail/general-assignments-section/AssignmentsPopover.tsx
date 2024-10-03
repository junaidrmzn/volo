import { Box, Button, Divider, Icon, IconButton, Popover, Portal } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { AssignmetActionButtons } from "./AssignmetActionButtons";
import { AssignmentsPopoverState } from "./assignments-popover-context/AssignmentsPopoverContext";
import { useAssignmentsPopover } from "./assignments-popover-context/useAssignmentsPopover";

export type ActionsPopoverProps = {
    mission: Mission;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    type: AssignmentsPopoverState;
    onReloadList: () => void;
    onRedirectToResource?: () => void;
};

export const AssignmentsPopover = (props: ActionsPopoverProps) => {
    const {
        mission,
        isOpen: isPopoverOpen,
        onClose: onClosePopover,
        onOpen: onOpenPopover,
        type,
        onRedirectToResource,
    } = props;
    const { t } = useMissionTranslations();
    const { setAssignmentsPopoverState } = useAssignmentsPopover();

    const getStatusTranslationKey = (message: AssignmentsPopoverState) => {
        return match(message)
            .with("aircraft", () => t("popover.aircraft"))
            .with("pilot", () => t("popover.pilot"))
            .with("crewMember", () => t("popover.crewMember"))
            .with("fato", () => t("popover.fato"))
            .with("stand", () => t("popover.stand"))
            .exhaustive();
    };
    const popoverAriaLabel = getStatusTranslationKey(type);
    return (
        <Box
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <Popover isOpen={isPopoverOpen} onClose={onClosePopover} onOpen={onOpenPopover} placement="auto">
                {mission.statusOfMission !== StatusOfMission.CANCELLED && (
                    <Popover.Trigger>
                        <IconButton
                            onClick={() => setAssignmentsPopoverState(type)}
                            aria-label={popoverAriaLabel}
                            variant="ghost"
                            size="sm"
                        >
                            <Icon size={4} icon="ellipsis" />
                        </IconButton>
                    </Popover.Trigger>
                )}
                <Popover.Overlay />
                <Portal>
                    <Popover.Content>
                        <Popover.Header
                            closeButtonAriaLabel={t("buttons.close")}
                            title={t("missionAssignments.label")}
                        />
                        <Divider mb={4} />
                        <Popover.Body>
                            <AssignmetActionButtons {...props} onClosePopover={onClosePopover} />
                            {onRedirectToResource && (
                                <Button
                                    leftIcon={<Icon icon="internalLink" />}
                                    variant="ghost"
                                    size="lg"
                                    aria-label={t("FTL.goToResource")}
                                    onClick={onRedirectToResource}
                                >
                                    {t("FTL.goToResource")}
                                </Button>
                            )}
                        </Popover.Body>
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
