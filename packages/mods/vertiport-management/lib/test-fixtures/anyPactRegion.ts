import { anyRegion, anyRegionCreate } from "./anyRegion";
import { pactify } from "./pactify";

export const anyPactRegion = pactify(anyRegion);
export const anyPactRegionCreate = pactify(anyRegionCreate);
