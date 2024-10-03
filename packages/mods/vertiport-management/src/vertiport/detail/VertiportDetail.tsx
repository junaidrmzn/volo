import { SplitViewLayout, Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { VertiportDetailHeader } from "./VertiportDetailHeader";
import { VertiportDetailTabGeneral } from "./VertiportDetailTabGeneral";
import { VertiportDetailTabLocalisation } from "./VertiportDetailTabLocalisation";
import { VertiportDetailTabLocation } from "./VertiportDetailTabLocation";
import { VertiportDetailTabOperationalData } from "./VertiportDetailTabOperationalData";
import { VertiportDetailTabResources } from "./VertiportDetailTabResources";
import { EquipmentsTab } from "./equipments/EquipmentsTab";
import { PadsSection } from "./pads/PadsSection";
import { PadsTab } from "./pads/PadsTab";
import { PadsProvider } from "./pads/pads-context/PadsProvider";
import { useActiveTab } from "./useActiveTabs";
import { VertiportProvider } from "./vertiport-context/VertiportProvider";

export type VertiportDetailsPageProps = {
    vertiport: Vertiport;
};

export const VertiportDetail = (props: VertiportDetailsPageProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();

    const { defaultIndex, handleTabChange } = useActiveTab();

    return (
        <SplitViewLayout>
            <SplitViewLayout.Top>{vertiport && <VertiportDetailHeader vertiport={vertiport} />}</SplitViewLayout.Top>
            <SplitViewLayout.Bottom>
                <Tabs defaultIndex={defaultIndex} onChange={handleTabChange}>
                    <VertiportProvider vertiport={vertiport}>
                        <PadsProvider>
                            <TabList width="fit-content">
                                <Tab>{t("detail.tabs.general")}</Tab>
                                <Tab>{t("detail.tabs.location")}</Tab>
                                <Tab>{t("detail.tabs.operations")}</Tab>
                                <Tab>{t("detail.tabs.localisation")}</Tab>
                                <Tab>{t("detail.tabs.resources")}</Tab>
                                <Tab>{t("detail.tabs.equipment")}</Tab>
                                <PadsTab />
                            </TabList>
                            <TabPanels>
                                <TabPanel>{vertiport && <VertiportDetailTabGeneral vertiport={vertiport} />}</TabPanel>
                                <TabPanel>{vertiport && <VertiportDetailTabLocation vertiport={vertiport} />}</TabPanel>
                                <TabPanel>
                                    {vertiport && <VertiportDetailTabOperationalData vertiport={vertiport} />}
                                </TabPanel>
                                <TabPanel>
                                    {vertiport && <VertiportDetailTabLocalisation vertiport={vertiport} />}
                                </TabPanel>
                                <TabPanel>
                                    {vertiport && <VertiportDetailTabResources vertiport={vertiport} />}
                                </TabPanel>
                                <TabPanel>
                                    <EquipmentsTab vertiport={vertiport} />
                                </TabPanel>
                                <TabPanel>
                                    <PadsSection vertiport={vertiport} />
                                </TabPanel>
                            </TabPanels>
                        </PadsProvider>
                    </VertiportProvider>
                </Tabs>
            </SplitViewLayout.Bottom>
        </SplitViewLayout>
    );
};
