import { VStack } from "@volocopter/design-library-react";
import { pick } from "lodash";
import type { ProcedurePatch } from "@voloiq/flight-test-definition-api/v1";
import { useGetProcedureQuery, useOptimisticEditProcedure } from "@voloiq/flight-test-definition-api/v1";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { GeneralSectionContent } from "./GeneralSectionContent";
import { useGeneralSectionTranslation } from "./translations/useGeneralSectionTranslation";
import { useGeneralSectionFormSchema } from "./useGeneralSectionFormSchema";

export type GeneralSectionProps = {
    definitionId: string;
    procedureId: string;
};

export const GeneralSection = (props: GeneralSectionProps) => {
    const { procedureId, definitionId } = props;
    const { formSchema } = useGeneralSectionFormSchema();
    const { t } = useGeneralSectionTranslation();
    const { procedure } = useGetProcedureQuery({ definitionId, procedureId });
    const { optimisticEditProcedure } = useOptimisticEditProcedure({ definitionId, procedureId });
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={procedure}
            renderFormControls={(FormControl) => (
                <VStack spacing={3}>
                    <FormControl fieldName="safetyApprovalLevel" />
                    <FormControl fieldName="objectives" />
                    <FormControl fieldName="prerequisites" />
                    <FormControl fieldName="passFailCriteria" />
                </VStack>
            )}
            resourceNameSingular={t("General")}
            getInitialValues={(procedure) => ({
                ...pick(procedure, ["objectives", "prerequisites", "passFailCriteria"]),
                safetyApprovalLevel: {
                    value: procedure.safetyApprovalLevel,
                },
            })}
            renderResource={(generalInformation) => (
                <GeneralSectionContent
                    objectives={generalInformation.objectives}
                    prerequisites={generalInformation.prerequisites}
                    passFailCriteria={generalInformation.passFailCriteria}
                    safetyApprovalLevel={generalInformation.safetyApprovalLevel}
                />
            )}
            onEdit={(formData) => {
                const patchProcedureRequestBody: ProcedurePatch = {
                    objectives: formData.objectives,
                    passFailCriteria: formData.passFailCriteria,
                    prerequisites: formData.prerequisites,
                    safetyApprovalLevel: formData.safetyApprovalLevel?.value,
                };

                optimisticEditProcedure({ data: patchProcedureRequestBody, params: { editSessionId } });
            }}
        />
    );
};
