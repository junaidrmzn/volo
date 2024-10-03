import { useUpdateService } from "@voloiq/service";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";
import { Region, RegionBulkUpdate } from "./apiModels";

export const useBulkEditRegionService = () => {
    const { sendRequest } = useUpdateService<RegionBulkUpdate, Region[]>({
        route: `${vertiportManagementBaseUrl}/regions/bulk-edit`,
        options: { manual: true },
    });

    return { sendRegionBulkEditRequest: sendRequest };
};
