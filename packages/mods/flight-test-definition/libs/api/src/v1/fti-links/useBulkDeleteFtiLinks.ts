import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteFtiLinksOptions = {
    definitionId: string;
};
export const useBulkDeleteFtiLinks = (options: UseBulkDeleteFtiLinksOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkDeleteFtiLinks } = useDeleteService<string[], {}>({
        route: `/ftd/v1/definitions/${definitionId}/instrumentation-parameters`,
    });

    return { bulkDeleteFtiLinks };
};
