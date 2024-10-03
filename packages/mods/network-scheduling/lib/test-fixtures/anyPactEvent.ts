import { anyEvent } from "./anyEvent";
import { pactify } from "./pacify";

export const anyPactEvent = pactify(anyEvent);
