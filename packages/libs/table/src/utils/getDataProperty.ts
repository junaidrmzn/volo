export const getDataProperty = <T, K extends keyof T>(object: T, key: K) => {
    return object[key];
};
