import type { OnCreateHandler } from "@voloiq/form";
import type { EquipmentCreate, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useAddEquipment } from "@voloiq/vertiport-management-api/v1";
import { useErrorToastWithMessage } from "../../../../hooks/useErrorToast";
import { EquipmentFormSchema } from "../forms/useEquipmentFormSchema";

export type UseOnCreateEquipmentOptions = {
    vertiport: Vertiport;
    onSuccessfulCreate?: () => void;
};

export const useOnCreateEquipment = (options: UseOnCreateEquipmentOptions) => {
    const { onSuccessfulCreate, vertiport } = options;
    const { onError } = useErrorToastWithMessage();
    const { sendRequest } = useAddEquipment({ vertiportId: vertiport.id });
    const onCreate: OnCreateHandler<EquipmentFormSchema> = async (formData) => {
        const data: EquipmentCreate = {
            deviceId: formData.deviceId,
            name: formData.name,
            location: formData.location,
            validFrom: formData.validFrom.toISOString(),
            validTo: formData.validTo?.toISOString(),
        };
        await sendRequest({ data })
            .then(() => {
                onSuccessfulCreate?.();
            })
            .catch((error) => {
                onError(error);
            });
    };

    return { onCreate };
};
