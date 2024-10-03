import { VStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrderPatch } from "@voloiq/flight-test-definition-api/v2";
import { useGetFlightTestOrderQuery, useOptimisticEditFlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { mapDateToInitialValue, mapSelectOptionToInitialValue } from "@voloiq/flight-test-definition-utils";
import { GeneralInformationBody } from "./GeneralInformationBody";
import { GeneralInformationBodySubSections } from "./GeneralInformationBodySubSections";
import { GeneralInformationBodyV2 } from "./GeneralInformationBodyV2";
import { GeneralInformationFormControls } from "./GeneralInformationFormControls";
import { useGeneralInformationTranslation } from "./translations/useGeneralInformationTranslation";
import { useGeneralInformationFormSchema } from "./useGeneralInformationFormSchema";

export type GeneralInformationSectionProps = {
    flightTestOrderId: string;
};

export const GeneralInformationSection = (props: GeneralInformationSectionProps) => {
    const { flightTestOrderId } = props;
    const { formSchema } = useGeneralInformationFormSchema();
    const { t } = useGeneralInformationTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });

    const { optimisticEditFlightTestOrder } = useOptimisticEditFlightTestOrder({ flightTestOrderId });

    return (
        <VStack width="100%">
            <ResourceSection
                formSchema={formSchema}
                resource={flightTestOrder}
                renderFormControls={(FormControl) => <GeneralInformationFormControls FormControl={FormControl} />}
                resourceNameSingular={t("General Information")}
                getInitialValues={(flightTestOrder) => ({
                    missionTitle: flightTestOrder.missionTitle,
                    flightTestCategory: mapSelectOptionToInitialValue(flightTestOrder.flightTestCategory),
                    riskLevel: mapSelectOptionToInitialValue(flightTestOrder.riskLevel),
                    dateCreated: mapDateToInitialValue(flightTestOrder.createTime),
                    flightNumber: flightTestOrder.flightNumber ?? "",
                    missionObjective: flightTestOrder.missionObjective ?? "",
                })}
                renderResource={(flightTestOrder) =>
                    isFeatureFlagEnabled("vte-1599") ? (
                        <GeneralInformationBodyV2 flightTestOrder={flightTestOrder} />
                    ) : (
                        <GeneralInformationBody flightTestOrder={flightTestOrder} />
                    )
                }
                onEdit={(formData) => {
                    const flightTestOrderPatchRequestBody: FlightTestOrderPatch = {
                        missionTitle: formData.missionTitle,
                        flightTestCategory: formData.flightTestCategory?.value,
                        riskLevel: formData.riskLevel?.value,
                        missionObjective: formData.missionObjective,
                        flightNumber: formData.flightNumber,
                    };

                    optimisticEditFlightTestOrder({
                        data: flightTestOrderPatchRequestBody,
                    });
                }}
                hasSubSections={isFeatureFlagEnabled("vte-1599")}
                isEditable={flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL"}
            />
            {isFeatureFlagEnabled("vte-1599") && (
                <GeneralInformationBodySubSections flightTestOrder={flightTestOrder} />
            )}
        </VStack>
    );
};
