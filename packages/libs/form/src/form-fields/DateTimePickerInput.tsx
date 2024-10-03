import { Box } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";
import { match } from "ts-pattern";
import type { AnyObjectSchema } from "yup";
import { DateTimeInput } from "@voloiq/date-time-input";
import { useForm } from "../form-context/useForm";
import { getDateMeta } from "../yup/date";
import { getDatetimeMeta, isDatetimeMeta } from "../yup/datetime";
import type { FieldName, FormValues } from "../yup/utils";

type GetDateTimePickerInputPropsOptions<Schema extends AnyObjectSchema> = {
    schema: Schema;
} & Pick<DateTimeInputProps<Schema>, "fieldName" | "mode">;

const getDateTimePickerInputProps = <Schema extends AnyObjectSchema>(
    options: GetDateTimePickerInputPropsOptions<Schema>
) => {
    const { mode, schema, fieldName } = options;
    const props = match(mode)
        .with("date", () => getDateMeta(schema, fieldName))
        .with("dateTime", () => getDatetimeMeta(schema, fieldName))
        .exhaustive();

    return props;
};

type DateTimeInputProps<Schema extends AnyObjectSchema> = {
    controlId: string;
    fieldName: FieldName<Schema> & FieldPath<FormValues<Schema>>;
    isDisabled?: boolean;
    onChange?: (data?: Date) => void;
    onClose?: (data?: Date) => void;
    mode: "date" | "dateTime";
    additionalDateTimeInfo?: (value: Date) => ReactElement | null;
};

export const DateTimePickerInput = <Schema extends AnyObjectSchema>(props: DateTimeInputProps<Schema>) => {
    const { controlId, fieldName, isDisabled, onChange, onClose, mode, additionalDateTimeInfo } = props;
    const { control, schema } = useForm<Schema>();
    const {
        field: { onChange: controllerOnChange, ref, value },
    } = useController({ control, name: fieldName });

    const inputProps = getDateTimePickerInputProps({
        schema,
        fieldName,
        mode,
    });

    const { formatDate, placeholder, withUtcTime, minDate, maxDate } = inputProps;
    let enableSeconds;

    let minuteIncrement;

    if (isDatetimeMeta(inputProps)) {
        enableSeconds = inputProps.enableSeconds;
        minuteIncrement = inputProps.minuteIncrement;
    }

    return (
        <>
            <DateTimeInput
                mode={mode}
                controlId={controlId}
                formatDate={formatDate}
                isDisabled={isDisabled}
                placeholder={placeholder}
                ref={ref}
                value={value}
                withUtcTime={withUtcTime}
                onChange={(event) => {
                    controllerOnChange(event);
                    onChange?.(event);
                }}
                onClose={(event?) => {
                    onClose?.(event);
                }}
                maxDate={maxDate}
                minDate={minDate}
                enableSeconds={enableSeconds}
                minuteIncrement={minuteIncrement}
            />
            <Box paddingTop={1}>{additionalDateTimeInfo?.(value)}</Box>
        </>
    );
};
