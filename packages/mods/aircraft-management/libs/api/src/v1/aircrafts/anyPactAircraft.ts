import { pactify } from "../../pactify";
import { anyAircraft, anyAircraftCreate } from "./anyAircraft";

export const anyPactAircraft = pactify(anyAircraft);
export const anyPactAircraftCreate = pactify(anyAircraftCreate);
