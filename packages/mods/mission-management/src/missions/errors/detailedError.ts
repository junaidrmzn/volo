import type {
    ListEmptyError,
    MaxCharacterError,
    MaxForeignReferencedAttributeValueError,
    MaxReferencedAttributeValueError,
    MaxValueError,
    MinCharacterError,
    MinForeignReferencedAttributeValueError,
    MinReferencedAttributeValueError,
    MinValueError,
    NumericOnlyError,
    ReferentialValueDependencyError,
    ValidationError,
    ValueTakenError,
} from "@voloiq-typescript-api/network-scheduling-types";

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

export const isReferentialValueDependencyError = (error: unknown): error is ReferentialValueDependencyError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as ReferentialValueDependencyError).detailedError === "ReferentialValueDependencyError";

export const isValidationError = (error: unknown): error is ValidationError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as ValidationError).detailedError === "ValidationError";

export const isValueTakenError = (error: unknown): error is ValueTakenError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as ValueTakenError).detailedError === "ValueTakenError";

export const isMaxForeignReferencedAttributeValueError = (
    error: unknown
): error is MaxForeignReferencedAttributeValueError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MaxForeignReferencedAttributeValueError).detailedError === "MaxForeignReferencedAttributeValueError";

export const isMinForeignReferencedAttributeValueError = (
    error: unknown
): error is MinForeignReferencedAttributeValueError =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (error as MinForeignReferencedAttributeValueError).detailedError === "MinForeignReferencedAttributeValueError";

export type DetailedError =
    | ListEmptyError
    | MaxCharacterError
    | MaxReferencedAttributeValueError
    | MaxValueError
    | MinCharacterError
    | MinReferencedAttributeValueError
    | MinValueError
    | NumericOnlyError
    | ReferentialValueDependencyError
    | ValidationError
    | ValueTakenError
    | MaxForeignReferencedAttributeValueError
    | MinForeignReferencedAttributeValueError;
