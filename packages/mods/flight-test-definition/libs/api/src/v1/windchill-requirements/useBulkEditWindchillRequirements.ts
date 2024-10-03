import { usePatchService } from "@voloiq/service";
import type { WindchillRequirement, WindchillRequirementPatch } from "./apiModels";

export const useBulkEditWindchillRequirements = () => {
    const { sendRequest, state } = usePatchService<WindchillRequirementPatch[], WindchillRequirement[]>({
        route: `/ftd/v1/windchill-requirements`,
    });

    const bulkEditWindchillRequirements = (windchillRequirements: WindchillRequirementPatch[], editSessionId: string) =>
        sendRequest({
            data: windchillRequirements,
            params: { editSessionId },
        });

    return { bulkEditWindchillRequirements, isLoading: state === "pending" };
};
