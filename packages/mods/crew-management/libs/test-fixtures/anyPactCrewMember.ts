import { anyCrewMember, anyCrewMemberInsert } from "./anyCrewMember";
import { pactify } from "./pactify";

export const anyPactCrewMember = pactify(anyCrewMember);
export const anyPactCrewMemberInsert = pactify(anyCrewMemberInsert);
