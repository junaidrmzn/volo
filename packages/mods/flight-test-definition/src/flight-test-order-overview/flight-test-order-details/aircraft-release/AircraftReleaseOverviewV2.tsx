import { VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { AnchorNavBar, SectionCard } from "@voloiq/flight-test-definition-components";
import { ConfigurationsSection } from "./configurations-section/ConfigurationsSection";
import { GeneralInformationSection as GeneralInformationSectionV2 } from "./general-information-section-v2/GeneralInformationSection";
import { GeneralInformationSection } from "./general-information-section/GeneralInformationSection";
import { useAircraftReleaseTranslations } from "./translations/useAircraftReleaseTranslations";
import { useAircraftReleaseOverviewV2Tabs } from "./useAircraftReleaseOverviewV2Tabs";

type AircraftReleaseOverviewV2Props = {
    flightTestOrderId: string;
};

export const AircraftReleaseOverviewV2 = (props: AircraftReleaseOverviewV2Props) => {
    const { flightTestOrderId } = props;

    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { t } = useAircraftReleaseTranslations();
    const { tabs } = useAircraftReleaseOverviewV2Tabs();

    return (
        <VStack spacing={6} alignItems="stretch">
            <AnchorNavBar tabs={Object.values(tabs)} />
            {isFeatureFlagEnabled("vte-1460") ? (
                <SectionCard id={tabs.generalInformation.linkId}>
                    <SectionCard.Header>{t("General Information")}</SectionCard.Header>
                    <SectionCard.Content>
                        <GeneralInformationSectionV2 flightTestOrderId={flightTestOrderId} />
                    </SectionCard.Content>
                </SectionCard>
            ) : (
                <GeneralInformationSection flightTestOrderId={flightTestOrderId} />
            )}
            <SectionCard id={tabs.configutation.linkId}>
                <SectionCard.Header>{t("Configuration")}</SectionCard.Header>
                <SectionCard.Content>
                    <ConfigurationsSection flightTestOrderId={flightTestOrderId} />
                </SectionCard.Content>
            </SectionCard>
        </VStack>
    );
};
