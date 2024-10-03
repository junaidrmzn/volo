import type { PadEventCreate } from "@voloiq/vertiport-management-api/v1";
import { useCreatePadEvent } from "../../../../../../../api-hooks/usePadEventService";
import { useErrorToastWithDescription } from "../../../../../../../hooks/useErrorToast";
import { useSuccessToastWithoutNavigation } from "../../../../../../../hooks/useSuccessToast";
import { useVertiportTranslation } from "../../../../../../../translations/useVertiportTranslation";

type AddPadEventCallbackOptions = {
    data: PadEventCreate;
};

export type AddPadEventCallback = (options: AddPadEventCallbackOptions) => Promise<void>;

type UseAddPadEventOptions = {
    onSuccessfulAdd?: () => void;
};

export const useAddPadEvent = (options: UseAddPadEventOptions = {}) => {
    const { onSuccessfulAdd } = options;
    const { onError } = useErrorToastWithDescription();
    const { onSuccess } = useSuccessToastWithoutNavigation();
    const { t } = useVertiportTranslation();

    const { sendRequest } = useCreatePadEvent();

    const addPadEvent = async (options: AddPadEventCallbackOptions) => {
        const { data } = options;
        const result = await sendRequest({ data }).catch(() => {
            onError(t("error.An error occurred"));
        });
        if (result) {
            onSuccess(t("success.header"));
        }
        onSuccessfulAdd?.();
    };

    return { addPadEvent };
};
