/**
 * The canonical error codes for the API.
'CANCELLED': The operation was cancelled, typically by the caller. HTTP Mapping: 499 Client Closed Request
'UNKNOWN': Unknown error occurred. HTTP Mapping: 500 Internal Server Error
'INVALID_ARGUMENT': The client specified an invalid argument. HTTP Mapping: 400 Bad Request
'DEADLINE_EXCEEDED': The deadline expired before the operation could complete. HTTP Mapping: 504 Gateway Timeout
'NOT_FOUND': Some requested entity was not found. HTTP Mapping: 404 Not Found
'ALREADY_EXISTS': The entity that a client attempted to create already exists. HTTP Mapping: 409 Conflict
'PERMISSION_DENIED': The caller does not have permission to execute the specified operation. HTTP Mapping: 
403 Forbidden
'UNAUTHENTICATED': The request does not have valid authentication credentials for the operation: HTTP Mapping: 
401 Unauthorized
'RESOURCE_EXHAUSTED': Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file 
system is out of space. HTTP Mapping: 429 Too Many Requests
'FAILED_PRECONDITION': The operation was rejected because the system is not in a state required for the 
operation's execution. For example, the directory to be deleted is non-empty. HTTP Mapping: 400 Bad Request
'ABORTED': The operation was aborted, typically due to a concurrency issue such as a sequencer check failure or 
transaction abort. HTTP Mapping: 409 Conflict
'OUT_OF_RANGE': The operation was attempted past the valid range.  E.g., seeking or reading past end-of-file.
HTTP Mapping: 400 Bad Request
'UNIMPLEMENTED': The operation is not implemented or is not supported/enabled in this service. HTTP Mapping: 
501 Not Implemented
'INTERNAL': Internal errors.  This means that some invariants expected by the underlying system have been 
broken.  This error code is reserved for serious errors. HTTP Mapping: 500 Internal Server Error
'UNAVAILABLE': The service is currently unavailable. HTTP Mapping: 503 Service Unavailable
'DATA_LOSS': Unrecoverable data loss or corruption. HTTP Mapping: 500 Internal Server Error

 */
export type ErrorStatus =
    | "CANCELLED"
    | "UNKNOWN"
    | "INVALID_ARGUMENT"
    | "DEADLINE_EXCEEDED"
    | "NOT_FOUND"
    | "ALREADY_EXISTS"
    | "PERMISSION_DENIED"
    | "UNAUTHENTICATED"
    | "RESOURCE_EXHAUSTED"
    | "FAILED_PRECONDITION"
    | "ABORTED"
    | "OUT_OF_RANGE"
    | "UNIMPLEMENTED"
    | "INTERNAL"
    | "UNAVAILABLE"
    | "DATA_LOSS";

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ErrorStatus = {
    CANCELLED: "CANCELLED" as ErrorStatus,
    UNKNOWN: "UNKNOWN" as ErrorStatus,
    INVALID_ARGUMENT: "INVALID_ARGUMENT" as ErrorStatus,
    DEADLINE_EXCEEDED: "DEADLINE_EXCEEDED" as ErrorStatus,
    NOT_FOUND: "NOT_FOUND" as ErrorStatus,
    ALREADY_EXISTS: "ALREADY_EXISTS" as ErrorStatus,
    PERMISSION_DENIED: "PERMISSION_DENIED" as ErrorStatus,
    UNAUTHENTICATED: "UNAUTHENTICATED" as ErrorStatus,
    RESOURCE_EXHAUSTED: "RESOURCE_EXHAUSTED" as ErrorStatus,
    FAILED_PRECONDITION: "FAILED_PRECONDITION" as ErrorStatus,
    ABORTED: "ABORTED" as ErrorStatus,
    OUT_OF_RANGE: "OUT_OF_RANGE" as ErrorStatus,
    UNIMPLEMENTED: "UNIMPLEMENTED" as ErrorStatus,
    INTERNAL: "INTERNAL" as ErrorStatus,
    UNAVAILABLE: "UNAVAILABLE" as ErrorStatus,
    DATA_LOSS: "DATA_LOSS" as ErrorStatus,
};

export const isErrorStatus = (object: unknown): object is ErrorStatus =>
    object === "CANCELLED" ||
    object === "UNKNOWN" ||
    object === "INVALID_ARGUMENT" ||
    object === "DEADLINE_EXCEEDED" ||
    object === "NOT_FOUND" ||
    object === "ALREADY_EXISTS" ||
    object === "PERMISSION_DENIED" ||
    object === "UNAUTHENTICATED" ||
    object === "RESOURCE_EXHAUSTED" ||
    object === "FAILED_PRECONDITION" ||
    object === "ABORTED" ||
    object === "OUT_OF_RANGE" ||
    object === "UNIMPLEMENTED" ||
    object === "INTERNAL" ||
    object === "UNAVAILABLE" ||
    object === "DATA_LOSS";
