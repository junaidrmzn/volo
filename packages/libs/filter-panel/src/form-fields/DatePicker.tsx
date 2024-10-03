import type { DateTimeInputMode } from "@volocopter/date-time-input-react";
import { FormControl, FormLabel } from "@volocopter/design-library-react";
import { useController, useFormContext } from "react-hook-form";
import { DateTimeInput } from "@voloiq/date-time-input";

export type DatePickerProps = {
    name: string;
    label: string;
    isDisabled?: boolean;
    useUtcTime?: boolean;
    mode?: DateTimeInputMode;
};

export const DatePicker = (props: DatePickerProps) => {
    const { name, label, isDisabled, useUtcTime = false, mode } = props;
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
            <FormLabel> {label} </FormLabel>
            <DateTimeInput
                controlId={name}
                ref={ref}
                value={value}
                onChange={onChange}
                withUtcTime={useUtcTime}
                mode={mode}
                minDate={new Date(2000, 0, 1)}
                maxDate={new Date(2100, 0, 1)}
            />
        </FormControl>
    );
};
