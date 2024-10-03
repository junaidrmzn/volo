import { Button, Icon, Text, VStack } from "@volocopter/design-library-react";
import type { Pad } from "@voloiq/vertiport-management-api/v1";
import { useErrorToastWithMessage } from "../../../../../../hooks/useErrorToast";
import { useVertiportTranslation } from "../../../../../../translations/useVertiportTranslation";
import { usePads } from "../../../pads-context/usePads";
import { useActionsPopover } from "../popover-context/useActionsPopover";

export type DeletePadConfirmationPromptProps = {
    pad: Pad;
};

export const DeletePadConfirmationPrompt = (props: DeletePadConfirmationPromptProps) => {
    const {
        pad: { id: padId, padKey },
    } = props;
    const { t } = useVertiportTranslation();
    const { onClosePopover } = useActionsPopover();
    const { deletePad } = usePads();
    const { onError } = useErrorToastWithMessage();

    return (
        <VStack alignItems="flex-end">
            <Text>{t("fatoStand.delete.message", { padKey })}</Text>
            <Button
                type="submit"
                leftIcon={<Icon icon="delete" size={4} />}
                size="lg"
                variant="primary"
                onClick={async () => {
                    await deletePad({ padId })
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
