export type CrewMemberAssignmentObject = {
    /** id of an assignment */
    id?: string;
    /** Role id of a role */
    roleId?: string;
    /** Role key of a role */
    roleKey?: string;
    /** Role description of a role */
    description?: string;
    /** The id of a member */
    memberId?: string;
    /** Timestamp when the object is valid. */
    validFrom?: string;
    /** Timestamp until when the object is valid. */
    validTo?: string;
    /** The name of an aircraft-type that the assignment is limited to */
    acTypeName?: string;
    /** The UUID of an aircraft-type that the assignment is limited to */
    acTypeId?: string;
    /** The bool if an ac type can be given to */
    acTypePossible?: boolean;
    /** The bool if the assignment is currently edited */
    editMode: boolean;
};
