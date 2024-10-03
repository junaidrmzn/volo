import { anySignatureRecord } from "@voloiq/flight-test-definition-api/v1";

export const testRequestAuthoredDE = anySignatureRecord({
    approvalSection: "Test Request Approval",
    approvalType: "Authored (DE)",
    team: "DE",
    role: "DE",
    name: "O. Suttiwerawat",
});

export const testRequestReviewedCVE = anySignatureRecord({
    approvalSection: "Test Request Approval",
    approvalType: "Reviewed (CVE)",
    team: "DE",
    role: "DE",
    name: "P. Vaz",
});

export const testRequestReviewedFTE = anySignatureRecord({
    approvalSection: "Test Request Approval",
    approvalType: "Reviewed (FTE)",
    team: "FT",
    role: "FTE",
    name: "F. Auricchio",
});

export const testRequestApproved = anySignatureRecord({
    approvalSection: "Test Request Approval",
    approvalType: "Approved",
    team: "DE",
    role: "HoDE",
    name: "T. Campbell",
});

export const testRequestSignatureRecords = [
    testRequestAuthoredDE,
    testRequestReviewedCVE,
    testRequestReviewedFTE,
    testRequestApproved,
];

export const flightGroundTestPlanAuthoredFTE = anySignatureRecord({
    approvalSection: "Flight/Ground Test Plan Approval",
    approvalType: "Authored (FTE)",
    team: "FT",
    role: "CFTE",
    name: "F. Robert",
});

export const flightGroundTestPlanReviewedEng = anySignatureRecord({
    approvalSection: "Flight/Ground Test Plan Approval",
    approvalType: "Reviewed (Eng)",
    team: "DE FCS",
    role: "FCS ENG",
    name: "B. Bhadi",
});

export const flightGroundTestPlanReviewedFTE = anySignatureRecord({
    approvalSection: "Flight/Ground Test Plan Approval",
    approvalType: "Reviewed (FTE)",
    team: "FT",
    role: "FTE",
    name: "D. Schröder",
});

export const flightGroundTestPlanTechnicalApproval = anySignatureRecord({
    approvalSection: "Flight/Ground Test Plan Approval",
    approvalType: "Technical Approval",
    team: "FT",
    role: "HoFT",
    name: "G. Struthers",
});

export const flightGroundTestPlanSignatureRecords = [
    flightGroundTestPlanAuthoredFTE,
    flightGroundTestPlanReviewedEng,
    flightGroundTestPlanReviewedFTE,
    flightGroundTestPlanTechnicalApproval,
];

export const flightTestDefinitionSafetyReleasedSRB = anySignatureRecord({
    approvalSection: "Flight Test Definition (FTD) Approval",
    approvalType: "Safety Release (SRB)",
    team: "FT",
    role: "HoFT",
    name: "G. Struthers",
});

export const flightTestDefinitionSignatureRecords = [flightTestDefinitionSafetyReleasedSRB];

export const allSignatureRecords = [
    ...testRequestSignatureRecords,
    ...flightGroundTestPlanSignatureRecords,
    ...flightTestDefinitionSignatureRecords,
];
