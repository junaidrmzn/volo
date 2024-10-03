import {
    Button,
    Header,
    SplitViewLayout,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@volocopter/design-library-react";
import React from "react";
import { useNavigate, useParams } from "@voloiq/routing";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { VertiportDetailTabGeneral } from "./VertiportDetailTabGeneral";
import { VertiportDetailTabLocalisation } from "./VertiportDetailTabLocalisation";
import { VertiportDetailTabLocation } from "./VertiportDetailTabLocation";
import { VertiportDetailTabOperationalData } from "./VertiportDetailTabOperationalData";
import { VertiportDetailTabResources } from "./VertiportDetailTabResources";
import { useVertiportDetails } from "./useVertiportDetails";

export const VertiportDetail = () => {
    const { vertiportId } = useParams();
    const vertiport = useVertiportDetails(vertiportId || "-1");
    const { t } = useVertiportTranslation();
    const navigation = useNavigate();

    const goBackToOverview = () => navigation("./../..");

    return (
        <SplitViewLayout>
            <SplitViewLayout.Header>
                <Header>
                    <Header.Title
                        title={`${t("vertiport.detail.heading")} ${vertiport.vertiport?.name ?? ""}`}
                        hasReturnMarker
                        onClick={goBackToOverview}
                        returnMarkerAriaLabel={t("generic.back button")}
                    />
                    <Header.Controls>
                        <Button
                            variant="primary"
                            onClick={() => {
                                navigation(`./../../edit/${vertiportId}`);
                            }}
                        >
                            {t("generic.edit button")}
                        </Button>
                    </Header.Controls>
                </Header>
            </SplitViewLayout.Header>
            <SplitViewLayout.Bottom>
                <Tabs>
                    <TabList width="fit-content">
                        <Tab>{t("detail.tabs.general")}</Tab>
                        <Tab>{t("detail.tabs.location")}</Tab>
                        <Tab>{t("detail.tabs.operations")}</Tab>
                        <Tab>{t("detail.tabs.localisation")}</Tab>
                        <Tab>{t("detail.tabs.resources")}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {vertiport && vertiport.vertiport && (
                                <VertiportDetailTabGeneral vertiport={vertiport.vertiport} />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {vertiport && vertiport.vertiport && vertiport.vertiportInitialValues && (
                                <VertiportDetailTabLocation vertiport={vertiport.vertiport} />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {vertiport && vertiport.vertiport && vertiport.vertiportInitialValues && (
                                <VertiportDetailTabOperationalData vertiport={vertiport.vertiport} />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {vertiport && vertiport.vertiport && vertiport.vertiportInitialValues && (
                                <VertiportDetailTabLocalisation vertiport={vertiport.vertiport} />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {vertiport && vertiport.vertiport && vertiport.vertiportInitialValues && (
                                <VertiportDetailTabResources vertiport={vertiport.vertiport} />
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </SplitViewLayout.Bottom>
        </SplitViewLayout>
    );
};
