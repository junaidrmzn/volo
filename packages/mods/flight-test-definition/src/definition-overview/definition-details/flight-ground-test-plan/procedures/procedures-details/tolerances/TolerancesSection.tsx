import { VStack } from "@volocopter/design-library-react";
import { pick } from "lodash";
import type { ProcedurePatch } from "@voloiq/flight-test-definition-api/v1";
import { useGetProcedureQuery, useOptimisticEditProcedure } from "@voloiq/flight-test-definition-api/v1";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { TolerancesSectionContent } from "./TolerancesSectionContent";
import { useTolerancesSectionTranslation } from "./translations/useTolerancesSectionTranslation";
import { useTolerancesSectionFormSchema } from "./useTolerancesSectionFormSchema";

export type TolerancesSectionProps = {
    definitionId: string;
    procedureId: string;
};

export const TolerancesSection = (props: TolerancesSectionProps) => {
    const { procedureId, definitionId } = props;
    const { formSchema } = useTolerancesSectionFormSchema();
    const { t } = useTolerancesSectionTranslation();
    const { procedure } = useGetProcedureQuery({ definitionId, procedureId });
    const { optimisticEditProcedure } = useOptimisticEditProcedure({ definitionId, procedureId });
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={procedure}
            renderFormControls={(FormControl) => (
                <VStack spacing={3}>
                    <FormControl fieldName="testPointTolerance" />
                </VStack>
            )}
            resourceNameSingular={t("Tolerances")}
            getInitialValues={(procedure) => pick(procedure, ["testPointTolerance"])}
            renderResource={(procedure) => (
                <TolerancesSectionContent testPointTolerance={procedure.testPointTolerance} />
            )}
            onEdit={(formData) => {
                const patchProcedureRequestBody: ProcedurePatch = {
                    testPointTolerance: formData.testPointTolerance,
                };

                optimisticEditProcedure({ data: patchProcedureRequestBody, params: { editSessionId } });
            }}
        />
    );
};
