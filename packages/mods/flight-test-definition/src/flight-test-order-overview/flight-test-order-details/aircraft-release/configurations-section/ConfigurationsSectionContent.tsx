import { VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { AircraftReleaseConfiguration } from "@voloiq/flight-test-definition-api/v1";
import { ConfigurationCard } from "./ConfigurationCard";
import { ConfigurationCardV2 } from "./ConfigurationCardV2";

export type ConfigurationsSectionContentProps = {
    configurations: AircraftReleaseConfiguration[];
};

export const ConfigurationsSectionContent = (props: ConfigurationsSectionContentProps) => {
    const { configurations } = props;
    const { isFeatureFlagEnabled } = useFeatureFlags();
    return configurations && configurations.length > 0 ? (
        <VStack w="full" spacing={3}>
            {configurations.map((configuration) =>
                isFeatureFlagEnabled("vte-1520") ? (
                    <ConfigurationCardV2 key={configuration.type} configuration={configuration} />
                ) : (
                    <ConfigurationCard key={configuration.type} configuration={configuration} />
                )
            )}
        </VStack>
    ) : null;
};
