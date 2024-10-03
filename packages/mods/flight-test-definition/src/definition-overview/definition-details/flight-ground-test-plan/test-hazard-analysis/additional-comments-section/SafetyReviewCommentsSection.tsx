import { VStack } from "@volocopter/design-library-react";
import type { FlightTestDefinitionPatchRequestBody } from "@voloiq/flight-test-definition-api/v2";
import { useOptimisticEditDefinition } from "@voloiq/flight-test-definition-api/v2";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { useDefinitionEditSessionId } from "../../../definition-edit-session-id-context/useDefinitionEditSessionId";
import { SafetyReviewCommentsSectionContent } from "./SafetyReviewCommentsSectionContent";
import { useSafetyReviewCommentsTranslation } from "./translations/useSafetyReviewCommentsTranslation";
import { useSafetyReviewCommentsFormSchema } from "./useSafetyReviewCommentsSectionFormSchema";

type SafetyReviewCommentsSectionProps = {
    definitionId: string;
    safetyReviewComments?: string;
};

export const SafetyReviewCommentsSection = (props: SafetyReviewCommentsSectionProps) => {
    const { definitionId, safetyReviewComments } = props;
    const { formSchema } = useSafetyReviewCommentsFormSchema();
    const { t } = useSafetyReviewCommentsTranslation();

    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();
    const { optimisticEditDefinition } = useOptimisticEditDefinition({ definitionId });

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={{ additionalComments: safetyReviewComments }}
            renderFormControls={(FormControl) => (
                <VStack spacing={3}>
                    <FormControl fieldName="additionalComments" />
                </VStack>
            )}
            resourceNameSingular={t("Additional Comments")}
            getInitialValues={() => ({ additionalComments: safetyReviewComments })}
            renderResource={() => <SafetyReviewCommentsSectionContent additionalComments={safetyReviewComments} />}
            onEdit={(formData) => {
                const patchDefinitionRequestBody: FlightTestDefinitionPatchRequestBody = {
                    safetyReviewComments: formData.additionalComments,
                };

                optimisticEditDefinition({ data: patchDefinitionRequestBody, params: { editSessionId } });
            }}
        />
    );
};
