import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteTestPointsOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkDeleteTestPoints = (options: UseBulkDeleteTestPointsOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkDeleteTestPoints } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/test-points`,
    });

    return { bulkDeleteTestPoints };
};
