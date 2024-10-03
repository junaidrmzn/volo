import { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { EquipmentForm } from "../forms/EquipmentForm";
import { useOnCreateEquipment } from "./useOnCreateEquipment";

export type AddEquipmentFormProps = { vertiport: Vertiport; onSuccessfulCreate?: () => void };

export const AddEquipmentForm = (props: AddEquipmentFormProps) => {
    const { vertiport, onSuccessfulCreate } = props;
    const { onCreate } = useOnCreateEquipment({ vertiport, onSuccessfulCreate });

    return <EquipmentForm formType="create" onCreate={onCreate} />;
};
