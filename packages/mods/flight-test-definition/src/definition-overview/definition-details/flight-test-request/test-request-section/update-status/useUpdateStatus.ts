import { useToast } from "@volocopter/design-library-react";
import type { RequestStatus } from "@voloiq-typescript-api/ftd-types";
import { useOptimisticEditDefinition } from "@voloiq/flight-test-definition-api/v2";
import { ApiError } from "@voloiq/utils";
import { useDefinitionEditSessionId } from "../../../definition-edit-session-id-context/useDefinitionEditSessionId";
import { useUpdateStatusTranslation } from "./translations/useUpdateStatusTranslation";

export type UseUpdateStatusOptions = {
    definitionId: string;
};

export const useUpdateStatus = (options: UseUpdateStatusOptions) => {
    const { definitionId } = options;

    const { t } = useUpdateStatusTranslation();
    const sendToast = useToast();
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();

    const onSuccess = () =>
        sendToast({
            status: "success",
            title: t("Success"),
            description: t("Flight Test Request Status Updated"),
        });

    const onError = (error: ApiError) => {
        const errorDetails = error.response.data.error.details.join(", ");
        sendToast({
            status: "error",
            title: errorDetails ? `${t("Uh-oh!")} - ${t("Something went wrong updating the status")}` : t("Uh-oh!"),
            description: errorDetails || t("Something went wrong updating the status"),
        });
    };

    const { optimisticEditDefinition } = useOptimisticEditDefinition({ definitionId, onError, onSuccess });

    const updateStatus = async (requestStatus: RequestStatus) =>
        optimisticEditDefinition({ data: { requestStatus }, params: { editSessionId } });

    return { updateStatus };
};
