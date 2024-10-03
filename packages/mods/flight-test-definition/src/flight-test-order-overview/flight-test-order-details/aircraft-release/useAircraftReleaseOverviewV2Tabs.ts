import { AnchorNavBarTab } from "@voloiq/flight-test-definition-components";
import { useAircraftReleaseTranslations } from "./translations/useAircraftReleaseTranslations";

type GeneralOverviewTabs = {
    [key in "generalInformation" | "configutation"]: AnchorNavBarTab;
};

export const useAircraftReleaseOverviewV2Tabs = () => {
    const { t } = useAircraftReleaseTranslations();
    const tabs: GeneralOverviewTabs = {
        generalInformation: {
            label: t("General Information"),
            linkId: "general-information",
        },
        configutation: { label: t("Configuration"), linkId: "configuration" },
    };

    return { tabs };
};
