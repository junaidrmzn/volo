import { pactify } from "../../pactify";
import { anyPadEvent, anyPadEventInsert } from "./anyPadEvent";

export const anyPactPadEvent = pactify(anyPadEvent);
export const anyPactPadEventInsert = pactify(anyPadEventInsert);
