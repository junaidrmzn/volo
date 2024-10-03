import { useCreateService } from "@voloiq/service";
import type { FTILinkInsertBulk } from "./apiModels";

export type UseBulkAddFtiLinksOptions = {
    definitionId: string;
};
export const useBulkAddFtiLinks = (options: UseBulkAddFtiLinksOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkAddFtiLinks } = useCreateService<FTILinkInsertBulk[], {}>({
        route: `/ftd/v1/definitions/${definitionId}/instrumentation-parameters`,
    });

    return { bulkAddFtiLinks };
};
