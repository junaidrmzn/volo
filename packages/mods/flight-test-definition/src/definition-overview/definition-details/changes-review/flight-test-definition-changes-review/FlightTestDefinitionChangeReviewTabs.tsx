import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@volocopter/design-library-react";
import React from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FlightTestDefinitionChangesOverview } from "@voloiq/flight-test-definition-api/v2";
import { groupSignatureRecordsBySection } from "../../approval-signatory/groupSignatureRecordsBySection";
import { FlightGroundTestPlanChangesReview } from "../flight-ground-test-plan-changes-review/FlightGroundTestPlanChangesReview";
import { ApprovalSignatoryChangesReview } from "./approval-signatory-changes-review/ApprovalSignatoryChangesReview";
import { ChangeHistoryChangeReview } from "./approvals-and-versions-change-review/ChangeHistoryChangeReview";
import { FlightTestRequestChangesReview } from "./flight-test-request-changes-review/FlightTestRequestChangesReview";
import { useFlightTestDefinitionChangesReviewTranslation } from "./translations/useFlightTestDefinitionChangesReviewTranslation";

type Orientation = "vertical" | "horizontal";
type TabVariant = "default" | "menu" | "underline";

export type FlightTestDefinitionChangeReviewTabsProps = {
    flightTestDefinitionOverview: FlightTestDefinitionChangesOverview;
    orientation?: Orientation;
    variant?: TabVariant;
};

export const FlightTestDefinitionChangeReviewTabs = (props: FlightTestDefinitionChangeReviewTabsProps) => {
    const { flightTestDefinitionOverview, orientation = "horizontal", variant = "underline" } = props;
    const { t } = useFlightTestDefinitionChangesReviewTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const {
        procedures,
        manualRequirements,
        windchillRequirements,
        ftiLinks,
        specialComments,
        releasedRevisions,
        revision,
        testHazardAssessments,
        signatureRecords,
        engineeringTestProcedures,
        ...definition
    } = flightTestDefinitionOverview;
    return (
        <Tabs size="md" variant={variant} orientation={orientation}>
            <TabList>
                <Tab>{t("Flight Test Request")}</Tab>
                <Tab>{t("Flight/Ground Test Plan")}</Tab>
                <Tab>{t("Approval Signatory")}</Tab>
                <Tab isDisabled>{t("Attached Files")}</Tab>
                {isFeatureFlagEnabled("vte-1389") && <Tab>{t("Approvals & Versions")}</Tab>}
            </TabList>

            <VStack width="full" alignItems="flex-start" backgroundColor="bgNavigationLayer2">
                <VStack width="full" height={20} alignItems="flex-start" padding={6}>
                    <Text fontSize="md" fontWeight="semibold" lineHeight={6}>
                        {t("FTD")}
                    </Text>
                    <Text fontSize="xs" fontWeight="normal" lineHeight={4}>
                        {t("All Info about the Test Mission")}
                    </Text>
                </VStack>
                <TabPanels>
                    <TabPanel>
                        <FlightTestRequestChangesReview
                            definition={flightTestDefinitionOverview}
                            manualRequirements={manualRequirements}
                            windchillRequirements={windchillRequirements}
                            ftiLinks={ftiLinks}
                            specialComments={specialComments}
                            engineeringTestProcedures={engineeringTestProcedures}
                        />
                    </TabPanel>
                    <TabPanel>
                        <FlightGroundTestPlanChangesReview
                            procedures={procedures}
                            testHazardAssessments={testHazardAssessments}
                            safetyReviewComments={definition.safetyReviewComments}
                            highestRiskLevel={definition.highestRiskLevel}
                        />
                    </TabPanel>
                    <TabPanel>
                        <ApprovalSignatoryChangesReview
                            signatureRecords={groupSignatureRecordsBySection(signatureRecords)}
                        />
                    </TabPanel>
                    <TabPanel />
                    {isFeatureFlagEnabled("vte-1389") && (
                        <TabPanel>
                            <ChangeHistoryChangeReview definition={flightTestDefinitionOverview} />
                        </TabPanel>
                    )}
                    <TabPanel />
                </TabPanels>
            </VStack>
        </Tabs>
    );
};
