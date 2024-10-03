import { pactify } from "../../pactify";
import { anyRegion, anyRegionCreate } from "./anyRegion";

export const anyPactRegion = pactify(anyRegion);
export const anyPactRegionCreate = pactify(anyRegionCreate);
