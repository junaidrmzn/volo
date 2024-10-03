import type { GroupBase } from "@volocopter/design-library-react";
import { AsyncSelect, FormControl, FormLabel } from "@volocopter/design-library-react";
import { useController, useFormContext } from "react-hook-form";
import type { SelectOption, SelectProps } from "./SelectTypes";
import { isSelectOption } from "./SelectTypes.guard";

export const Select = (props: SelectProps) => {
    const { name, options, asyncSelectCallback, label, isDisabled, isMulti = false } = props;
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref, onBlur },
    } = useController({
        name,
        control,
        defaultValue: "",
    });

    const selectedValues =
        !!options && !!value && Array.isArray(value)
            ? value.filter((element: SelectOption) => options.some((option) => option.value === element.value))
            : null;

    const selectedValue =
        !!options && !!value && isSelectOption(value) ? options?.find((option) => option.value === value.value) : null;

    return (
        <FormControl isDisabled={isDisabled}>
            {label && <FormLabel>{label}</FormLabel>}
            <AsyncSelect<SelectOption, true, GroupBase<SelectOption>>
                defaultOptions={options}
                isMulti={isMulti || undefined}
                ref={ref}
                name={name}
                onBlur={onBlur}
                loadOptions={asyncSelectCallback}
                value={asyncSelectCallback ? value : isMulti ? selectedValues : selectedValue}
                onChange={onChange}
            />
        </FormControl>
    );
};
