import { v4 as uuidV4 } from "uuid";
import { anyTipTapJson } from "../../common";
import { FlightTestDefinitionChangesOverview } from "./apiModels";

export const anyDefinitionRevision = (
    overwrites?: Partial<FlightTestDefinitionChangesOverview>
): Required<FlightTestDefinitionChangesOverview> => ({
    id: uuidV4(),
    ftdId: "FTD-V21-27-041-A00",
    title: "FCS Commission flight Integration off",
    masterModel: "2X",
    msn: "01",
    ata: 27,
    testNumber: 41,
    revision: "A00",
    summary: JSON.stringify(anyTipTapJson("short summary")),
    scope: JSON.stringify(anyTipTapJson("short scope")),
    testArticle: JSON.stringify(anyTipTapJson("short test article from myself")),
    requesterName: "John Doe",
    status: "DRAFT",
    requestStatus: "DRAFT",
    testType: "FLIGHT",
    updateTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    createTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    inactive: false,
    releasedRevisions: [],
    specialEquipment: "specialEquipment test",
    dataAnalysisPlan: "dataAnalysisPlan test",
    safetyReviewComments: "safetyReviewComments test",
    highestRiskLevel: "MEDIUM",
    isReadyForRevision: true,
    testHazardAssessments: [],
    manualRequirements: [],
    procedures: [],
    ftiLinks: [],
    specialComments: [],
    windchillRequirements: [],
    signatureRecords: [],
    engineeringTestProcedures: [],
    safetyRecommendations: "Please follow standard Safety Recommendations",
    model: "2x",
    ...overwrites,
});
