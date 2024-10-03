/**
 * Error detail schema for the application's JSON HTTP API.
 */
export type ErrorDetail = {
    /** Description of the error. */
    message: string;
};

export const isErrorDetail = (object: unknown): object is ErrorDetail =>
    ((object !== null && typeof object === "object") || typeof object === "function") &&
    typeof (object as ErrorDetail).message === "string";
