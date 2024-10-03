import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { useActionsPopover } from "./popover-context/useActionsPopover";
import { RouteOptionAssignmentModal } from "./route-option-assignment/RouteOptionAssignmentModal";

type RouteOptionsButtonProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const RouteOptionsButton = (props: RouteOptionsButtonProps) => {
    const { mission, onReloadList } = props;
    const { onClosePopover } = useActionsPopover();

    const { t } = useMissionTranslations();

    const {
        isOpen: isRouteOptionAssignmentModalOpen,
        onClose: onCloseRouteOptionAssignmentModal,
        onOpen: onOpenRouteOptionAssignmentModal,
    } = useDisclosure();

    return (
        <>
            <Button
                leftIcon={<Icon icon="curvedArrowRight" />}
                variant="ghost"
                size="lg"
                onClick={() => {
                    onOpenRouteOptionAssignmentModal();
                    onClosePopover();
                }}
            >
                {t("missionActions.assignRouteOption")}
            </Button>
            <RouteOptionAssignmentModal
                mission={mission}
                onReloadList={onReloadList}
                isOpen={isRouteOptionAssignmentModalOpen}
                onClose={onCloseRouteOptionAssignmentModal}
            />
        </>
    );
};
