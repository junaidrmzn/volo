import { VStack } from "@volocopter/design-library-react";
import { useGetAllImportantNotes } from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceSection } from "@voloiq/flight-test-definition-components";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { ImportantNotesSectionContent } from "./ImportantNotesSectionContent";
import { useImportantNotesSectionTranslation } from "./translations/useImportantNotesTranslation";
import { useImportantNotesFormSchema } from "./useImportantNotesFormSchema";
import { useImportantNotesOnBulkOperations } from "./useImportantNotesOnBulkOperations";

export type ImportantNotesSectionProps = {
    definitionId: string;
    procedureId: string;
};

export const ImportantNotesSection = (props: ImportantNotesSectionProps) => {
    const { definitionId, procedureId } = props;
    const { t } = useImportantNotesSectionTranslation();
    const { formSchema } = useImportantNotesFormSchema();
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();
    const { onBulkAddImportantNotes, onBulkDeleteImportantNotes, onBulkEditImportantNotes } =
        useImportantNotesOnBulkOperations({ definitionId, procedureId, editSessionId });
    const { getAllImportantNotes } = useGetAllImportantNotes({ definitionId, procedureId, params: { size: 100_000 } });

    return (
        <BulkResourceSection
            formSchema={formSchema}
            resourceNameSingular={t("Important Note")}
            resourceNamePlural={t("Important Notes")}
            renderFormControlGroup={(FormControl) => (
                <VStack>
                    <FormControl fieldName="title" />
                    <FormControl fieldName="note" />
                </VStack>
            )}
            renderResources={(importantNotes) => <ImportantNotesSectionContent importantNotes={importantNotes} />}
            onBulkAdd={onBulkAddImportantNotes}
            onBulkDelete={onBulkDeleteImportantNotes}
            onBulkEdit={onBulkEditImportantNotes}
            getAllResources={getAllImportantNotes}
            getInitialValues={(importantNotes) => importantNotes}
        />
    );
};
