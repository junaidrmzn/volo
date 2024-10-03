import { Button, Icon } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { AddButton } from "../add-button/AddButton";
import { EditButton } from "../edit-button/EditButton";
import { useModalTriggerButtonTranslation } from "./translations/useModalTriggerButtonTranslation";

export type ModalTriggerButtonProps = {
    triggerType: "iconButton" | "secondaryButton";
    operationType: "add" | "edit";
    resourceName?: string;
    addTypeText?: string;
    editTypeText?: string;
    onClick: () => void;
};

export const ModalTriggerButton = (props: ModalTriggerButtonProps) => {
    const { t } = useModalTriggerButtonTranslation();
    const { triggerType, operationType, onClick, resourceName = t("Item"), addTypeText, editTypeText } = props;
    const buttonText =
        operationType === "add"
            ? addTypeText || `${t("Add")} ${resourceName}`
            : editTypeText || `${t("Edit")} ${resourceName}`;

    return match(triggerType)
        .with("iconButton", () =>
            operationType === "add" ? (
                <AddButton onClick={onClick} resourceName={resourceName} />
            ) : (
                <EditButton onClick={onClick} resourceName={resourceName} />
            )
        )
        .with("secondaryButton", () => (
            <Button leftIcon={<Icon icon="plus" size={4} />} width="full" onClick={onClick}>
                {buttonText}
            </Button>
        ))
        .exhaustive();
};
