import { Button, Icon, VStack } from "@volocopter/design-library-react";
import { useVertiportTranslation } from "../../../../../translations/useVertiportTranslation";
import { useActionsPopover } from "./popover-context/useActionsPopover";

export const ActionButtons = () => {
    const { setActionsPopoverState } = useActionsPopover();
    const { t } = useVertiportTranslation();

    return (
        <VStack spacing={3} alignItems="start">
            <Button
                leftIcon={<Icon icon="delete" />}
                variant="ghost"
                size="lg"
                onClick={() => setActionsPopoverState("delete")}
            >
                {t("fatoStandEvent.actions.deleteEvent")}
            </Button>
        </VStack>
    );
};
