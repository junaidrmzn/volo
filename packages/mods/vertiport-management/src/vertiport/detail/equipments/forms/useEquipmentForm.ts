import { createFormControl } from "@voloiq/form";
import type { EquipmentFormSchema } from "./useEquipmentFormSchema";
import { useEquipmentFormSchema } from "./useEquipmentFormSchema";

export const useEquipmentForm = () => {
    const { equipmentsFormSchema } = useEquipmentFormSchema();
    const FormControl = createFormControl<EquipmentFormSchema>();

    return { equipmentsFormSchema, FormControl };
};
