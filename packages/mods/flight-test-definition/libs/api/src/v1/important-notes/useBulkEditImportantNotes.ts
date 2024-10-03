import { usePatchService } from "@voloiq/service";
import type { ImportantNote, ImportantNotePatchBulk } from "./apiModels";

export type UseBulkEditImportantNotesOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkEditImportantNotes = (options: UseBulkEditImportantNotesOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkEditImportantNotes } = usePatchService<ImportantNotePatchBulk[], ImportantNote[]>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/important-notes`,
    });

    return { bulkEditImportantNotes };
};
