import { anyMessageInformation } from "./anyMessageInformation";
import { pactify } from "./pactify";

export const anyPactMessageInformation = pactify(anyMessageInformation);
