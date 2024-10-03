import { Pad, PadService, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { PadForm } from "../../../forms/PadForm";
import { useOnEditPad } from "./useOnEditPad";

type EditPadFormProps = {
    pad: Pad;
    vertiport: Vertiport;
    onClose: () => void;
};
export const EditPadForm = (props: EditPadFormProps) => {
    const { pad, vertiport, onClose } = props;
    const { onEdit } = useOnEditPad({ padId: pad.id, onClose, vertiport });
    const initialValues = {
        ...pad,
        coordinates: `${pad.location.latitude}, ${pad.location.longitude}`,
        height: pad.location.height,
        validFrom: new Date(pad.validFrom),
        validTo: pad.validTo ? new Date(pad.validTo) : undefined,
        services: pad?.services?.map((service: PadService) => ({
            label: service,
            value: service,
        })),
    };

    return <PadForm formType="edit" onEdit={onEdit} initialValues={initialValues} vertiport={vertiport} />;
};
