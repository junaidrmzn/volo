import {
    useBulkAddImportantNotes,
    useBulkDeleteImportantNotes,
    useBulkEditImportantNotes,
} from "@voloiq/flight-test-definition-api/v1";
import type { OnBulkAdd, OnBulkDelete, OnBulkEdit } from "@voloiq/form";
import type { ImportantNotesFormSchema } from "./useImportantNotesFormSchema";

export type UseImportantNotesOnBulkOperationsOptions = {
    definitionId: string;
    procedureId: string;
    editSessionId: string;
};

export const useImportantNotesOnBulkOperations = (options: UseImportantNotesOnBulkOperationsOptions) => {
    const { definitionId, procedureId, editSessionId } = options;
    const { bulkDeleteImportantNotes } = useBulkDeleteImportantNotes({ definitionId, procedureId });
    const { bulkEditImportantNotes } = useBulkEditImportantNotes({ definitionId, procedureId });
    const { bulkAddImportantNotes } = useBulkAddImportantNotes({ definitionId, procedureId });

    const onBulkDeleteImportantNotes: OnBulkDelete = async (data) => {
        await bulkDeleteImportantNotes({ data, params: { editSessionId } });
    };
    const onBulkAddImportantNotes: OnBulkAdd<ImportantNotesFormSchema> = async (data) => {
        await bulkAddImportantNotes({ data, params: { editSessionId } });
    };
    const onBulkEditImportantNotes: OnBulkEdit<ImportantNotesFormSchema> = async (data) => {
        await bulkEditImportantNotes({ data, params: { editSessionId } });
    };

    return { onBulkAddImportantNotes, onBulkDeleteImportantNotes, onBulkEditImportantNotes };
};
