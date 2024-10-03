import { Icon, IconButton, VStack } from "@volocopter/design-library-react";
import { ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { ActionsPopoverProvider } from "../../missions/mission-list-item/mission-actions-popover/popover-context/ActionsPopoverProvider";
import { useScheduledMissionTranslation } from "../translations/useScheduledMissionTranslation";
import { ScheduledMissionActionsPopover } from "./scheduled-mission-actions-popover/ScheduledMissionActionsPopover";

type ScheduledMissionActionsProps = {
    mission: ShortInfoMission;
};

export const ScheduledMissionActions = (props: ScheduledMissionActionsProps) => {
    const { mission } = props;
    const navigation = useNavigate();

    const { t } = useScheduledMissionTranslation();

    return (
        <VStack h="full" w="full" justifyContent="space-between">
            <ActionsPopoverProvider>
                <ScheduledMissionActionsPopover mission={mission} />
            </ActionsPopoverProvider>
            <IconButton
                aria-label={t("actions.missionDetails")}
                variant="ghost"
                onClick={() => {
                    navigation(`/air-operations/mission-management/missions/overview/${mission.missionId}`);
                }}
                size="sm"
            >
                <Icon icon="chevronRight" size={5} />
            </IconButton>
        </VStack>
    );
};
