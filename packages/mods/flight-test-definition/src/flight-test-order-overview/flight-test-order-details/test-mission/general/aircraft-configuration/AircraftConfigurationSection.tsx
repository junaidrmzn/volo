import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrderPatch } from "@voloiq/flight-test-definition-api/v2";
import { useGetFlightTestOrderQuery, useOptimisticEditFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { AircraftConfigurationBody } from "./AircraftConfigurationBody";
import { AircraftConfigurationBodyV2 } from "./AircraftConfigurationBodyV2";
import { AircraftConfigurationFormControls } from "./AircraftConfigurationFormControls";
import { useAircraftConfigurationTranslation } from "./translations/useAircraftConfigurationTranslation";
import { useAircraftConfigurationFormSchema } from "./useAircraftConfigurationFormSchema";

export type AircraftConfigurationSectionProps = {
    flightTestOrderId: string;
};

export const AircraftConfigurationSection = (props: AircraftConfigurationSectionProps) => {
    const { flightTestOrderId } = props;
    const { formSchema } = useAircraftConfigurationFormSchema();
    const { t } = useAircraftConfigurationTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });
    const { optimisticEditFlightTestOrder } = useOptimisticEditFlightTestOrder({ flightTestOrderId });

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={flightTestOrder}
            renderFormControls={(FormControl) => <AircraftConfigurationFormControls FormControl={FormControl} />}
            resourceNameSingular={t("Aircraft Configuration")}
            getInitialValues={(flightTestOrder) => ({
                allUpMass: flightTestOrder.allUpMass,
                centerOfGravity: flightTestOrder.centerOfGravity,
                massAndBalanceCategory: flightTestOrder.massAndBalanceCategory,
                ballasts: flightTestOrder.ballasts,
                charging: flightTestOrder.charging,
                bingo: flightTestOrder.bingo,
                totalDuration: flightTestOrder.totalDuration,
                setupSheet: flightTestOrder.setupSheet,
                notesToAircraft: flightTestOrder.notesToAircraft,
            })}
            renderResource={(flightTestOrder) =>
                isFeatureFlagEnabled("vte-1599") ? (
                    <AircraftConfigurationBodyV2 flightTestOrder={flightTestOrder} />
                ) : (
                    <AircraftConfigurationBody flightTestOrder={flightTestOrder} />
                )
            }
            onEdit={(formData) => {
                const flightTestOrderPatchRequestBody: FlightTestOrderPatch = {
                    allUpMass: formData.allUpMass,
                    centerOfGravity: formData.centerOfGravity,
                    massAndBalanceCategory: formData.massAndBalanceCategory,
                    ballasts: formData.ballasts,
                    charging: formData.charging,
                    bingo: formData.bingo,
                    totalDuration: formData.totalDuration,
                    setupSheet: formData.setupSheet,
                    notesToAircraft: formData.notesToAircraft,
                };

                optimisticEditFlightTestOrder({
                    data: flightTestOrderPatchRequestBody,
                });
            }}
            hasSubSections={isFeatureFlagEnabled("vte-1599")}
            isEditable={flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL"}
        />
    );
};
