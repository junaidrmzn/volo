import { CoordinateInput as DLCoordinateInput } from "@volocopter/coordinate-input-react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { useForm } from "../form-context/useForm";
import { getCloseOnBlur, getCoordinateInfoLabels, getIsInvalid, getPlaceholder } from "../yup/coordinate";
import type { FieldName, FormValues } from "../yup/utils";

type CoordinateInputProps<Schema extends AnyObjectSchema> = {
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    onChange?: (data: unknown) => void;
};
export const CoordinateInput = <Schema extends AnyObjectSchema>(props: CoordinateInputProps<Schema>) => {
    const { fieldName, onChange } = props;
    const { control, schema } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, onBlur, name, value = "" },
    } = useController({ control, name: fieldName });

    const coordinateInfoLabels = getCoordinateInfoLabels<Schema>(schema, fieldName);
    const isInvalid = getIsInvalid<Schema>(schema, fieldName);
    const placeholder = getPlaceholder<Schema>(schema, fieldName);
    const closeOnBlur = getCloseOnBlur<Schema>(schema, fieldName);

    return (
        <DLCoordinateInput
            onChange={(event) => {
                controllerOnChange(event);
                onChange?.(event);
            }}
            onBlur={onBlur}
            name={name}
            value={value}
            isInvalid={isInvalid}
            placeholder={placeholder}
            coordinateInfoLabels={coordinateInfoLabels}
            closeOnBlur={closeOnBlur}
        />
    );
};
