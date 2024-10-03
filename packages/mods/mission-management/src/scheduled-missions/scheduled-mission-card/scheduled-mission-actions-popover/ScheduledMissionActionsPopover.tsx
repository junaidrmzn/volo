import {
    Box,
    Divider,
    EmptyState,
    HStack,
    Icon,
    IconButton,
    Popover,
    Portal,
    Spinner,
} from "@volocopter/design-library-react";
import { ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { ActionsPopoverBody } from "../../../missions/mission-list-item/mission-actions-popover/ActionsPopoverBody";
import { ActionsPopoverHeader } from "../../../missions/mission-list-item/mission-actions-popover/ActionsPopoverHeader";
import { useScheduledMissionTranslation } from "../../translations/useScheduledMissionTranslation";
import { useScheduledMissionActionsPopover } from "./useScheduledMissionActionsPopover";

type ScheduledMissionActionsPopoverProps = {
    mission: ShortInfoMission;
};

export const ScheduledMissionActionsPopover = (props: ScheduledMissionActionsPopoverProps) => {
    const { mission } = props;
    const { t } = useScheduledMissionTranslation();
    const {
        data: missionData,
        refetchData,
        state,
    } = useScheduledMissionActionsPopover({
        missionId: mission.missionId,
        manual: true,
    });

    return (
        <Box
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <Popover placement="auto">
                <Popover.Trigger>
                    <IconButton
                        onClick={() => refetchData()}
                        aria-label="missionActions.label"
                        variant="ghost"
                        size="sm"
                    >
                        <Icon icon="ellipsis" size={5} />
                    </IconButton>
                </Popover.Trigger>
                <Popover.Overlay />
                <Portal>
                    <Popover.Content>
                        {state === "success" || state === "error" ? (
                            missionData ? (
                                <>
                                    <ActionsPopoverHeader mission={missionData} />
                                    <Divider mb={4} />
                                    <ActionsPopoverBody mission={missionData} onReloadList={refetchData} />
                                </>
                            ) : (
                                <Box>
                                    <Popover.Header
                                        title={t("missionActions.headerLabel")}
                                        closeButtonAriaLabel={t("missionActions.closeButtonAriaLabel")}
                                    />
                                    <EmptyState
                                        title={t("missionActions.title")}
                                        description={t("missionActions.emptyList", {
                                            flightNumber: mission.flightNumber,
                                        })}
                                    />
                                </Box>
                            )
                        ) : (
                            <Box>
                                <Popover.Header
                                    title={t("missionActions.headerLabel")}
                                    closeButtonAriaLabel={t("missionActions.closeButtonAriaLabel")}
                                />
                                <HStack mt={10} alignItems="center" justifyContent="center">
                                    <Spinner />
                                </HStack>
                            </Box>
                        )}
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
