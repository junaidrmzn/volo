import type { CoordinateInfoLabels } from "@volocopter/coordinate-input-react";
import type { Path } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import { string } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";
import type { FieldName } from "./utils";

export type CoordinateMeta = {
    coordinateInfoLabels: CoordinateInfoLabels;
    isInvalid?: boolean;
    placeholder?: string;
    closeOnBlur?: boolean;
};

export const isCoordinateMeta = (meta: {}): meta is CoordinateMeta => {
    const coordinateMeta = meta as CoordinateMeta;
    return (
        typeof coordinateMeta === "object" &&
        coordinateMeta.coordinateInfoLabels !== undefined &&
        (coordinateMeta.isInvalid === undefined || typeof coordinateMeta.isInvalid === "boolean")
    );
};

export const getCoordinateInfoLabels = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isCoordinateMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid coordinate metas.`);
    }

    return meta.coordinateInfoLabels;
};

export const getIsInvalid = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isCoordinateMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid coordinate metas.`);
    }

    return meta.isInvalid;
};

export const getCloseOnBlur = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isCoordinateMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid coordinate metas.`);
    }

    return meta.closeOnBlur;
};

export const getPlaceholder = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isCoordinateMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid coordinate metas.`);
    }

    return meta.placeholder;
};

export const isCoordinateField = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    return isCoordinateMeta(meta);
};

export const coordinate = (props: CoordinateMeta) => {
    const { coordinateInfoLabels, isInvalid, placeholder, closeOnBlur } = props;
    return string().meta({
        coordinateInfoLabels,
        isInvalid,
        placeholder,
        closeOnBlur,
    });
};
