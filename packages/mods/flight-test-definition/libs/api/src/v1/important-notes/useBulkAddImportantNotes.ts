import { useCreateService } from "@voloiq/service";
import type { ImportantNote, ImportantNoteInsert } from "./apiModels";

export type UseBulkAddImportantNotesOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkAddImportantNotes = (options: UseBulkAddImportantNotesOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkAddImportantNotes } = useCreateService<ImportantNoteInsert[], ImportantNote[]>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/important-notes`,
    });

    return { bulkAddImportantNotes };
};
