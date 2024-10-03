import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { PadForm } from "../forms/PadForm";
import type { UseOnCreatePadOptions } from "./useOnCreatePad";
import { useOnCreatePad } from "./useOnCreatePad";

type AddPadFormProps = Pick<UseOnCreatePadOptions, "onSuccessfulCreate"> & {
    vertiport: Vertiport;
};

export const AddPadForm = (props: AddPadFormProps) => {
    const { vertiport } = props;
    const { onCreate } = useOnCreatePad(props);
    const initialValues = {
        longitude: vertiport.location.longitude,
        latitude: vertiport.location.latitude,
        height: vertiport.location.height,
        validFrom: new Date(vertiport.validFrom),
        validTo: vertiport.validTo ? new Date(vertiport.validTo) : undefined,
    };

    return <PadForm formType="create" onCreate={onCreate} vertiport={vertiport} initialValues={initialValues} />;
};
