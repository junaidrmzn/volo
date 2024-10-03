import { pactify } from "../../pactify";
import { anyVertiport, anyVertiportCreate, anyVertiportUpdate } from "./anyVertiport";

export const anyPactVertiport = pactify(anyVertiport);
export const anyPactVertiportCreate = pactify(anyVertiportCreate);
export const anyPactVertiportUpdate = pactify(anyVertiportUpdate);
