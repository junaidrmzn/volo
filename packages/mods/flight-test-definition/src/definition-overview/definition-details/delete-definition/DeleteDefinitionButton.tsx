import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { useDeleteDefinition } from "@voloiq/flight-test-definition-api/v1";
import { ConfirmationModal } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { useDefinitionEditSessionId } from "../definition-edit-session-id-context/useDefinitionEditSessionId";
import { useDeleteDefinitionTranslation } from "./translations/useDeleteDefinitionTranslation";

export type DeleteDefinitionButtonProps = {
    definitionId: string;
};

export const DeleteDefinitionButton = (props: DeleteDefinitionButtonProps) => {
    const { definitionId } = props;
    const { t } = useDeleteDefinitionTranslation();
    const {
        isOpen: isConfirmationModalOpen,
        onOpen: onOpenConfirmationModal,
        onClose: onCloseConfirmationModal,
    } = useDisclosure();

    const { deleteDefinition } = useDeleteDefinition();
    const { definitionEditSessionId } = useDefinitionEditSessionId();
    const navigate = useNavigate();

    return (
        <>
            <Button
                leftIcon={<Icon size={4} icon="delete" />}
                variant="secondary"
                size="sm"
                onClick={onOpenConfirmationModal}
            >
                {t("Delete")}
            </Button>
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={onCloseConfirmationModal}
                title={t("Definition")}
                type={t("Delete")}
                message={t("Are you sure you want to permanently delete this definition?")}
                cancelButtonText={t("Cancel")}
                confirmButtonText={t("Delete")}
                onConfirm={async () => {
                    await deleteDefinition(definitionId, definitionEditSessionId);
                    navigate("./..");
                }}
                confirmButtonIcon="delete"
            />
        </>
    );
};
