import { usePatchService } from "@voloiq/service";
import type { TestPoint, TestPointPatch } from "./apiModels";

export type UseBulkEditTestPointsOptions = {
    definitionId: string;
    procedureId: string;
};
export const useBulkEditTestPoints = (options: UseBulkEditTestPointsOptions) => {
    const { definitionId, procedureId } = options;

    const { sendRequest: bulkEditTestPoints } = usePatchService<TestPointPatch[], TestPoint[]>({
        route: `/ftd/v1/definitions/${definitionId}/procedures/${procedureId}/test-points`,
    });

    return { bulkEditTestPoints };
};
