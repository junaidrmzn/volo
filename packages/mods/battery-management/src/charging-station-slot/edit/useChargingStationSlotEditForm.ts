import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import { createFormControl } from "@voloiq/form";
import { useChargingStationSlotFormSchema } from "./useChargingStationSlotFormSchema";

type UseChargingStationSlotEditFormProps = {
    chargingStationSlot: ChargingStationSlot;
};

export const useChargingStationSlotEditForm = (props: UseChargingStationSlotEditFormProps) => {
    const { chargingStationSlot } = props;

    const editChargingStationSlotSchema = useChargingStationSlotFormSchema();

    const chargingStationSlotInitialValues = {
        ...chargingStationSlot,
        validFrom: chargingStationSlot?.validFrom ? new Date(chargingStationSlot?.validFrom) : undefined,
        validTo: chargingStationSlot?.validTo ? new Date(chargingStationSlot?.validTo) : undefined,
        chargingStationSlotStatus: { value: chargingStationSlot?.chargingStationSlotStatus },
        supportedEsuTypes: chargingStationSlot?.supportedEsuTypes.map((esuTypes) => ({
            label: esuTypes.name,
            value: esuTypes.id.toString(),
        })),
        chargingStation: { value: chargingStationSlot?.chargingStation.id },
    };

    const FormControl = createFormControl<typeof editChargingStationSlotSchema>();

    return { FormControl, chargingStationSlotInitialValues, editChargingStationSlotSchema };
};
