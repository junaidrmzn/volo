import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import type { AircraftType } from "@voloiq/aircraft-management-api/v1";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { AircraftTypeDetailTabFlightplanning } from "./AircraftTypeDetailTabFlightplanning";
import { AircraftTypeDetailTabGeneral } from "./AircraftTypeDetailTabGeneral";
import { AircraftTypeDetailTabWeather } from "./AircraftTypeDetailTabWeather";

type AircraftTypeDetailProps = {
    aircraftType: AircraftType;
};
export const AircraftTypeDetail = (props: AircraftTypeDetailProps) => {
    const { aircraftType } = props;
    const { t } = useResourcesTranslation();

    return (
        <Tabs>
            <TabList>
                <Tab>{t("aircraft-type.detail.tabs.general")}</Tab>
                <Tab>{t("aircraft-type.detail.tabs.flightPlanning")}</Tab>
                <Tab>{t("aircraft-type.detail.tabs.weather")}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>{aircraftType && <AircraftTypeDetailTabGeneral aircraftType={aircraftType} />}</TabPanel>
                <TabPanel>
                    {aircraftType && <AircraftTypeDetailTabFlightplanning aircraftType={aircraftType} />}
                </TabPanel>
                <TabPanel>{aircraftType && <AircraftTypeDetailTabWeather aircraftType={aircraftType} />}</TabPanel>
            </TabPanels>
        </Tabs>
    );
};
