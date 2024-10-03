import type {
    DuplicateError,
    ListEmptyError,
    MaxCharacterError,
    MaxReferencedAttributeValueError,
    MaxValueError,
    MinCharacterError,
    MinReferencedAttributeValueError,
    MinValueError,
    NumericOnlyError,
    ValidationError,
} from "@voloiq-typescript-api/crew-api-types";

// These typeguards have to be written manually at the moment because the OpenAPI generator
// does not properly generate string literals for the detailedError property

export const isListEmptyError = (error: unknown): error is ListEmptyError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as ListEmptyError).detailedError === "ListEmptyError";

export const isMaxCharacterError = (error: unknown): error is MaxCharacterError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MaxCharacterError).detailedError === "MaxCharacterError";

export const isMaxReferencedAttributeValueError = (error: unknown): error is MaxReferencedAttributeValueError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MaxReferencedAttributeValueError).detailedError === "MaxReferencedAttributeValueError";

export const isMaxValueError = (error: unknown): error is MaxValueError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MaxValueError).detailedError === "MaxValueError";

export const isMinCharacterError = (error: unknown): error is MinCharacterError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MinCharacterError).detailedError === "MinCharacterError";

export const isMinReferencedAttributeValueError = (error: unknown): error is MinReferencedAttributeValueError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MinReferencedAttributeValueError).detailedError === "MinReferencedAttributeValueError";

export const isMinValueError = (error: unknown): error is MinValueError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MinValueError).detailedError === "MinValueError";

export const isNumericOnlyError = (error: unknown): error is NumericOnlyError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as NumericOnlyError).detailedError === "NumericOnlyError";

export const isValidationError = (error: unknown): error is ValidationError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as ValidationError).detailedError === "ValidationError";

export const isValueTakenError = (error: unknown): error is DuplicateError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as DuplicateError).detailedError === "ValueTakenError";

export type DetailedError =
    | ListEmptyError
    | MaxCharacterError
    | MaxReferencedAttributeValueError
    | MaxValueError
    | MinCharacterError
    | MinReferencedAttributeValueError
    | MinValueError
    | NumericOnlyError
    | ValidationError
    | DuplicateError;
