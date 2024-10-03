import type { DateTimeInputProps } from "@volocopter/date-time-input-react";
import type { Path } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import { date as yupDate } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";

const dateMeta = {
    isDate: true,
};

type DateMeta = typeof dateMeta &
    Pick<DateTimeInputProps, "formatDate" | "placeholder" | "withUtcTime" | "maxDate" | "minDate">;

export const isDateMeta = (meta: object): meta is DateMeta =>
    typeof meta === "object" && (meta as DateMeta).isDate === true;

type DatetimeProps = Pick<DateTimeInputProps, "formatDate" | "placeholder" | "withUtcTime" | "maxDate" | "minDate">;

export const getDateMeta = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isDateMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid date metas.`);
    }

    return meta;
};

export const date = (props?: DatetimeProps) => {
    const { formatDate, placeholder, withUtcTime = false, maxDate, minDate } = props || {};

    return yupDate().meta({
        ...dateMeta,
        formatDate,
        placeholder,
        withUtcTime,
        maxDate,
        minDate,
    });
};
