import { anyAircraft, anyAircraftCreate } from "./anyAircraft";
import { pactify } from "./pacify";

export const anyPactAircraft = pactify(anyAircraft);
export const anyPactAircraftCreate = pactify(anyAircraftCreate);
