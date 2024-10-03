import { useMemo } from "react";
import { AircraftReleaseConfiguration, useGetFlightTestOrderQuery } from "@voloiq/flight-test-definition-api/v1";
import { useConfigurationsSectionTranslation } from "./translations/useConfigurationsSectionTranslation";

const getDefaultConfiguration = (type: string): AircraftReleaseConfiguration => ({
    type,
    accept: false,
    required: "",
    status: "",
});

export type UseGetAircraftReleaseConfigurationsOptions = {
    flightTestOrderId: string;
};

export const useGetAircraftReleaseConfigurations = (options: UseGetAircraftReleaseConfigurationsOptions) => {
    const { flightTestOrderId } = options;
    const { t } = useConfigurationsSectionTranslation();
    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });
    const aircraftReleaseConfigurations = useMemo(() => {
        // Manually arranging the fields in order necessary because the items get occasionally reordered when refetched.
        const hashedConfigurations = flightTestOrder?.aircraftReleaseConfigurations
            ? Object.fromEntries(
                  flightTestOrder.aircraftReleaseConfigurations.map((configuration) => [
                      configuration.type,
                      configuration,
                  ])
              )
            : {};
        return [
            {
                ...(hashedConfigurations[t("Basic Aircraft Config.")] ??
                    getDefaultConfiguration(t("Basic Aircraft Config."))),
            },
            {
                ...(hashedConfigurations[t("Software Configuration")] ??
                    getDefaultConfiguration(t("Software Configuration"))),
            },
            {
                ...(hashedConfigurations[t("Temporary Equipment")] ??
                    getDefaultConfiguration(t("Temporary Equipment"))),
            },
            { ...(hashedConfigurations[t("Safety Equipment")] ?? getDefaultConfiguration(t("Safety Equipment"))) },
            {
                ...(hashedConfigurations[t("Flight Test Instrumentation")] ??
                    getDefaultConfiguration(t("Flight Test Instrumentation"))),
            },
        ];
    }, [t, flightTestOrder?.aircraftReleaseConfigurations]);

    return {
        aircraftReleaseConfigurations,
    };
};
