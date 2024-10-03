import { Text, VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { AnchorNavBar, SectionCard } from "@voloiq/flight-test-definition-components";
import { AircraftConfigurationSection } from "./aircraft-configuration/AircraftConfigurationSection";
import { FlightTestCrewAndOccupantsSection } from "./flight-test-crew-and-occupants/FlightTestCrewAndOccupantsSection";
import { FlightTestCrewAndOccupantsSectionV2 } from "./flight-test-crew-and-occupants/FlightTestCrewAndOccupantsSectionV2";
import { GeneralInformationSection } from "./general-information/GeneralInformationSection";
import { TestAircraftSection } from "./test-aircraft/TestAircraftSection";
import { TestMissionAndWeatherSection } from "./test-mission-and-weather/TestMissionAndWeatherSection";
import { useGeneralOverviewTranslation } from "./translations/useGeneralOverviewTranslation";
import { useGeneralOverviewAnchorTabs } from "./useGeneralOverviewAnchorTabs";

export type GeneralOverviewProps = {
    flightTestOrderId: string;
};

export const GeneralOverview = (props: GeneralOverviewProps) => {
    const { flightTestOrderId } = props;

    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { t } = useGeneralOverviewTranslation();
    const { tabs } = useGeneralOverviewAnchorTabs();

    return (
        <VStack p={3}>
            <VStack
                h="full"
                w="full"
                borderBottomColor="semanticUnknownSubtle"
                borderBottomWidth={1}
                alignItems="flex-start"
                flex={1}
                px={0}
                pt={1}
                pb={3}
            >
                <Text fontWeight="semibold">{t("Test Mission")}</Text>
                <Text fontSize="xs">
                    {t(
                        "Here you will find the Information about the Flight Test Order (FTO) for creating a flight mission."
                    )}
                </Text>
            </VStack>
            <AnchorNavBar tabs={Object.values(tabs)} />

            {isFeatureFlagEnabled("vte-1599") ? (
                <SectionCard id={tabs.generalInformation.linkId}>
                    <SectionCard.Header>{tabs.generalInformation.label}</SectionCard.Header>
                    <SectionCard.Content>
                        <GeneralInformationSection flightTestOrderId={flightTestOrderId} />
                    </SectionCard.Content>
                </SectionCard>
            ) : (
                <GeneralInformationSection flightTestOrderId={flightTestOrderId} />
            )}

            {isFeatureFlagEnabled("vte-1599") ? (
                <SectionCard id={tabs.testAircraftAndConfiguration.linkId}>
                    <SectionCard.Header>{tabs.testAircraftAndConfiguration.label}</SectionCard.Header>
                    <SectionCard.Content>
                        <>
                            <TestAircraftSection flightTestOrderId={flightTestOrderId} />
                            <AircraftConfigurationSection flightTestOrderId={flightTestOrderId} />
                        </>
                    </SectionCard.Content>
                </SectionCard>
            ) : (
                <>
                    <TestAircraftSection flightTestOrderId={flightTestOrderId} />
                    <AircraftConfigurationSection flightTestOrderId={flightTestOrderId} />
                </>
            )}

            {isFeatureFlagEnabled("vte-1599") ? (
                <SectionCard id={tabs.flightTestCrewAndOccupants.linkId}>
                    <SectionCard.Header>{tabs.flightTestCrewAndOccupants.label}</SectionCard.Header>
                    <SectionCard.Content>
                        <FlightTestCrewAndOccupantsSectionV2 flightTestOrderId={flightTestOrderId} />
                    </SectionCard.Content>
                </SectionCard>
            ) : (
                <FlightTestCrewAndOccupantsSection flightTestOrderId={flightTestOrderId} />
            )}

            {isFeatureFlagEnabled("vte-1599") ? (
                <SectionCard id={tabs.testMissionAndWeather.linkId}>
                    <SectionCard.Header>{tabs.testMissionAndWeather.label}</SectionCard.Header>
                    <SectionCard.Content>
                        <TestMissionAndWeatherSection flightTestOrderId={flightTestOrderId} />
                    </SectionCard.Content>
                </SectionCard>
            ) : (
                <TestMissionAndWeatherSection flightTestOrderId={flightTestOrderId} />
            )}
        </VStack>
    );
};
