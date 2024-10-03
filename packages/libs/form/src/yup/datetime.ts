import type { DateTimeInputProps } from "@volocopter/date-time-input-react";
import type { Path } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import { date } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";

const datetimeMeta = {
    isDatetime: true,
};

type DatetimeMeta = typeof datetimeMeta &
    Pick<
        DateTimeInputProps,
        "formatDate" | "placeholder" | "withUtcTime" | "maxDate" | "minDate" | "enableSeconds" | "minuteIncrement"
    >;

export const isDatetimeMeta = (meta: object): meta is DatetimeMeta =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    typeof meta === "object" &&
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (meta as DatetimeMeta).isDatetime === true &&
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    ((meta as DatetimeMeta).withUtcTime === undefined || typeof (meta as DatetimeMeta).withUtcTime === "boolean");

type DatetimeProps = Pick<
    DateTimeInputProps,
    "formatDate" | "placeholder" | "withUtcTime" | "maxDate" | "minDate" | "enableSeconds" | "minuteIncrement"
>;

export const getDatetimeMeta = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isDatetimeMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid datetime metas.`);
    }

    return meta;
};

export const datetime = (props?: DatetimeProps) => {
    const {
        formatDate,
        placeholder,
        withUtcTime = false,
        minDate,
        maxDate,
        enableSeconds,
        minuteIncrement,
    } = props || {};

    return date().meta({
        ...datetimeMeta,
        formatDate,
        placeholder,
        withUtcTime,
        minDate,
        maxDate,
        enableSeconds,
        minuteIncrement,
    });
};
