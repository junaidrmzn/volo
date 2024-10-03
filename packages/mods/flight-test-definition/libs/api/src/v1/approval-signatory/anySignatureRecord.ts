import { v4 as uuidV4 } from "uuid";
import type { SignatureRecord } from "./apiModels";

export const anySignatureRecord = (overwrites?: Partial<SignatureRecord>): Required<SignatureRecord> => ({
    id: uuidV4(),
    definitionId: uuidV4(),
    approvalSection: "Test Request Approval",
    approvalType: "Authored (DE)",
    team: "DE",
    role: "DE",
    name: "F. Robert",
    ...overwrites,
});
