/**
 * Type-safe version of Object.keys()
 *
 * Returns the names of the enumerable string properties and methods of an object.
 * @param object - Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const getTypedKeys = Object.keys as <T extends object>(object: T) => (keyof T)[];
