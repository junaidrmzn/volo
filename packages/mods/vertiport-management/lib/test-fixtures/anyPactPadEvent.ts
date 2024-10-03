import { anyPadEvent, anyPadEventInsert } from "./anyPadEvent";
import { pactify } from "./pactify";

export const anyPactPadEvent = pactify(anyPadEvent);
export const anyPactPadEventInsert = pactify(anyPadEventInsert);
