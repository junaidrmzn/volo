import { useCreateService } from "@voloiq/service";
import type { AdditionalComment, AdditionalCommentInsert } from "./apiModels";

export type UseBulkAddAdditionalCommentsOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkAddAdditionalComments = (options: UseBulkAddAdditionalCommentsOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkAddAdditionalComments } = useCreateService<AdditionalCommentInsert[], AdditionalComment[]>(
        {
            route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/additional-comments`,
        }
    );

    return { bulkAddAdditionalComments };
};
