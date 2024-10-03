import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useTabNavigation } from "../useTabNavigation";
import { AssociatedProceduresOverview } from "./associated-procedures/AssociatedProceduresOverview";
import { GeneralOverview } from "./general/GeneralOverview";
import { TestPointSequenceOverviewSection } from "./test-point-selection/TestPointSequenceOverviewSection";
import { useTestMissionTranslation } from "./translations/useTestMissionTranslation";

export type TestMissionOverviewProps = {
    flightTestOrderId: string;
};

export const TestMissionOverview = (props: TestMissionOverviewProps) => {
    const { flightTestOrderId } = props;
    const { currentIndex, handleTabChange } = useTabNavigation("innerTabId");

    const { t } = useTestMissionTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return isFeatureFlagEnabled("vte-1590-test-points-sequences-redesign") ? (
        <GeneralOverview flightTestOrderId={flightTestOrderId} />
    ) : (
        <Tabs size="sm" variant="underline" isLazy defaultIndex={currentIndex} onChange={handleTabChange}>
            <TabList>
                <Tab>{t("General")}</Tab>
                <Tab>{t("Test Points Selection")}</Tab>
                <Tab>{t("Associated Procedures")}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <GeneralOverview flightTestOrderId={flightTestOrderId} />
                </TabPanel>
                <TabPanel>
                    <TestPointSequenceOverviewSection flightTestOrderId={flightTestOrderId} />
                </TabPanel>
                <TabPanel>
                    <AssociatedProceduresOverview flightTestOrderId={flightTestOrderId} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
