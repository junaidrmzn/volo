import { Checkbox as ChakraCheckbox } from "@volocopter/design-library-react";
import { useController, useFormContext } from "react-hook-form";

export type CheckboxProps = {
    name: string;
    checkboxLabel: string;
};

export const Checkbox = (props: CheckboxProps) => {
    const { name, checkboxLabel } = props;
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref },
    } = useController({
        name,
        control,
        defaultValue: false,
    });

    return (
        <ChakraCheckbox onChange={onChange} name={name} ref={ref} isChecked={value}>
            {checkboxLabel}
        </ChakraCheckbox>
    );
};
