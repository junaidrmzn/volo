import { Equipment, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { EquipmentForm } from "../../../forms/EquipmentForm";
import { useOnEditEquipment } from "./useOnEditEquipment";

type EditEquipmentFormProps = {
    equipment: Equipment;
    vertiport: Vertiport;
    onClose: () => void;
    refetchData: () => void;
};
export const EditEquipmentForm = (props: EditEquipmentFormProps) => {
    const { equipment, vertiport, onClose, refetchData } = props;
    const { onEdit } = useOnEditEquipment({
        vertiportId: vertiport.id,
        equipment,
        onClose,
        refetchData,
    });
    const initialValues = {
        ...equipment,
        validFrom: new Date(equipment.validFrom),
        validTo: equipment.validTo ? new Date(equipment.validTo) : undefined,
    };

    return <EquipmentForm formType="edit" onEdit={onEdit} initialValues={initialValues} />;
};
