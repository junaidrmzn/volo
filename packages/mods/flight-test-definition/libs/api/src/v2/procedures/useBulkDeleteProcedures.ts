import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteProceduresOptions = {
    definitionId: string;
};
export const useBulkDeleteProcedures = (options: UseBulkDeleteProceduresOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkDeleteProcedures } = useDeleteService<{}, string[]>({
        route: `/ftd/v2/definitions/${definitionId}/procedures`,
    });

    return { bulkDeleteProcedures };
};
