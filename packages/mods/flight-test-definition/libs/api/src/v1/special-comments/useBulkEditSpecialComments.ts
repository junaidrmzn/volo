import { usePatchService } from "@voloiq/service";
import type { SpecialComment, SpecialCommentPatch } from "./apiModels";

export type UseBulkEditSpecialCommentsOptions = {
    definitionId: string;
};

export const useBulkEditSpecialComments = (options: UseBulkEditSpecialCommentsOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkEditSpecialComments } = usePatchService<SpecialCommentPatch[], SpecialComment[]>({
        route: `/ftd/v1/definitions/${definitionId}/special-comments`,
        resourceId: "",
    });

    const onBulkEditSpecialComments = async (data: SpecialCommentPatch[], editSessionId: string) => {
        await bulkEditSpecialComments({ data, params: { editSessionId } });
    };

    return { onBulkEditSpecialComments };
};
