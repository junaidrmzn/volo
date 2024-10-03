import { anyVertiport, anyVertiportCreate, anyVertiportUpdate } from "./anyVertiport";
import { pactify } from "./pactify";

export const anyPactVertiport = pactify(anyVertiport);
export const anyPactVertiportCreate = pactify(anyVertiportCreate);
export const anyPactVertiportUpdate = pactify(anyVertiportUpdate);
