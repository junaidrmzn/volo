import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrderPatch } from "@voloiq/flight-test-definition-api/v2";
import { useGetFlightTestOrderQuery, useOptimisticEditFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { mapDateToInitialValue, mapSelectOptionToInitialValue } from "@voloiq/flight-test-definition-utils";
import { TestAircraftBody } from "./TestAircraftBody";
import { TestAircraftBodyV2 } from "./TestAircraftBodyV2";
import { TestAircraftFormControls } from "./TestAircraftFormControls";
import { useTestAircraftTranslation } from "./translations/useTestAircraftTranslation";
import { useTestAircraftFormSchema } from "./useTestAircraftFormSchema";

export type TestAircraftSectionProps = {
    flightTestOrderId: string;
};

export const TestAircraftSection = (props: TestAircraftSectionProps) => {
    const { flightTestOrderId } = props;
    const { formSchema } = useTestAircraftFormSchema();
    const { t } = useTestAircraftTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });
    const { optimisticEditFlightTestOrder } = useOptimisticEditFlightTestOrder({ flightTestOrderId });

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={flightTestOrder}
            renderFormControls={(FormControl) => <TestAircraftFormControls FormControl={FormControl} />}
            resourceNameSingular={t("Test Aircraft")}
            getInitialValues={(flightTestOrder) => ({
                masterModel: mapSelectOptionToInitialValue(flightTestOrder.masterModel),
                model: flightTestOrder.model,
                msn: flightTestOrder.msn,
                applicability: mapSelectOptionToInitialValue(flightTestOrder.applicability),
                aircraftCallsign: flightTestOrder.aircraftCallsign,
                flightConditions: flightTestOrder.flightConditions,
                revision: flightTestOrder.revision,
                issueDateFlightConditions: mapDateToInitialValue(flightTestOrder.issueDateFlightConditions),
                permitToFly: flightTestOrder.permitToFly,
                issueDatePermitToFly: mapDateToInitialValue(flightTestOrder.issueDatePermitToFly),
                validUntil: mapDateToInitialValue(flightTestOrder.validUntil),
            })}
            renderResource={(flightTestOrder) =>
                isFeatureFlagEnabled("vte-1599") ? (
                    <TestAircraftBodyV2 flightTestOrder={flightTestOrder} />
                ) : (
                    <TestAircraftBody flightTestOrder={flightTestOrder} />
                )
            }
            onEdit={(formData) => {
                const flightTestOrderPatchRequestBody: FlightTestOrderPatch = {
                    masterModel: formData.masterModel?.value,
                    model: formData.model,
                    msn: formData.msn,
                    applicability: formData.applicability?.value,
                    aircraftCallsign: formData.aircraftCallsign,
                    flightConditions: formData.flightConditions,
                    revision: formData.revision,
                    issueDateFlightConditions: formData.issueDateFlightConditions?.toISOString().split("T")[0],
                    permitToFly: formData.permitToFly,
                    issueDatePermitToFly: formData.issueDatePermitToFly?.toISOString().split("T")[0],
                    validUntil: formData.validUntil?.toISOString().split("T")[0],
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
