import { usePatchService } from "@voloiq/service";
import { Revision, RevisionPatch } from "./apiModels";

export type UseBulkEditRevisionsOptions = {
    definitionId: string;
};
export const useBulkEditRevisions = (options: UseBulkEditRevisionsOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkEditRevisions } = usePatchService<RevisionPatch[], Revision[]>({
        route: `/ftd/v1/definitions/${definitionId}/revisions`,
    });

    return { bulkEditRevisions };
};
