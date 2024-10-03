import { Matchers } from "@pact-foundation/pact";
import { getTypedKeys } from "@voloiq/utils";

const { like } = Matchers;

export const pactify = <T extends object>(anyFactory: (overwrites?: Partial<T>) => T) => {
    const anyPactFactory = (overwrites?: Partial<T>) => {
        const object = anyFactory(overwrites);
        const pactObject: { [key: string]: ReturnType<typeof like> } = {};
        for (const key of getTypedKeys(object)) {
            pactObject[`${key}`] = like(object[key]);
        }
        return pactObject;
    };
    return anyPactFactory;
};
