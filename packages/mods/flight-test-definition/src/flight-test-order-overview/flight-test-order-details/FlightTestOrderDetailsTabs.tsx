import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { AircraftReleaseOverview } from "./aircraft-release/AircraftReleaseOverview";
import { AircraftReleaseOverviewV2 } from "./aircraft-release/AircraftReleaseOverviewV2";
import { TestMissionOverview } from "./test-mission/TestMissionOverview";
import { TestPointSequenceOverviewSection } from "./test-mission/test-point-selection/TestPointSequenceOverviewSection";
import { useFlightTestOrderDetailsTranslation } from "./translations/useFlightTestOrderDetailsTranslation";
import { useTabNavigation } from "./useTabNavigation";

type Orientation = "vertical" | "horizontal";
type TabVariant = "default" | "menu" | "underline";

type FlightTestOrderDetailsTabsProps = {
    flightTestOrderId: string;
    orientation?: Orientation;
    variant?: TabVariant;
};

const FlightTestOrderDetailsTab: FCC<{ isActive: boolean; isIndented?: boolean }> = (props) => {
    const { children, isActive, isIndented } = props;

    return (
        <Tab>
            <Text pl={isIndented ? 3 : 0} pr={3} fontWeight={isActive ? "semibold" : "normal"} fontSize="sm">
                {children}
            </Text>
        </Tab>
    );
};

export const FlightTestOrderDetailsTabs = (props: FlightTestOrderDetailsTabsProps) => {
    const { currentIndex, handleTabChange } = useTabNavigation("tabId");

    const { flightTestOrderId, orientation = "horizontal", variant = "underline" } = props;
    const { t } = useFlightTestOrderDetailsTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <Tabs
            size="md"
            variant={variant}
            isLazy
            orientation={orientation}
            defaultIndex={currentIndex}
            onChange={handleTabChange}
        >
            <TabList>
                {isFeatureFlagEnabled("vte-1590-test-points-sequences-redesign") ? (
                    <>
                        <FlightTestOrderDetailsTab isActive={currentIndex === 0}>
                            {t("Test Mission")}
                        </FlightTestOrderDetailsTab>
                        <FlightTestOrderDetailsTab isActive={currentIndex === 1} isIndented>
                            {t("Test Points Selection")}
                        </FlightTestOrderDetailsTab>
                        <FlightTestOrderDetailsTab isActive={currentIndex === 2} isIndented>
                            {t("Aircraft Release for Flight")}
                        </FlightTestOrderDetailsTab>
                    </>
                ) : (
                    <>
                        <Tab>{t("Part 1 - Test Mission")}</Tab>
                        <Tab>{t("Part 2 - Aircraft Release for Flight")}</Tab>
                    </>
                )}
            </TabList>
            <TabPanels>
                <TabPanel>
                    <TestMissionOverview flightTestOrderId={flightTestOrderId} />
                </TabPanel>
                {isFeatureFlagEnabled("vte-1590-test-points-sequences-redesign") && (
                    <TabPanel>
                        <TestPointSequenceOverviewSection flightTestOrderId={flightTestOrderId} />
                    </TabPanel>
                )}
                <TabPanel>
                    {isFeatureFlagEnabled("vte-1520") ? (
                        <AircraftReleaseOverviewV2 flightTestOrderId={flightTestOrderId} />
                    ) : (
                        <AircraftReleaseOverview flightTestOrderId={flightTestOrderId} />
                    )}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
