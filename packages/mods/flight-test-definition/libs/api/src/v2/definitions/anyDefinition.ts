import { v4 as uuidV4 } from "uuid";
import type {
    FlightTestDefinitionOverviewListResponseBody,
    FlightTestDefinitionOverviewResponseBody,
    FlightTestDefinitionResponseBody,
    TabCountersResponseBody,
} from "@voloiq/flight-test-definition-api/v2";

const anyTipTapJson = (text?: string) => ({
    type: "doc",
    content: [
        {
            type: "paragraph",
            content: [
                {
                    type: "text",
                    text: text || "any text",
                },
            ],
        },
    ],
});

export const anyDefinition = (
    overwrites?: Partial<FlightTestDefinitionResponseBody>
): Required<FlightTestDefinitionResponseBody> => ({
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
    testArticle: JSON.stringify(anyTipTapJson("short test article")),
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
    safetyRecommendations: "Please follow standard Safety Recommendations",
    model: "2x",
    ...overwrites,
});

export const anyDefinitionByGroup = (
    overwrites?: Partial<
        Omit<FlightTestDefinitionOverviewListResponseBody, "value"> & {
            value: Partial<FlightTestDefinitionOverviewResponseBody>[];
        }
    >
): Required<FlightTestDefinitionOverviewListResponseBody> => ({
    id: uuidV4(),
    ata: 27,
    ...overwrites,
    value: overwrites?.value
        ? overwrites.value.map((value) => ({
              ...anyDefinition(value),
              requirementCount: 0,
              ftiCount: 0,
              fileCount: 0,
          }))
        : [
              {
                  ...anyDefinition(),
                  requirementCount: 0,
                  ftiCount: 0,
                  fileCount: 0,
              },
          ],
});

export const anyTabCounters = (): Required<TabCountersResponseBody> => ({
    ftdId: uuidV4(),
    procedureCount: 0,
    fileCount: 0,
    requirementCount: 0,
    ftiCount: 0,
});
