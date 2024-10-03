import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteSpecialCommentsOptions = {
    definitionId: string;
};

export const useBulkDeleteSpecialComments = (options: UseBulkDeleteSpecialCommentsOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkDeleteSpecialComments } = useDeleteService({
        route: `/ftd/v1/definitions/${definitionId}/special-comments`,
    });

    const onBulkDeleteSpecialComments = async (data: string[], editSessionId: string) => {
        await bulkDeleteSpecialComments({ data, params: { editSessionId } });
    };

    return { onBulkDeleteSpecialComments };
};
