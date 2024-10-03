import { VStack } from "@volocopter/design-library-react";
import { pick } from "lodash";
import {
    FlightTestOrderPatch,
    useGetFlightTestOrderQuery,
    useOptimisticEditFlightTestOrder,
} from "@voloiq/flight-test-definition-api/v1";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { GeneralInformationContent } from "./GeneralInformationContent";
import { useGeneralInformationSectionTranslation } from "./translations/useGeneralInformationSectionTranslation";
import { useGeneralInformationFormSchema } from "./useGeneralInformationFormSchema";

export type GeneralInformationSectionProps = {
    flightTestOrderId: string;
};

export const GeneralInformationSection = (props: GeneralInformationSectionProps) => {
    const { flightTestOrderId } = props;

    const { t } = useGeneralInformationSectionTranslation();

    const { formSchema } = useGeneralInformationFormSchema();
    const { optimisticEditFlightTestOrder } = useOptimisticEditFlightTestOrder({ flightTestOrderId });
    const { flightTestOrder } = useGetFlightTestOrderQuery({ flightTestOrderId });

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={flightTestOrder}
            renderFormControls={(FormControl) => (
                <VStack spacing={3}>
                    <FormControl fieldName="temporaryLimitationsAircraftConfiguration" />
                    <FormControl fieldName="referenceSubstantiation" />
                </VStack>
            )}
            resourceNameSingular={t("General Information")}
            getInitialValues={(flightTestOrder) =>
                pick(flightTestOrder, ["temporaryLimitationsAircraftConfiguration", "referenceSubstantiation"])
            }
            renderResource={(flightTestOrder) => (
                <GeneralInformationContent
                    temporaryLimitationsAircraftConfiguration={
                        flightTestOrder.temporaryLimitationsAircraftConfiguration
                    }
                    referenceSubstantiation={flightTestOrder.referenceSubstantiation}
                />
            )}
            onEdit={(formData) => {
                const flightTestOrderPatchRequestBody: FlightTestOrderPatch = {
                    temporaryLimitationsAircraftConfiguration: formData.temporaryLimitationsAircraftConfiguration,
                    referenceSubstantiation: formData.referenceSubstantiation,
                };

                optimisticEditFlightTestOrder({
                    data: flightTestOrderPatchRequestBody,
                });
            }}
        />
    );
};
