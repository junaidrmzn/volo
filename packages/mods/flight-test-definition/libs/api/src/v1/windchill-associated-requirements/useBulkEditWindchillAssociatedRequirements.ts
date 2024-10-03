import { usePatchService } from "@voloiq/service";
import type { WindchillRequirementPatch } from "../windchill-requirements/apiModels";

export type UseBulkEditWindchillAssociatedRequirementsOptions = {
    definitionId: string;
};

export const useBulkEditWindchillAssociatedRequirements = (
    options: UseBulkEditWindchillAssociatedRequirementsOptions
) => {
    const { definitionId } = options;

    const { sendRequest, state } = usePatchService<WindchillRequirementPatch[], {}>({
        route: `/ftd/v1/definitions/${definitionId}/windchill-associated-requirements`,
        resourceId: "",
    });

    const bulkEditWindchillAssociatedRequirements = async (
        data: WindchillRequirementPatch[],
        editSessionId: string
    ) => {
        await sendRequest({ data, params: { editSessionId } });
    };

    return { bulkEditWindchillAssociatedRequirements, isLoading: state === "pending" };
};
