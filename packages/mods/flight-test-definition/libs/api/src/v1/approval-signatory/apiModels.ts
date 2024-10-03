export type SignatureRecordApprovalType =
    | "Authored (DE)"
    | "Authored (FTE)"
    | "Reviewed (CVE)"
    | "Reviewed (FTE)"
    | "Reviewed (Eng)"
    | "Approved"
    | "Technical Approval"
    | "Safety Release (SRB)";

export type SignatureRecordApprovalSection =
    | "Test Request Approval"
    | "Flight/Ground Test Plan Approval"
    | "Flight Test Definition (FTD) Approval";

export type SignatureRecord = {
    id: string;
    team?: string;
    role?: string;
    name?: string;
    definitionId: string;
    approvalType: SignatureRecordApprovalType;
    approvalSection: SignatureRecordApprovalSection;
};

export type SignatureRecordInsert = Omit<SignatureRecord, "id" | "definitionId">;
export type SignatureRecordPatch = Partial<SignatureRecord> & { id: string };

export type SignatureRecordsResponse = {
    testRequestApproval: SignatureRecord[];
    flightGroundTestApproval: SignatureRecord[];
    flightTestDefinitionApproval: SignatureRecord[];
};
