import { VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { ConfigurationsSection } from "./configurations-section/ConfigurationsSection";
import { GeneralInformationSection as GeneralInformationSectionV2 } from "./general-information-section-v2/GeneralInformationSection";
import { GeneralInformationSection } from "./general-information-section/GeneralInformationSection";

type AircraftReleaseOverviewProps = {
    flightTestOrderId: string;
};

export const AircraftReleaseOverview = (props: AircraftReleaseOverviewProps) => {
    const { flightTestOrderId } = props;

    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <VStack spacing={6} alignItems="stretch">
            <ConfigurationsSection flightTestOrderId={flightTestOrderId} />
            {isFeatureFlagEnabled("vte-1460") ? (
                <GeneralInformationSectionV2 flightTestOrderId={flightTestOrderId} />
            ) : (
                <GeneralInformationSection flightTestOrderId={flightTestOrderId} />
            )}
        </VStack>
    );
};
