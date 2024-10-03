import { AnyObjectSchema, mixed } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";
import type { FieldName } from "./utils";

export type RadioOption<T extends string> = { label?: string; value: T };
export type RadioOptions<T extends string> = RadioOption<T>[];
type RadioOptionsMeta<T extends string> = {
    isRadioGroup: boolean;
    options: RadioOptions<T>;
    defaultValue: string;
    horizontalSpacingBetweenOptions?: number;
};

type RadioOptionProps<T extends string> = {
    options: RadioOption<T>[];
    errorMessage: string;
    defaultValue: string;
    horizontalSpacingBetweenOptions?: number;
};

const isRadioOption = <T extends string>(potentialOption: {}): potentialOption is RadioOption<T> => {
    const radioOption = potentialOption as RadioOption<T>;
    return typeof radioOption.label === "string" && typeof radioOption.value === "string";
};

const isRadioOptions = <T extends string>(potentialOptions: {}[]): potentialOptions is RadioOptions<T> => {
    for (const potentialOption of potentialOptions) {
        if (!potentialOption || !isRadioOption(potentialOption)) {
            return false;
        }
    }
    return true;
};

const isRadioOptionsMeta = <T extends string>(meta: {}): meta is RadioOptionsMeta<T> => {
    const radioOptionsMeta = meta as RadioOptionsMeta<T>;
    return (
        typeof radioOptionsMeta === "object" &&
        radioOptionsMeta.isRadioGroup &&
        radioOptionsMeta?.options &&
        isRadioOptions(radioOptionsMeta.options)
    );
};

export const getRadioGroupMeta = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isRadioOptionsMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid radio group metas.`);
    }
    return meta;
};

export const isRadioGroupField = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    return isRadioOptionsMeta(meta);
};

export const radioGroup = <T extends string = string>(props: RadioOptionProps<T>) => {
    const { options, errorMessage, defaultValue, horizontalSpacingBetweenOptions } = props;
    return mixed<T>()
        .test(
            "isValidOption",
            errorMessage,
            (selectedValue) => !!selectedValue || options.some((option) => option.value === selectedValue)
        )
        .required()
        .meta({
            isRadioGroup: true,
            options,
            defaultValue,
            horizontalSpacingBetweenOptions,
        });
};
