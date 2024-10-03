import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import { ProceduresSection } from "./procedures/procedures-section/ProceduresSection";
import { ProceduresTab } from "./procedures/procedures-tab/ProceduresTab";
import { TestHazardAnalysis } from "./test-hazard-analysis/TestHazardAnalysis";
import { useFlightGroundTestPlanTranslation } from "./translations/useFlightGroundTestPlanTranslation";

export type FlightGroundTestPlanProps = {
    proceduresCount?: number;
};

export const FlightGroundTestPlan = (props: FlightGroundTestPlanProps) => {
    const { proceduresCount = 0 } = props;
    const { t } = useFlightGroundTestPlanTranslation();

    return (
        <Tabs size="sm" variant="underline" isLazy>
            <TabList>
                <ProceduresTab proceduresCount={proceduresCount} />
                <Tab>{t("Test Hazard Analysis")}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <ProceduresSection />
                </TabPanel>
                <TabPanel>
                    <TestHazardAnalysis />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
