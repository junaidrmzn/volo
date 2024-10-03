import { VStack } from "@volocopter/design-library-react";
import { pick } from "lodash";
import type { FlightTestDefinitionPatchRequestBody } from "@voloiq/flight-test-definition-api/v2";
import { useGetDefinitionQuery, useOptimisticEditDefinition } from "@voloiq/flight-test-definition-api/v2";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { useDefinitionEditSessionId } from "../../definition-edit-session-id-context/useDefinitionEditSessionId";
import { AdditionalInformationSectionContent } from "./AdditionalInformationSectionContent";
import { useAdditionalInformationTranslation } from "./translations/useAdditionalInformationTranslation";
import { useAdditionalInformationFormSchema } from "./useAdditionalInformationFormSchema";

export type AdditionalInformationSectionProps = {
    definitionId: string;
};
export const AdditionalInformationSection = (props: AdditionalInformationSectionProps) => {
    const { definitionId } = props;
    const { formSchema } = useAdditionalInformationFormSchema();
    const { t } = useAdditionalInformationTranslation();
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();
    const { definition } = useGetDefinitionQuery({ definitionId });
    const { optimisticEditDefinition } = useOptimisticEditDefinition({ definitionId });

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={definition}
            renderFormControls={(FormControl) => (
                <VStack spacing={3}>
                    <FormControl fieldName="specialEquipment" />
                    <FormControl fieldName="dataAnalysisPlan" />
                    <FormControl fieldName="safetyRecommendations" />
                </VStack>
            )}
            resourceNameSingular={t("Additional Information")}
            getInitialValues={(definition) =>
                pick(definition, ["specialEquipment", "dataAnalysisPlan", "safetyRecommendations"])
            }
            renderResource={(definition) => (
                <AdditionalInformationSectionContent
                    specialEquipment={definition.specialEquipment}
                    dataAnalysisPlan={definition.dataAnalysisPlan}
                    safetyRecommendations={definition.safetyRecommendations}
                />
            )}
            onEdit={(formData) => {
                const flightTestDefinitionPatchRequestBody: FlightTestDefinitionPatchRequestBody = {
                    specialEquipment: formData.specialEquipment,
                    dataAnalysisPlan: formData.dataAnalysisPlan,
                    safetyRecommendations: formData.safetyRecommendations,
                };

                optimisticEditDefinition({
                    data: flightTestDefinitionPatchRequestBody,
                    params: { editSessionId },
                });
            }}
        />
    );
};
