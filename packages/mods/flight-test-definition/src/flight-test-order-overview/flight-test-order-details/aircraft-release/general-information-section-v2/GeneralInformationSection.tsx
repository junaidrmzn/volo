import { VStack } from "@volocopter/design-library-react";
import { pick } from "lodash";
import { useFeatureFlags } from "@voloiq/feature-flags";
import {
    FlightTestOrderPatch,
    useGetFlightTestOrderQuery,
    useOptimisticEditFlightTestOrder,
} from "@voloiq/flight-test-definition-api/v2";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { GeneralInformationContent } from "./GeneralInformationContent";
import { GeneralInformationContentV2 } from "./GeneralInformationContentV2";
import { useGeneralInformationSectionTranslation } from "./translations/useGeneralInformationSectionTranslation";
import { useGeneralInformationFormSchema } from "./useGeneralInformationFormSchema";

export type GeneralInformationSectionProps = {
    flightTestOrderId: string;
};

export const GeneralInformationSection = (props: GeneralInformationSectionProps) => {
    const { flightTestOrderId } = props;

    const { t } = useGeneralInformationSectionTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { formSchema } = useGeneralInformationFormSchema();
    const { optimisticEditFlightTestOrder } = useOptimisticEditFlightTestOrder({ flightTestOrderId });
    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={flightTestOrder}
            renderFormControls={(FormControl) => (
                <VStack spacing={3}>
                    <FormControl fieldName="aircraftConfigurationStatus" />
                    <FormControl fieldName="date" />
                    <FormControl fieldName="issuedApprovedLimitations" />
                </VStack>
            )}
            resourceNameSingular={t("General Information")}
            getInitialValues={(flightTestOrder) =>
                pick(flightTestOrder, ["aircraftConfigurationStatus", "date", "issuedApprovedLimitations"])
            }
            renderResource={(flightTestOrder) =>
                isFeatureFlagEnabled("vte-1520") ? (
                    <GeneralInformationContentV2 flightTestOrder={flightTestOrder} />
                ) : (
                    <GeneralInformationContent flightTestOrder={flightTestOrder} />
                )
            }
            onEdit={(formData) => {
                const flightTestOrderPatchRequestBody: FlightTestOrderPatch = {
                    date: formData?.date ? new Date(formData?.date?.toISOString().slice(0, 10)) : undefined,
                    aircraftConfigurationStatus: formData.aircraftConfigurationStatus,
                    issuedApprovedLimitations: formData.issuedApprovedLimitations,
                };

                optimisticEditFlightTestOrder({
                    data: flightTestOrderPatchRequestBody,
                });
            }}
            hasSubSections={isFeatureFlagEnabled("vte-1520")}
            isEditable={flightTestOrder?.status === "DRAFT" || flightTestOrder?.status === "AWAITING_APPROVAL"}
        />
    );
};
