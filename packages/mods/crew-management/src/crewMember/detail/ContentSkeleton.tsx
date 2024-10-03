import { Skeleton, SplitViewLayout, Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import React from "react";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export const ContentSkeleton = () => {
    const { t } = useCrewApiTranslation();

    return (
        <SplitViewLayout>
            <SplitViewLayout.Bottom>
                <Tabs>
                    <TabList width="fit-content">
                        <Tab>{t("detail.tabs.general")}</Tab>
                        <Tab>{t("detail.tabs.roles")}</Tab>
                        <Tab>{t("detail.tabs.other")}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Skeleton width="50%" height="50px" isLoading />
                        </TabPanel>
                        <TabPanel>
                            <Skeleton width="50%" height="50px" isLoading />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </SplitViewLayout.Bottom>
        </SplitViewLayout>
    );
};
