import type { PadUpdate } from "@voloiq/vertiport-management-api/v1";
import { useUpdatePad } from "../../../../api-hooks/usePadService";
import { useSuccessToastWithoutNavigation } from "../../../../hooks/useSuccessToast";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";

type EditPadCallbackOptions = {
    padId: string;
    data: PadUpdate;
};

export type EditPadCallback = (options: EditPadCallbackOptions) => Promise<void>;

type UseEditPadOptions = {
    onSuccessfulEdit?: () => void;
};

export const useEditPad = (options: UseEditPadOptions = {}) => {
    const { onSuccessfulEdit } = options;
    const { onSuccess } = useSuccessToastWithoutNavigation();
    const { t } = useVertiportTranslation();

    const { sendRequestById } = useUpdatePad();

    const editPad = async (options: EditPadCallbackOptions) => {
        const { padId, data } = options;
        const result = await sendRequestById(padId, { data });
        if (result) {
            onSuccess(t("success.header"));
        }
        onSuccessfulEdit?.();
    };

    return { editPad };
};
