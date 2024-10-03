import type { AnchorNavBarTab } from "@voloiq/flight-test-definition-components";
import { useGeneralOverviewTranslation } from "./translations/useGeneralOverviewTranslation";

type GeneralOverviewTabs = {
    [key in
        | "generalInformation"
        | "testAircraftAndConfiguration"
        | "flightTestCrewAndOccupants"
        | "testMissionAndWeather"]: AnchorNavBarTab;
};

export const useGeneralOverviewAnchorTabs = () => {
    const { t } = useGeneralOverviewTranslation();

    const tabs: GeneralOverviewTabs = {
        generalInformation: { label: t("General Information"), linkId: "general-information" },
        testAircraftAndConfiguration: {
            label: t("Test Aircraft & Configuration"),
            linkId: "test-aircraft-and-configuration",
        },
        flightTestCrewAndOccupants: {
            label: t("Flight Test Crew & Occupants"),
            linkId: "flight-test-crew-and-occupants",
        },
        testMissionAndWeather: { label: t("Test Mission & Weather"), linkId: "test-mission-and-weather" },
    };

    return { tabs };
};
