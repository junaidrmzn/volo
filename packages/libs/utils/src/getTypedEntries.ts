/**
 * Type-safe version of Object.entries()
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const getTypedEntries = Object.entries as <T extends object>(
    object: T
) => { [K in keyof T]: [K, T[K]] }[keyof T][];
