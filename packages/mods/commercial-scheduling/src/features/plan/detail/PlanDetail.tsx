import {
    AlertStatusIcon,
    Box,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from "@volocopter/design-library-react";
import { usePlanAlertIcon, usePlanTabIcon } from "@voloiq/commercial-scheduling-utils";
import { Offer } from "../../offer/Offer";
import { PlanSummaryOverview } from "../../plan-summary/PlanSummaryOverview";
import { Price } from "../../price/Price";
import { ScheduleItemOverview } from "../../schedule-item/ScheduleItemOverview";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { PlanDetailHeader } from "./PlanDetailHeader";
import { usePlanDetail } from "./usePlanDetail";

export const PlanDetail = () => {
    const { activeTabIndex, plan, onTabIndexChange, navigateBack, refetchPlan } = usePlanDetail();
    const { hasPrice, hasOffer, hasSchedule, scheduleItemWrtConnectionState: connectionsState } = plan || {};
    const scheduleTabIcon = usePlanTabIcon({ isApproved: hasSchedule });
    const priceTabIcon = usePlanTabIcon({ isApproved: hasPrice });
    const offerTabIcon = usePlanTabIcon({ isApproved: hasOffer });
    const planTabIcon = usePlanAlertIcon({ connectionsState });
    const { t } = usePlanTranslation();

    const scheduleTab = () => {
        onTabIndexChange(0);
    };

    return plan ? (
        <VStack width="full" height="full">
            <PlanDetailHeader
                activeTabIndex={activeTabIndex}
                plan={plan}
                navigateBack={navigateBack}
                refetchPlan={refetchPlan}
            />
            <Box boxSize="full">
                <Tabs
                    variant="menu"
                    size="md"
                    orientation="vertical"
                    isLazy
                    index={activeTabIndex}
                    onChange={onTabIndexChange}
                >
                    <TabList>
                        <Tab>
                            {t("detail.tabs.schedule")}
                            <Icon icon={scheduleTabIcon} size={4} />
                        </Tab>
                        <Tab isDisabled={!hasSchedule}>
                            {t("detail.tabs.pricing")}
                            <Icon icon={priceTabIcon} size={4} />
                        </Tab>
                        <Tab isDisabled={!hasSchedule}>
                            {t("detail.tabs.offering")}
                            <Icon icon={offerTabIcon} size={4} />
                        </Tab>
                        <Tab isDisabled={!hasPrice || !hasOffer}>
                            {t("detail.tabs.plan")}
                            {hasPrice && hasOffer ? <AlertStatusIcon variant={planTabIcon} size={4} /> : null}
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ScheduleItemOverview plan={plan} />
                        </TabPanel>
                        <TabPanel>
                            <Price plan={plan} refetchPlan={refetchPlan} />
                        </TabPanel>
                        <TabPanel>
                            <Offer plan={plan} refetchPlan={refetchPlan} />
                        </TabPanel>
                        <TabPanel>
                            <PlanSummaryOverview changeTab={scheduleTab} plan={plan} reloadPlan={refetchPlan} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </VStack>
    ) : null;
};
