import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteImportantNotesOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkDeleteImportantNotes = (options: UseBulkDeleteImportantNotesOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkDeleteImportantNotes } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/important-notes`,
    });

    return { bulkDeleteImportantNotes };
};
