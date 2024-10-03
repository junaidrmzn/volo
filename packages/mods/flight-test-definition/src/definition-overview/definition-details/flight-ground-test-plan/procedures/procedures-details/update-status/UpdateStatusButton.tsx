import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import type { UpdateProcedureStatusModalProps } from "./UpdateProcedureStatusModal";
import { UpdateProcedureStatusModal } from "./UpdateProcedureStatusModal";
import { useUpdateStatusTranslation } from "./translations/useUpdateStatusTranslation";

export type UpdateStatusButtonProps = Pick<UpdateProcedureStatusModalProps, "procedure">;

export const UpdateStatusButton = (props: UpdateStatusButtonProps) => {
    const { t } = useUpdateStatusTranslation();
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            <Button leftIcon={<Icon size={4} icon="exchange" />} variant="primary" size="sm" onClick={onOpen}>
                {t("Change Status")}
            </Button>
            <UpdateProcedureStatusModal {...props} isOpen={isOpen} onClose={onClose} />
        </>
    );
};
