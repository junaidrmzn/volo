import { usePatchService } from "@voloiq/service";
import type { FTILinkPatchBulk } from "./apiModels";

export type UseBulkEditFtiLinksOptions = {
    definitionId: string;
};
export const useBulkEditFtiLinks = (options: UseBulkEditFtiLinksOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkEditFtiLinks } = usePatchService<FTILinkPatchBulk[], {}>({
        route: `/ftd/v1/definitions/${definitionId}/instrumentation-parameters`,
    });

    return { bulkEditFtiLinks };
};
