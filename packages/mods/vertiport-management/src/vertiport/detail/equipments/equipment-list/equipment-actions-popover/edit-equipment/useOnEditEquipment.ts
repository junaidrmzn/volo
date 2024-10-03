import type { OnEditHandler } from "@voloiq/form";
import { Equipment, EquipmentUpdate, useUpdateEquipment } from "@voloiq/vertiport-management-api/v1";
import { useErrorToastWithMessage } from "../../../../../../hooks/useErrorToast";
import { EquipmentFormSchema } from "../../../forms/useEquipmentFormSchema";

type UseOnEditEquipmentOptions = {
    vertiportId: string;
    equipment: Equipment;
    onClose: () => void;
    refetchData: () => void;
};

export const useOnEditEquipment = (options: UseOnEditEquipmentOptions) => {
    const { equipment, onClose, vertiportId, refetchData } = options;
    const { onError } = useErrorToastWithMessage();
    const { sendRequestById } = useUpdateEquipment({ vertiportId });
    const onEdit: OnEditHandler<EquipmentFormSchema> = async (formData) => {
        const data: EquipmentUpdate = {
            deviceId: formData.deviceId,
            name: formData.name,
            location: formData.location,
            validFrom: formData.validFrom.toISOString(),
            validTo: formData.validTo?.toISOString(),
        };
        await sendRequestById(equipment.id, { data, params: { version: equipment.version } })
            .then(() => {
                refetchData();
                onClose();
            })
            .catch((error) => {
                onError(error);
            });
    };

    return { onEdit };
};
