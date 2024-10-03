import type { SignatureRecord } from "@voloiq/flight-test-definition-api/v1";
import {
    PartialSignatureRecordHash,
    SignatureRecordSections,
} from "./approval-signatory-section/approvalSignatoryTypes";

const emptySignatureRecordSectionsHash: PartialSignatureRecordHash = {
    "Test Request Approval": {
        "Authored (DE)": { approvalType: "Authored (DE)", approvalSection: "Test Request Approval" },
        "Reviewed (CVE)": { approvalType: "Reviewed (CVE)", approvalSection: "Test Request Approval" },
        "Reviewed (FTE)": { approvalType: "Reviewed (FTE)", approvalSection: "Test Request Approval" },
        Approved: { approvalType: "Approved", approvalSection: "Test Request Approval" },
    },
    "Flight/Ground Test Plan Approval": {
        "Authored (FTE)": { approvalType: "Authored (FTE)", approvalSection: "Flight/Ground Test Plan Approval" },
        "Reviewed (Eng)": { approvalType: "Reviewed (Eng)", approvalSection: "Flight/Ground Test Plan Approval" },
        "Reviewed (FTE)": { approvalType: "Reviewed (FTE)", approvalSection: "Flight/Ground Test Plan Approval" },
        "Technical Approval": {
            approvalType: "Technical Approval",
            approvalSection: "Flight/Ground Test Plan Approval",
        },
    },
    "Flight Test Definition (FTD) Approval": {
        "Safety Release (SRB)": {
            approvalType: "Safety Release (SRB)",
            approvalSection: "Flight Test Definition (FTD) Approval",
        },
    },
};

export const groupSignatureRecordsBySection = (signatureRecords: SignatureRecord[] = []): SignatureRecordSections => {
    const signatureRecordSectionsHash = { ...emptySignatureRecordSectionsHash };

    for (const record of signatureRecords) {
        const { approvalSection, approvalType } = record;
        signatureRecordSectionsHash[approvalSection][approvalType] = record;
    }

    const signatureRecordsBySection: SignatureRecordSections = {
        "Test Request Approval": Object.values(signatureRecordSectionsHash["Test Request Approval"]),
        "Flight/Ground Test Plan Approval": Object.values(
            signatureRecordSectionsHash["Flight/Ground Test Plan Approval"]
        ),
        "Flight Test Definition (FTD) Approval": Object.values(
            signatureRecordSectionsHash["Flight Test Definition (FTD) Approval"]
        ),
    };

    return signatureRecordsBySection;
};
