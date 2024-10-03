import type { FlightTestDefinition } from "@voloiq-typescript-api/ftd-types";
import { UpdateStatusModal } from "@voloiq/flight-test-definition-components";
import { useUpdateStatusTranslation } from "./translations/useUpdateStatusTranslation";
import { useUpdateStatus } from "./useUpdateStatus";

export type UpdateFlightTestRequestModalProps = {
    definition: Pick<FlightTestDefinition, "requestStatus" | "id">;
    isOpen?: boolean;
    onClose: () => void;
};

export const UpdateFlightTestRequestStatusModal = (props: UpdateFlightTestRequestModalProps) => {
    const { definition, isOpen, onClose } = props;
    const { requestStatus, id: definitionId } = definition;
    const { t } = useUpdateStatusTranslation();
    const { updateStatus } = useUpdateStatus({ definitionId });

    return (
        <UpdateStatusModal
            status={requestStatus}
            updateStatus={updateStatus}
            onClose={onClose}
            isOpen={isOpen}
            modalTitle={t("Flight Test Request")}
        />
    );
};
