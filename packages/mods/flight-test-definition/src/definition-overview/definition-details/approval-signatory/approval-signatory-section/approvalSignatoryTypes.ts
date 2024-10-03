import { SignatureRecord } from "@voloiq/flight-test-definition-api/v1";

export type PartialSignatureRecord = {
    [key in "approvalType" | "approvalSection"]: SignatureRecord[key];
} & {
    [key in "team" | "role" | "name" | "id"]?: SignatureRecord[key];
};

export type PartialSignatureRecordHash = {
    [approvalSectionKey in SignatureRecord["approvalSection"]]: {
        [approvalTypeKey in SignatureRecord["approvalType"]]?: PartialSignatureRecord;
    };
};

export type SignatureRecordSections = Record<SignatureRecord["approvalSection"], PartialSignatureRecord[]>;
