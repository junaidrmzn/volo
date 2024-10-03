import { v4 as uuidV4 } from "uuid";
import { TestHazardAssessment } from "./apiModels";

export const anyTestHazardAssessment = (overwrites?: Partial<TestHazardAssessment>): TestHazardAssessment => ({
    id: uuidV4(),
    applicability: "MANNED",
    hazard: "EPU/ Rotor load/ Vibration limit exceedance (during EPU failure injection)",
    hazardGroup: "GENERIC_HAZARDS",
    inactive: false,
    preMitigationRiskLevel: "MEDIUM",
    residualRiskLevel: "VERY_HIGH",
    linkedDefinitions: [
        {
            id: uuidV4(),
            ftdId: "FTD-V21-21-000-A01",
        },
    ],
    ...overwrites,
});
