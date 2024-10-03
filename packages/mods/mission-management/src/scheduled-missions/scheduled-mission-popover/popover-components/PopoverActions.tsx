import { Icon, IconButton, VStack } from "@volocopter/design-library-react";
import { ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";

export type PopoverActionsProps = {
    mission: ShortInfoMission;
};

export const PopoverActions = (props: PopoverActionsProps) => {
    const { mission } = props;
    const navigation = useNavigate();

    return (
        <VStack py={3} pr={3} justifyContent="space-between">
            <IconButton aria-label="actions.actionsPopover" variant="ghost" size="sm">
                <Icon icon="ellipsis" size={6} />
            </IconButton>
            <IconButton
                size="sm"
                aria-label="actions.missionDetails"
                variant="ghost"
                onClick={() => {
                    navigation(`/air-operations/mission-management/missions/overview/${mission.missionId}`);
                }}
            >
                <Icon icon="chevronRight" />
            </IconButton>
        </VStack>
    );
};
