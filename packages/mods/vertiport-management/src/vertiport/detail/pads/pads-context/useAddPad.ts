import type { PadCreate } from "@voloiq/vertiport-management-api/v1";
import { useCreatePad } from "../../../../api-hooks/usePadService";
import { useSuccessToastWithoutNavigation } from "../../../../hooks/useSuccessToast";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";

type AddPadCallbackOptions = {
    data: PadCreate;
};

export type AddPadCallback = (options: AddPadCallbackOptions) => Promise<void>;

type UseAddPadOptions = {
    onSuccessfulAdd?: () => void;
};

export const useAddPad = (options: UseAddPadOptions = {}) => {
    const { onSuccessfulAdd } = options;
    const { onSuccess } = useSuccessToastWithoutNavigation();
    const { t } = useVertiportTranslation();

    const { sendRequest } = useCreatePad();

    const addPad = async (options: AddPadCallbackOptions) => {
        const { data } = options;
        const result = await sendRequest({ data });
        if (result) {
            onSuccess(t("success.header"));
        }
        onSuccessfulAdd?.();
    };

    return { addPad };
};
