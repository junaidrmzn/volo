import { useToast } from "@volocopter/design-library-react";
import { useJobQueue } from "@voloiq/flight-planning-utils";
import { useService } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../translations";

type UseKmlFileUploadedStatusOptions = {
    routeOptionId: string | number;
    enabled: boolean;
};
export const useKmlFileUploadedStatus = (options: UseKmlFileUploadedStatusOptions) => {
    const { routeOptionId, enabled = false } = options;
    const { baseUrl } = useService();
    const toast = useToast();
    const { t: translate } = useFlightPlanningTranslation();

    const startJobUrl = `${baseUrl}/route-options/${routeOptionId}/kml/status/uploaded`;
    const jobKey = ["kml-file-uploaded-status", "routeOptionId", { routeOptionId }];
    const dependentQueryKey = ["routeOptions", { routeOptionId }, "routes"];

    const { remove, isFetching } = useJobQueue({
        startJobUrl,
        jobKey,
        dependentQueryKey,
        enabled,
        onError: () => {
            toast({
                title: translate("routeOption.kmlFileUpload.processingError.title"),
                description: translate("routeOption.kmlFileUpload.processingError.message"),
                status: "error",
            });
        },
    });

    return { isFetching, removeUploadedStatusQuery: remove };
};
