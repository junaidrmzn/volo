import { useQueryClient } from "@tanstack/react-query";
import { HStack } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { useGetAllProcedures } from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceSection } from "@voloiq/flight-test-definition-components";
import { DragHandle } from "@voloiq/form";
import { useDefinition } from "../../../definition-context/useDefinition";
import { ProcedureCardList } from "./ProcedureCardList";
import { useProceduresTranslation } from "./translations/useProceduresTranslation";
import type { ProcedureFormSchema } from "./useProcedureFormSchema";
import { useProcedureFormSchema } from "./useProcedureFormSchema";
import { useProceduresOnBulkOperations } from "./useProceduresOnBulkOperations";

export const ProceduresSection = () => {
    const { t } = useProceduresTranslation();
    const { proceduresFormSchema } = useProcedureFormSchema();
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { getAllProcedures } = useGetAllProcedures({
        definitionId,
        params: {
            size: 100_000,
            orderBy: "sequenceIndex:asc",
        },
    });
    const { onBulkAddProcedures, onBulkEditProcedures, onBulkDeleteProcedures } = useProceduresOnBulkOperations();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const queryClient = useQueryClient();

    return (
        <BulkResourceSection<ProcedureFormSchema, ProcedureRead[]>
            resourceNamePlural={t("Procedures")}
            resourceNameSingular={t("Procedure")}
            formSchema={proceduresFormSchema}
            onBulkAdd={onBulkAddProcedures}
            onBulkEdit={onBulkEditProcedures}
            onBulkDelete={onBulkDeleteProcedures}
            getAllResources={getAllProcedures}
            renderResources={(procedures) => <ProcedureCardList procedures={procedures} />}
            renderFormControlGroup={(FormControl) => (
                <HStack spacing={3}>
                    {isFeatureFlagEnabled("sorting-for-procedures") && (
                        <DragHandle size={4} color="semanticUnknownMuted" />
                    )}
                    <FormControl fieldName="title" />
                </HStack>
            )}
            getInitialValues={(procedures) =>
                procedures.map((procedure) => ({
                    id: procedure.id,
                    title: procedure.title,
                }))
            }
            isSortable={isFeatureFlagEnabled("sorting-for-procedures")}
            overrideOnAfterSubmit={() => {
                queryClient.invalidateQueries(["tabCounters"]);
            }}
        />
    );
};
