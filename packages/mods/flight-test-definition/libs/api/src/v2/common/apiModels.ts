export const FlightTestDefinitionRequestStatusList = [
    "DRAFT",
    "FLIGHT TEST REVIEW",
    "ENGINEERING REVIEW",
    "TECHNICAL APPROVAL",
    "SAFETY APPROVAL",
] as const;
export type FlightTestDefinitionRequestStatus = typeof FlightTestDefinitionRequestStatusList[number];
