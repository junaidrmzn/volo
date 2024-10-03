import { format } from "date-fns";
import { match } from "ts-pattern";
import type { AnyObjectSchema, ErrorMessageMap, FieldName } from "@voloiq/form";
import { getFieldLabel } from "@voloiq/form";
import type { EventTranslationFunction } from "../translations/useEventTranslation";
import {
    isListEmptyError,
    isMaxCharacterError,
    isMaxForeignReferencedAttributeValueError,
    isMaxReferencedAttributeValueError,
    isMaxValueError,
    isMinCharacterError,
    isMinForeignReferencedAttributeValueError,
    isMinReferencedAttributeValueError,
    isMinValueError,
    isNumericOnlyError,
    isReferentialValueDependencyError,
    isValidationError,
    isValueTakenError,
} from "./detailedError";

export type CreateErrorMessageMapOptions<Schema extends AnyObjectSchema> = {
    detailedErrors: unknown[];
    schema: Schema;
    isFieldName: (fieldName: unknown) => fieldName is FieldName<Schema>;
    t: EventTranslationFunction;
};

const isIsoDateString = (string: string) =>
    /^((\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?)(Z|[+-]\d{2}:\d{2})?)$/.test(string);

const formatValue = (value: string) =>
    match(value)
        .when(isIsoDateString, () => format(new Date(value), "yyyy-MM-dd HH:mm"))
        .otherwise(() => value);

const capitalizeFirstCharacter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
const splitCamelCase = (string: string) => capitalizeFirstCharacter(string.replace(/([a-z])([A-Z])/g, "$1 $2"));

export const createErrorMessageMap = <Schema extends AnyObjectSchema>(
    options: CreateErrorMessageMapOptions<Schema>
) => {
    const { detailedErrors, schema, isFieldName, t } = options;
    const errorMessageMap: ErrorMessageMap<Schema> = {};
    const unknownErrorOccurredRef = { current: false };
    const addErrorMessage = (attribute: unknown, message: string) => {
        if (isFieldName(attribute)) {
            errorMessageMap[attribute] = message;
        } else {
            unknownErrorOccurredRef.current = true;
        }
    };

    for (const detailedError of detailedErrors) {
        match(detailedError)
            .when(isMinReferencedAttributeValueError, (error) => {
                const { referencedAttribute, minValue, attribute } = error;
                if (isFieldName(referencedAttribute)) {
                    addErrorMessage(
                        attribute,
                        t("errorMessages.minReferencedAttributeValueError", {
                            referencedAttributeLabel: getFieldLabel(schema, referencedAttribute),
                            minValue: formatValue(minValue),
                        })
                    );
                } else {
                    unknownErrorOccurredRef.current = true;
                }
            })
            .when(isListEmptyError, (error) => {
                const { attribute } = error;
                addErrorMessage(attribute, t("errorMessages.listEmptyError"));
            })
            .when(isMaxCharacterError, (error) => {
                const { maxCharacter, attribute } = error;
                addErrorMessage(
                    attribute,
                    t("errorMessages.maxCharacterError", {
                        maxCharacter,
                    })
                );
            })
            .when(isMaxReferencedAttributeValueError, (error) => {
                const { referencedAttribute, maxValue, attribute } = error;
                if (isFieldName(referencedAttribute)) {
                    addErrorMessage(
                        attribute,
                        t("errorMessages.maxReferencedAttributeValueError", {
                            referencedAttributeLabel: getFieldLabel(schema, referencedAttribute),
                            maxValue: formatValue(maxValue),
                        })
                    );
                } else {
                    unknownErrorOccurredRef.current = true;
                }
            })
            .when(isMaxValueError, (error) => {
                const { maxValue, attribute } = error;
                addErrorMessage(
                    attribute,
                    t("errorMessages.maxValueError", {
                        maxValue: formatValue(maxValue),
                    })
                );
            })
            .when(isMinCharacterError, (error) => {
                const { minCharacter, attribute } = error;
                addErrorMessage(
                    attribute,
                    t("errorMessages.minCharacterError", {
                        minCharacter,
                    })
                );
            })
            .when(isMinValueError, (error) => {
                const { minValue, attribute } = error;
                addErrorMessage(
                    attribute,
                    t("errorMessages.minValueError", {
                        minValue: formatValue(minValue),
                    })
                );
            })
            .when(isNumericOnlyError, (error) => {
                const { attribute } = error;
                addErrorMessage(attribute, t("errorMessages.numericOnlyError"));
            })
            .when(isReferentialValueDependencyError, (error) => {
                const { referencedEntitiesAttribute, referencedEntitiesType, attribute } = error;
                addErrorMessage(
                    attribute,
                    t("errorMessages.referentialValueDependencyError", {
                        referencedEntitiesType,
                        referencedEntitiesAttribute,
                    })
                );
            })
            .when(isValueTakenError, (error) => {
                const { attribute } = error;
                addErrorMessage(attribute, t("errorMessages.valueTakenError"));
            })
            .when(isValidationError, (error) => {
                const { attribute } = error;
                addErrorMessage(attribute, t("errorMessages.validationFailedError"));
            })
            .when(isMaxForeignReferencedAttributeValueError, (error) => {
                const { referencedEntityAttribute, referencedEntityType, maxForeignValue, attribute } = error;
                addErrorMessage(
                    attribute,
                    t("errorMessages.maxForeignReferencedAttributeValueError", {
                        referencedEntityAttribute: splitCamelCase(referencedEntityAttribute),
                        referencedEntityType: splitCamelCase(referencedEntityType),
                        maxForeignValue: formatValue(maxForeignValue),
                    })
                );
            })
            .when(isMinForeignReferencedAttributeValueError, (error) => {
                const { referencedEntityAttribute, referencedEntityType, minForeignValue, attribute } = error;
                addErrorMessage(
                    attribute,
                    t("errorMessages.minForeignReferencedAttributeValueError", {
                        referencedEntityAttribute: splitCamelCase(referencedEntityAttribute),
                        referencedEntityType: splitCamelCase(referencedEntityType),
                        minForeignValue: formatValue(minForeignValue),
                    })
                );
            })
            .otherwise(() => {
                unknownErrorOccurredRef.current = true;
            });
    }
    const unknownErrorOccurred = unknownErrorOccurredRef.current;
    return { errorMessageMap, unknownErrorOccurred };
};
