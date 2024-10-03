import { Button, Icon } from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceDeleteTranslations } from "./translations/useResourceDeleteTranslations";

export const DeleteButton = () => {
    const [state, send] = useGlobalState();

    const {
        meta: {
            delete: { getDeleteTexts },
        },
        context: { selectedResource },
    } = state;
    const { t } = useResourceDeleteTranslations();
    const { deleteButtonText = t("Delete") } = getDeleteTexts(selectedResource);
    const onClick = () => send({ type: "DELETE", selectedResourceId: state.context.selectedResourceId });

    return (
        <Button variant="ghost" size="lg" leftIcon={<Icon icon="delete" />} onClick={onClick}>
            {deleteButtonText}
        </Button>
    );
};
