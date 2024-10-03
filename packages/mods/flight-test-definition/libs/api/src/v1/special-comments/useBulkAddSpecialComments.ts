import { useCreateService } from "@voloiq/service";
import type { SpecialComment, SpecialCommentInsert } from "./apiModels";

export type UseBulkAddSpecialCommentsOptions = {
    definitionId: string;
};

export const useOnBulkAddSpecialComments = (options: UseBulkAddSpecialCommentsOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkAddSpecialComments } = useCreateService<SpecialCommentInsert[], SpecialComment[]>({
        route: `/ftd/v1/definitions/${definitionId}/special-comments`,
    });

    const onBulkAddSpecialComments = async (data: SpecialCommentInsert[], editSessionId: string) => {
        await bulkAddSpecialComments({ data, params: { editSessionId } });
    };

    return { onBulkAddSpecialComments };
};
