import { format } from "date-fns";
import { match } from "ts-pattern";
import type { AnyObjectSchema, ErrorMessageMap, FieldName } from "@voloiq/form";
import { getFieldLabel } from "@voloiq/form";
import type { ResourcesTranslationFunction } from "../translations/useCrewApiTranslation";
import type { DetailedError } from "./detailedError";
import {
    isListEmptyError,
    isMaxCharacterError,
    isMaxReferencedAttributeValueError,
    isMaxValueError,
    isMinCharacterError,
    isMinReferencedAttributeValueError,
    isMinValueError,
    isNumericOnlyError,
    isValidationError,
    isValueTakenError,
} from "./detailedError";

export type CreateErrorMessageMapOptions<Schema extends AnyObjectSchema> = {
    detailedErrors: DetailedError[];
    schema: Schema;
    isFieldName: (fieldName: unknown) => fieldName is FieldName<Schema>;
    t: ResourcesTranslationFunction;
};

const isIsoDateString = (string: string) =>
    /^((\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?)(Z|[+-]\d{2}:\d{2})?)$/.test(string);

const formatValue = (value: string) =>
    match(value)
        .when(isIsoDateString, () => format(new Date(value), "yyyy-MM-dd HH:mm"))
        .otherwise(() => value);

// const capitalizeFirstCharacter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
// const splitCamelCase = (string: string) => capitalizeFirstCharacter(string.replace(/([a-z])([A-Z])/g, "$1 $2"));

export const createErrorMessageMap = <Schema extends AnyObjectSchema>(
    options: CreateErrorMessageMapOptions<Schema>
) => {
    const { detailedErrors, schema, isFieldName, t } = options;
    const errorMessageMap: ErrorMessageMap<Schema> = {};
    const unknownErrorOccurredRef = { current: false };

    for (const detailedError of detailedErrors) {
        const { attribute } = detailedError;
        if (!isFieldName(attribute)) {
            unknownErrorOccurredRef.current = true;
            continue;
        }
        match(detailedError)
            .when(isMinReferencedAttributeValueError, (error) => {
                const { referencedAttribute, minValue } = error;
                if (isFieldName(referencedAttribute)) {
                    errorMessageMap[attribute] = t("errorMessages.minReferencedAttributeValueError", {
                        referencedAttributeLabel: getFieldLabel(schema, referencedAttribute),
                        minValue: formatValue(minValue),
                    });
                } else {
                    unknownErrorOccurredRef.current = true;
                }
            })
            .when(isListEmptyError, () => {
                errorMessageMap[attribute] = t("errorMessages.listEmptyError");
            })
            .when(isMaxCharacterError, (error) => {
                const { maxCharacter } = error;
                errorMessageMap[attribute] = t("errorMessages.maxCharacterError", {
                    maxCharacter,
                });
            })
            .when(isMaxReferencedAttributeValueError, (error) => {
                const { referencedAttribute, maxValue } = error;
                if (isFieldName(referencedAttribute)) {
                    errorMessageMap[attribute] = t("errorMessages.maxReferencedAttributeValueError", {
                        referencedAttributeLabel: getFieldLabel(schema, referencedAttribute),
                        maxValue: formatValue(maxValue),
                    });
                } else {
                    unknownErrorOccurredRef.current = true;
                }
            })
            .when(isMaxValueError, (error) => {
                const { maxValue } = error;
                errorMessageMap[attribute] = t("errorMessages.maxValueError", {
                    maxValue: formatValue(maxValue),
                });
            })
            .when(isMinCharacterError, (error) => {
                const { minCharacter } = error;
                errorMessageMap[attribute] = t("errorMessages.minCharacterError", {
                    minCharacter,
                });
            })
            .when(isMinValueError, (error) => {
                const { minValue } = error;
                errorMessageMap[attribute] = t("errorMessages.minValueError", {
                    minValue: formatValue(minValue),
                });
            })
            .when(isNumericOnlyError, () => {
                errorMessageMap[attribute] = t("errorMessages.numericOnlyError");
            })
            .when(isValidationError, () => {
                errorMessageMap[attribute] = t("errorMessages.validationFailedError");
            })
            .when(isValueTakenError, () => {
                errorMessageMap[attribute] = t("errorMessages.valueTakenError");
            })
            .exhaustive();
    }
    const unknownErrorOccurred = unknownErrorOccurredRef.current;
    return { errorMessageMap, unknownErrorOccurred };
};
