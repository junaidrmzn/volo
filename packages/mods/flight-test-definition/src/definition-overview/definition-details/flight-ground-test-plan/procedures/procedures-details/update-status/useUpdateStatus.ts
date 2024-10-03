import { useToast } from "@volocopter/design-library-react";
import type { ProcedureStatus } from "@voloiq-typescript-api/ftd-types";
import { useOptimisticEditProcedure } from "@voloiq/flight-test-definition-api/v1";
import { ApiError } from "@voloiq/utils";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { useUpdateStatusTranslation } from "./translations/useUpdateStatusTranslation";

export type UseUpdateStatusOptions = {
    definitionId: string;
    procedureId: string;
};

export const useUpdateStatus = (options: UseUpdateStatusOptions) => {
    const { definitionId, procedureId } = options;

    const { t } = useUpdateStatusTranslation();
    const sendToast = useToast();
    const onError = (error: ApiError) => {
        const errorDetails = error.response.data.error.details.join(", ");
        sendToast({
            status: "error",
            title: errorDetails ? `${t("Uh-oh!")} - ${t("Something went wrong updating the status")}` : t("Uh-oh!"),
            description: errorDetails || t("Something went wrong updating the status"),
        });
    };
    const onSuccess = () => {
        sendToast({
            status: "success",
            title: t("Success!"),
            description: t("Status has been updated successfully"),
        });
    };

    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();
    const { optimisticEditProcedure } = useOptimisticEditProcedure({
        definitionId,
        procedureId,
        onError,
        onSuccess,
    });

    const updateStatus = (status: ProcedureStatus) =>
        optimisticEditProcedure({ data: { status }, params: { editSessionId } });

    return { updateStatus };
};
