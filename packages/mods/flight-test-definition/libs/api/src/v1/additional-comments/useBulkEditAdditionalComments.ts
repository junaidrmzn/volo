import { usePatchService } from "@voloiq/service";
import type { AdditionalComment, AdditionalCommentPatchBulk } from "./apiModels";

export type UseBulkEditAdditionalCommentsOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkEditAdditionalComments = (options: UseBulkEditAdditionalCommentsOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkEditAdditionalComments } = usePatchService<
        AdditionalCommentPatchBulk[],
        AdditionalComment[]
    >({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/additional-comments`,
    });

    return { bulkEditAdditionalComments };
};
