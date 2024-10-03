import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { ProcedureRead, RiskLevel, TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { ProceduresListChangesOverview } from "./procedure-changes-review/ProceduresListChangesOverview";
import { TestHazardAnalysisChangesReview } from "./test-hazard-analysis-changes-review/TestHazardAnalysisChangesReview";
import { useFlightGroundTestPlanChangesReviewTranslation } from "./translations/useFlightGroundTestPlanChangesReviewTranslation";

export type FlightGroundTestPlanChangesReviewProps = {
    procedures?: ProcedureRead[];
    testHazardAssessments?: TestHazardAssessment[];
    safetyReviewComments?: string;
    highestRiskLevel?: RiskLevel;
};

export const FlightGroundTestPlanChangesReview = (props: FlightGroundTestPlanChangesReviewProps) => {
    const { procedures = [], testHazardAssessments = [], safetyReviewComments, highestRiskLevel } = props;
    const { t } = useFlightGroundTestPlanChangesReviewTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Box h="full" w="full">
            <Tabs size="sm" variant="underline" isLazy>
                <TabList>
                    <Tab>{t("Procedures ({proceduresCount})", { proceduresCount: procedures.length })}</Tab>
                    {isFeatureFlagEnabled("vte-1304-test-hazard-analysis-readonly") && (
                        <Tab>{t("Test Hazard Analysis")}</Tab>
                    )}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ProceduresListChangesOverview procedures={procedures} />
                    </TabPanel>
                    {isFeatureFlagEnabled("vte-1304-test-hazard-analysis-readonly") && (
                        <TabPanel>
                            <TestHazardAnalysisChangesReview
                                testHazardAssessments={testHazardAssessments}
                                safetyReviewComments={safetyReviewComments}
                                highestRiskLevel={highestRiskLevel}
                            />
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
        </Box>
    );
};
