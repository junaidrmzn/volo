import { Matchers } from "@pact-foundation/pact";
import { getTypedKeys } from "@voloiq/utils";

const { like, eachLike } = Matchers;

export const pactify = <T extends object>(anyFactory: (overwrites?: Partial<T>) => T) => {
    const anyPactFactory = (overwrites?: Partial<T>) => {
        const object = anyFactory(overwrites);
        const pactObject: { [key: string]: ReturnType<typeof like> | ReturnType<typeof eachLike> } = {};
        for (const key of getTypedKeys(object)) {
            const value = object[key];
            if (Array.isArray(value) && value.length > 0) {
                pactObject[`${String(key)}`] = eachLike(value[0]);
            } else {
                pactObject[`${String(key)}`] = like(value);
            }
        }
        return pactObject;
    };
    return anyPactFactory;
};
