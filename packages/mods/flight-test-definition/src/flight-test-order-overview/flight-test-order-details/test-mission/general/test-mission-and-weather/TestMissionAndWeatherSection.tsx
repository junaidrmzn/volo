import { VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrderPatch } from "@voloiq/flight-test-definition-api/v2";
import { useGetFlightTestOrderQuery, useOptimisticEditFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { mapDateToInitialValue } from "@voloiq/flight-test-definition-utils";
import { TestMissionAndWeatherBody } from "./TestMissionAndWeatherBody";
import { TestMissionAndWeatherFormControls } from "./TestMissionAndWeatherFormControls";
import { TestMissionBodyV2 } from "./TestMissionBodyV2";
import { WeatherBodyV2 } from "./WeatherBodyV2";
import { useTestMissionAndWeatherTranslation } from "./translations/useTestMissionAndWeatherTranslation";
import { useTestMissionAndWeatherFormSchema } from "./useTestMissionAndWeatherFormSchema";

export type TestMissionAndWeatherSectionProps = {
    flightTestOrderId: string;
};

export const TestMissionAndWeatherSection = (props: TestMissionAndWeatherSectionProps) => {
    const { flightTestOrderId } = props;
    const { formSchema } = useTestMissionAndWeatherFormSchema();
    const { t } = useTestMissionAndWeatherTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });
    const { optimisticEditFlightTestOrder } = useOptimisticEditFlightTestOrder({ flightTestOrderId });

    return (
        <VStack width="100%">
            <ResourceSection
                formSchema={formSchema}
                resource={flightTestOrder}
                renderFormControls={(FormControl) => <TestMissionAndWeatherFormControls FormControl={FormControl} />}
                resourceNameSingular={
                    isFeatureFlagEnabled("vte-1599") ? t("Test Mission") : t("Test Mission & Weather")
                }
                getInitialValues={(flightTestOrder) => ({
                    maxTestAltitude: flightTestOrder.maxTestAltitude,
                    flightRule: flightTestOrder.flightRule,
                    departure: mapDateToInitialValue(flightTestOrder.departure),
                    arrival: mapDateToInitialValue(flightTestOrder.arrival),
                    frequencyOperations: flightTestOrder.frequencyOperations,
                    frequencyTower: flightTestOrder.frequencyTower,
                    optionalFrequency: flightTestOrder.optionalFrequency,
                    airspaceRequested: flightTestOrder.airspaceRequested,
                    weatherLimits: flightTestOrder.weatherLimits,
                    weatherObserved: flightTestOrder.weatherObserved,
                })}
                renderResource={(flightTestOrder) =>
                    isFeatureFlagEnabled("vte-1599") ? (
                        <TestMissionBodyV2 flightTestOrder={flightTestOrder} />
                    ) : (
                        <TestMissionAndWeatherBody flightTestOrder={flightTestOrder} />
                    )
                }
                onEdit={(formData) => {
                    const flightTestOrderPatchRequestBody: FlightTestOrderPatch = {
                        maxTestAltitude: formData.maxTestAltitude,
                        flightRule: formData.flightRule,
                        departure: formData.departure?.toISOString().split("T")[0],
                        arrival: formData.arrival?.toISOString().split("T")[0],
                        frequencyOperations: formData.frequencyOperations,
                        frequencyTower: formData.frequencyTower,
                        optionalFrequency: formData.optionalFrequency,
                        airspaceRequested: formData.airspaceRequested,
                        weatherLimits: formData.weatherLimits,
                        weatherObserved: formData.weatherObserved,
                    };

                    optimisticEditFlightTestOrder({
                        data: flightTestOrderPatchRequestBody,
                    });
                }}
                hasSubSections={isFeatureFlagEnabled("vte-1599")}
                isEditable={flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL"}
            />
            {isFeatureFlagEnabled("vte-1599") && <WeatherBodyV2 flightTestOrder={flightTestOrder} />}
        </VStack>
    );
};
