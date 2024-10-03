import { useForm } from "@voloiq/form";
import { adjustEndDateOnDateChange } from "@voloiq/utils";
import { useEquipmentForm } from "./useEquipmentForm";

export type EquipmentFormFieldsProps = {
    validFrom?: Date;
    validTo?: Date;
};

type FromChangeType = {
    originalStartDate?: Date;
    originalEndDate?: Date;
    changeEvent: Date;
    updateLabel: string;
};

export const EquipmentFormFields = (props: EquipmentFormFieldsProps) => {
    const { validFrom, validTo } = props;
    const { FormControl } = useEquipmentForm();

    const { setValue } = useForm();

    const fromChangeHandler = (props: FromChangeType) => {
        const { originalStartDate, originalEndDate, changeEvent, updateLabel } = props;
        if (originalStartDate && originalEndDate) {
            const returned = adjustEndDateOnDateChange({
                originalStartDate,
                originalEndDate,
                adjustedStartDate: changeEvent,
            });
            if (returned) {
                setValue(updateLabel, returned);
            }
        }
    };

    return (
        <>
            <FormControl fieldName="deviceId" />
            <FormControl fieldName="name" />
            <FormControl fieldName="location" />
            <FormControl
                fieldName="validFrom"
                onChange={(event) => {
                    if (event instanceof Date) {
                        fromChangeHandler({
                            originalStartDate: validFrom,
                            originalEndDate: validTo,
                            changeEvent: event,
                            updateLabel: "validTo",
                        });
                    }
                }}
            />
            <FormControl fieldName="validTo" />
        </>
    );
};
