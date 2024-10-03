import type { ErrorDetail } from "./errorDetail";
import { isErrorDetail } from "./errorDetail";
import type { ErrorStatus } from "./errorStatus";
import { isErrorStatus } from "./errorStatus";

export type Error = {
    /** ID of the error for logging and persisting usage. */
    id: string;
    /** Occurrence of the error. */
    timestamp: string;
    /** Error HTTP status code of the response to the caller. */
    code: number;
    /** Description of the error. */
    message: string;
    status: ErrorStatus;
    /** Set of detailed error information causing the error. */
    details?: ErrorDetail[];
};

export const isError = (object: unknown): object is Error =>
    ((object !== null && typeof object === "object") || typeof object === "function") &&
    typeof (object as Error).id === "string" &&
    typeof (object as Error).timestamp === "string" &&
    typeof (object as Error).code === "number" &&
    typeof (object as Error).message === "string" &&
    isErrorStatus((object as Error).status) &&
    (typeof (object as Error).details === "undefined" ||
        (Array.isArray((object as Error).details) &&
            !!(object as Error).details?.every((error) => isErrorDetail(error))));
