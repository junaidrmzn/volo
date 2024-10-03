import { useCreateService } from "@voloiq/service";
import type { TestPoint, TestPointInsert } from "./apiModels";

export type UseBulkAddTestPointsOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkAddTestPoints = (options: UseBulkAddTestPointsOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkAddTestPoints } = useCreateService<TestPointInsert[], TestPoint[]>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/test-points`,
    });

    return { bulkAddTestPoints };
};
