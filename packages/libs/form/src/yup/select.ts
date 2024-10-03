import type { OptionBase } from "@volocopter/design-library-react";
import type { AnyObjectSchema } from "yup";
import { mixed } from "yup";
import { getSchemaDescriptionOfField } from "./schemaDescription";
import type { FieldName } from "./utils";

export type SelectOption<T extends string | undefined = string> = { label?: string; value: T } & OptionBase;
export type SelectOptions<T extends string | undefined> = SelectOption<T>[];
type SelectOptionsMeta<T extends string | undefined> = {
    isSelect: boolean;
    options: SelectOptions<T>;
    placeholder: string;
};

export const isSelectOption = <T extends string | undefined>(
    potentialOption: unknown
): potentialOption is SelectOption<T> => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const selectOption = potentialOption as SelectOption<T>;
    return (
        typeof selectOption.label === "string" &&
        (typeof selectOption.value === "string" || selectOption.value === undefined)
    );
};

const isSelectOptions = <T extends string | undefined>(
    potentialOptions: {}[]
): potentialOptions is SelectOptions<T> => {
    for (const potentialOption of potentialOptions) {
        if (!potentialOption || !isSelectOption(potentialOption)) {
            return false;
        }
    }
    return true;
};

const isSelectOptionsMeta = <T extends string | undefined>(meta: {}): meta is SelectOptionsMeta<T> => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const selectOptionsMeta = meta as SelectOptionsMeta<T>;
    return (
        typeof selectOptionsMeta === "object" &&
        selectOptionsMeta.isSelect &&
        selectOptionsMeta?.options &&
        !!selectOptionsMeta.placeholder &&
        isSelectOptions(selectOptionsMeta.options)
    );
};

const validateSelectedOption = <T extends string | undefined>(
    selectOptions: SelectOption<T>[],
    selectedValue?: SelectOption<T> | undefined
) => !!selectedValue && selectOptions.some((option) => option.value === selectedValue.value);

export const getSelectMeta = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    if (!isSelectOptionsMeta(meta)) {
        throw new Error(`Metas for ${fieldName} are not valid select metas.`);
    }
    return meta;
};

export const isSelectField = <Schema extends AnyObjectSchema>(schema: Schema, fieldName: FieldName<Schema>) => {
    const { meta } = getSchemaDescriptionOfField(schema, fieldName);
    return isSelectOptionsMeta(meta);
};

type SelectOptionProps<T extends string | undefined> = {
    options: SelectOption<T>[];
    placeholder: string;
    errorMessage: string;
};
export const select = <T extends string | undefined = string>(props: SelectOptionProps<T>) => {
    const { options, placeholder, errorMessage } = props;
    return mixed<SelectOption<T>>()
        .test("isValidOption", errorMessage, (selectedValue, context) => {
            const { schema } = context;
            return schema.exclusiveTests.required === undefined || validateSelectedOption<T>(options, selectedValue);
        })
        .meta({
            isSelect: true,
            options,
            placeholder,
        });
};
