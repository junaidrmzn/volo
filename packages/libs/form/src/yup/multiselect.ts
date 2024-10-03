import type { OptionBase } from "@volocopter/design-library-react";
import type { AnyObjectSchema } from "yup";
import { mixed } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";
import type { FieldName } from "./utils";

export type MultiselectOption = { label?: string; value: string } & OptionBase;
export type MultiselectOptions = MultiselectOption[];
type MultiselectOptionsMeta = {
    isMultiselect: boolean;
    options: MultiselectOptions;
    placeholder: string;
};

const isMultiselectOption = (potentialOption: {}): potentialOption is MultiselectOption => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const selectOption = potentialOption as MultiselectOption;
    return typeof selectOption.label === "string" && typeof selectOption.value === "string";
};

const isMultiselectOptions = (potentialOptions: {}[]): potentialOptions is MultiselectOptions => {
    for (const potentialOption of potentialOptions) {
        if (!potentialOption || !isMultiselectOption(potentialOption)) {
            return false;
        }
    }
    return true;
};

const isMultiselectOptionsMeta = (meta: {}): meta is MultiselectOptionsMeta => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const multiselectOptionsMeta = meta as MultiselectOptionsMeta;
    return (
        typeof multiselectOptionsMeta === "object" &&
        multiselectOptionsMeta.isMultiselect &&
        multiselectOptionsMeta?.options &&
        multiselectOptionsMeta.placeholder !== undefined &&
        isMultiselectOptions(multiselectOptionsMeta.options)
    );
};

const validateSelectedOptions = (multiselectOptions: MultiselectOption[], selectedValues?: MultiselectOption[]) =>
    !!selectedValues &&
    !!selectedValues?.length &&
    selectedValues.filter((selectedValue) => !multiselectOptions.some((option) => selectedValue.value === option.value))
        .length === 0;

export const getMultiselectMeta = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isMultiselectOptionsMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid multiselect metas.`);
    }
    return meta;
};

export const isMultiselectField = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    return isMultiselectOptionsMeta(meta);
};

type MultiselectOptionProps = {
    options: MultiselectOption[];
    placeholder: string;
    errorMessage: string;
};
export const multiselect = <T extends MultiselectOption[] = MultiselectOption[]>(props: MultiselectOptionProps) => {
    const { options, placeholder, errorMessage } = props;
    return mixed<T>()
        .test("isValidOption", errorMessage, (selectedValues, context) => {
            const { schema } = context;
            return schema.exclusiveTests.required === undefined || validateSelectedOptions(options, selectedValues);
        })
        .meta({
            isMultiselect: true,
            options,
            placeholder,
        });
};
