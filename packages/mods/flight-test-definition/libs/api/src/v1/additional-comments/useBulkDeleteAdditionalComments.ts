import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteAdditionalCommentsOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkDeleteAdditionalComments = (options: UseBulkDeleteAdditionalCommentsOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkDeleteAdditionalComments } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/additional-comments`,
    });

    return { bulkDeleteAdditionalComments };
};
