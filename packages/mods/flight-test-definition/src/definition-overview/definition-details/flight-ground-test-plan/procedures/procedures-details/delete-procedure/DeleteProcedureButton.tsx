import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import type { DeleteProcedureConfirmationModalProps } from "./DeleteProcedureConfirmationModal";
import { DeleteProcedureConfirmationModal } from "./DeleteProcedureConfirmationModal";
import { useDeleteProcedureTranslation } from "./translations/useDeleteProcedureTranslation";

export type DeleteProcedureButtonProps = Pick<DeleteProcedureConfirmationModalProps, "definitionId" | "procedureId">;

export const DeleteProcedureButton = (props: DeleteProcedureButtonProps) => {
    const { t } = useDeleteProcedureTranslation();
    const {
        isOpen: isConfirmationModalOpen,
        onOpen: onOpenConfirmationModal,
        onClose: onCloseConfirmationModal,
    } = useDisclosure();

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
            <DeleteProcedureConfirmationModal
                {...props}
                isOpen={isConfirmationModalOpen}
                onClose={onCloseConfirmationModal}
            />
        </>
    );
};
