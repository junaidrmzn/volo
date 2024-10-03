import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { UpdateStatusModal } from "@voloiq/flight-test-definition-components";
import { useUpdateStatusTranslation } from "./translations/useUpdateStatusTranslation";
import { useUpdateStatus } from "./useUpdateStatus";

export type UpdateProcedureStatusModalProps = {
    procedure: Pick<ProcedureRead, "status" | "id" | "definitionId">;
    isOpen?: boolean;
    onClose: () => void;
};

export const UpdateProcedureStatusModal = (props: UpdateProcedureStatusModalProps) => {
    const { isOpen, onClose, procedure } = props;
    const { status, id: procedureId, definitionId } = procedure;
    const { t } = useUpdateStatusTranslation();
    const { updateStatus } = useUpdateStatus({ definitionId, procedureId });

    return (
        <UpdateStatusModal
            status={status}
            updateStatus={updateStatus}
            onClose={onClose}
            isOpen={isOpen}
            modalTitle={t("Procedure")}
        />
    );
};
