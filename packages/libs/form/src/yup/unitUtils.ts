import type { Path } from "react-hook-form";
import type { AnyObjectSchema, Asserts, TypeOf } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";
import { isUnitMeta } from "./unit";

export const getBaseUnit = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isUnitMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid unit metas.`);
    }

    return meta.baseUnit;
};
export const getDisplayUnit = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isUnitMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid unit metas.`);
    }

    return meta.displayUnit;
};

export const getDefaultBaseValue = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isUnitMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid unit metas.`);
    }

    return meta.defaultBaseValue;
};

export const getOnChangeBaseValue = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isUnitMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid unit metas.`);
    }

    return meta.onChangeBaseValue;
};

export const getUnitType = <Schema extends AnyObjectSchema>(
    schema: Schema,
    fieldName: keyof TypeOf<Schema> & string & Path<Asserts<Schema>>
) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isUnitMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid unit metas.`);
    }

    return meta.unitType;
};
