export const findPropertyInObject = <T extends object, K extends keyof T>(object: T, key: K): T[K] | undefined => {
    return object[key];
};
