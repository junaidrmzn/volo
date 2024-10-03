import { anyCrewRole, anyCrewRoleInsert } from "./anyCrewRole";
import { pactify } from "./pactify";

export const anyPactCrewRole = pactify(anyCrewRole);
export const anyPactCrewRoleInsert = pactify(anyCrewRoleInsert);
