import { Button, Icon, Text, VStack } from "@volocopter/design-library-react";
import type { PadEvent } from "@voloiq/vertiport-management-api/v1";
import { useErrorToastWithMessage } from "../../../../../../hooks/useErrorToast";
import { useVertiportTranslation } from "../../../../../../translations/useVertiportTranslation";
import { usePadEvents } from "../../../pad-card-list/pad-actions-popover/pad-events/pad-events-context/usePadEvents";
import { useActionsPopover } from "../popover-context/useActionsPopover";

export type DeletePadEventConfirmationPromptProps = {
    padEvent: PadEvent;
};

export const DeletePadEventConfirmationPrompt = (props: DeletePadEventConfirmationPromptProps) => {
    const {
        padEvent: { id: padEventId, title },
    } = props;
    const { t } = useVertiportTranslation();
    const { onClosePopover } = useActionsPopover();
    const { deletePadEvent } = usePadEvents();
    const { onError } = useErrorToastWithMessage();

    return (
        <VStack alignItems="flex-end">
            <Text>{t("fatoStandEvent.delete.message", { title })}</Text>
            <Button
                type="submit"
                leftIcon={<Icon icon="delete" size={4} />}
                size="lg"
                variant="primary"
                onClick={async () => {
                    await deletePadEvent({ padEventId })
                        .then(() => {
                            onClosePopover();
                        })
                        .catch((error) => {
                            onError(error);
                        });
                }}
            >
                {t("buttons.delete")}
            </Button>
        </VStack>
    );
};
