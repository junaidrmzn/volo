import type { OnCreateHandler } from "@voloiq/form";
import type { PadEventCreate } from "@voloiq/vertiport-management-api/v1";
import { useErrorToastWithDescription } from "../../../../../../../hooks/useErrorToast";
import { useVertiportTranslation } from "../../../../../../../translations/useVertiportTranslation";
import type { PadEventFormSchema } from "../forms/usePadEventFormSchema";
import { usePadEvents } from "../pad-events-context/usePadEvents";

type AddPadEventModalProps = {
    onClose: () => void;
};

export const useOnCreatePadEvent = (props: AddPadEventModalProps) => {
    const { onClose } = props;
    const { addPadEvent } = usePadEvents();
    const { onError } = useErrorToastWithDescription();
    const { t } = useVertiportTranslation();

    const onCreate: OnCreateHandler<PadEventFormSchema> = async (formData) => {
        const data: PadEventCreate = {
            ...formData,
            startTime: formData.startTime.toISOString(),
            endTime: formData.endTime.toISOString(),
            type: formData.type.value,
        };
        await addPadEvent({ data }).catch(() => {
            onError(t("error.An error occurred"));
        });
        onClose();
    };

    return { onCreate };
};
