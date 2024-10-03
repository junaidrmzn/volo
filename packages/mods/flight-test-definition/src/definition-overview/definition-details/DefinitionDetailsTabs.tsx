import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@volocopter/design-library-react";
import React from "react";
import { FlightTestDefinitionResponseBody, TabCountersResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { ApprovalSignatory } from "./approval-signatory/ApprovalSignatory";
import { AttachedFiles } from "./attached-files/AttachedFiles";
import { AttachedFilesTab } from "./attached-files/AttachedFilesTab";
import { AttachedFilesProvider } from "./attached-files/attached-files-context/AttachedFilesProvider";
import { ChangeHistory } from "./change-history/ChangeHistory";
import { FlightGroundTestPlan } from "./flight-ground-test-plan/FlightGroundTestPlan";
import { FlightTestRequest } from "./flight-test-request/FlightTestRequest";
import { useDefinitionDetailsTranslation } from "./translations/useDefinitionDetailsTranslation";

type Orientation = "vertical" | "horizontal";
type TabVariant = "default" | "menu" | "underline";

export type DefinitionDetailsTabsProps = {
    definition: FlightTestDefinitionResponseBody;
    tabCounters?: TabCountersResponseBody;
    orientation?: Orientation;
    variant?: TabVariant;
};

export const DefinitionDetailsTabs = (props: DefinitionDetailsTabsProps) => {
    const { definition, tabCounters, orientation = "horizontal", variant = "underline" } = props;
    const { t } = useDefinitionDetailsTranslation();

    return (
        <Tabs size="md" variant={variant} isLazy orientation={orientation}>
            <TabList width={48}>
                <Tab>{t("Flight Test Request")}</Tab>
                <Tab>{t("Flight/Ground Test Plan")}</Tab>
                <Tab>{t("Approval Signatory")}</Tab>
                <AttachedFilesProvider>
                    <AttachedFilesTab attachedFilesCount={tabCounters?.fileCount} />
                </AttachedFilesProvider>
                <Tab>{t("Approvals & Versions")}</Tab>
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
                        <FlightTestRequest
                            definition={definition}
                            requirementsCount={tabCounters?.requirementCount}
                            ftiParameterCount={tabCounters?.ftiCount}
                        />
                    </TabPanel>
                    <TabPanel>
                        <FlightGroundTestPlan proceduresCount={tabCounters?.procedureCount} />
                    </TabPanel>
                    <TabPanel>
                        <ApprovalSignatory />
                    </TabPanel>
                    <TabPanel>
                        <AttachedFiles />
                    </TabPanel>
                    <TabPanel>
                        <ChangeHistory />
                    </TabPanel>
                </TabPanels>
            </VStack>
        </Tabs>
    );
};
