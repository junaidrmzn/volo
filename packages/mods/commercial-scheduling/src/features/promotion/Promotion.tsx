import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import { DiscountOverview } from "../discount/DiscountOverview";
import { EarlyAccessOverview } from "../early-access/EarlyAccessOverview";
import { usePromotionTranslation } from "./translations/usePromotionTranslation";
import { usePromotionPage } from "./usePromotionPage";

export const Promotion = () => {
    const { removeQueryParams } = usePromotionPage();
    const { t } = usePromotionTranslation();

    return (
        <Box boxSize="full" p={6}>
            <Tabs variant="menu" size="md" orientation="vertical" defaultIndex={0} isLazy onChange={removeQueryParams}>
                <TabList>
                    <Tab>{t("tabs.discounts")}</Tab>
                    <Tab>{t("tabs.earlyAccess")}</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <DiscountOverview />
                    </TabPanel>
                    <TabPanel>
                        <EarlyAccessOverview />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};
