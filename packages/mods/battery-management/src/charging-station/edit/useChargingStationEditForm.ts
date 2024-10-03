import type { ChargingStation, Vertiport } from "@voloiq-typescript-api/battery-management-types";
import { createFormControl } from "@voloiq/form";
import { useChargingStationFormSchema } from "./useChargingStationFormSchema";

type UseChargingStationEditFormProps = {
    chargingStation: ChargingStation;
    vertiports: Vertiport[];
};

export const useChargingStationEditForm = (props: UseChargingStationEditFormProps) => {
    const { chargingStation, vertiports } = props;

    const editChargingStationSchema = useChargingStationFormSchema({ vertiports });

    const chargingStationInitialValues = {
        ...chargingStation,
        validFrom: chargingStation?.validFrom ? new Date(chargingStation?.validFrom) : undefined,
        validTo: chargingStation?.validTo ? new Date(chargingStation?.validTo) : undefined,
        chargingStationStatus: { value: chargingStation?.chargingStationStatus },
        vertiport: { value: chargingStation?.vertiport?.id },
    };

    const FormControl = createFormControl<typeof editChargingStationSchema>();

    return { FormControl, chargingStationInitialValues, editChargingStationSchema };
};
