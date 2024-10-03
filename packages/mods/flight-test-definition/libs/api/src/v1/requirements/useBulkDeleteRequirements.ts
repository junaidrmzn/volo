import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteRequirementsOptions = {
    definitionId: string;
};
export const useBulkDeleteRequirements = (options: UseBulkDeleteRequirementsOptions) => {
    const { definitionId } = options;

    const { sendRequest: bulkDeleteRequirements } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/definitions/${definitionId}/requirements`,
    });

    return { bulkDeleteRequirements };
};
