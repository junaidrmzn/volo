import { NumberInput as DLNumberInput, FormControl, FormLabel } from "@volocopter/design-library-react";
import { useController, useFormContext } from "react-hook-form";

type NumberInputProps = {
    name: string;
    label: string;
    isDisabled?: boolean;
    min?: string;
    max?: string;
};
export const NumberInput = (props: NumberInputProps) => {
    const { name, label, isDisabled, min, max } = props;
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref },
    } = useController({
        name,
        control,
        defaultValue: undefined,
    });

    return (
        <FormControl id={name} isDisabled={isDisabled}>
            <FormLabel htmlFor={`numberInput${name}`}>{label}</FormLabel>
            <DLNumberInput
                id={`numberInput${name}`}
                ref={ref}
                value={value}
                onChange={onChange}
                min={min ? Number.parseFloat(min) : undefined}
                max={max ? Number.parseFloat(max) : undefined}
                aria-label={label}
            />
        </FormControl>
    );
};
