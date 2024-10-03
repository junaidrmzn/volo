import {
    useBulkAddAdditionalComments,
    useBulkDeleteAdditionalComments,
    useBulkEditAdditionalComments,
} from "@voloiq/flight-test-definition-api/v1";
import type { OnBulkAdd, OnBulkDelete, OnBulkEdit } from "@voloiq/form";
import type { AdditionalCommentsFormSchema } from "./useAdditionalCommentsFormSchema";

export type UseAdditionalCommentsOnBulkOperationsOptions = {
    definitionId: string;
    procedureId: string;
    editSessionId: string;
};

export const useAdditionalCommentsOnBulkOperations = (options: UseAdditionalCommentsOnBulkOperationsOptions) => {
    const { definitionId, procedureId, editSessionId } = options;
    const { bulkDeleteAdditionalComments } = useBulkDeleteAdditionalComments({
        definitionId,
        procedureId,
    });
    const { bulkEditAdditionalComments } = useBulkEditAdditionalComments({ definitionId, procedureId });
    const { bulkAddAdditionalComments } = useBulkAddAdditionalComments({ definitionId, procedureId });

    const onBulkDeleteAdditionalComments: OnBulkDelete = async (data) => {
        await bulkDeleteAdditionalComments({ data, params: { editSessionId } });
    };
    const onBulkAddAdditionalComments: OnBulkAdd<AdditionalCommentsFormSchema> = async (data) => {
        await bulkAddAdditionalComments({ data, params: { editSessionId } });
    };
    const onBulkEditAdditionalComments: OnBulkEdit<AdditionalCommentsFormSchema> = async (data) => {
        await bulkEditAdditionalComments({ data, params: { editSessionId } });
    };

    return { onBulkAddAdditionalComments, onBulkDeleteAdditionalComments, onBulkEditAdditionalComments };
};
