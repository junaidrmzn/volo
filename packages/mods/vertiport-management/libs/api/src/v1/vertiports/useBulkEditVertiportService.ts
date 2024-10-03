import { useUpdateService } from "@voloiq/service";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";
import { Vertiport, VertiportBulkUpdate } from "./apiModels";

export const useBulkEditVertiportService = () => {
    const { sendRequest } = useUpdateService<VertiportBulkUpdate, Vertiport[]>({
        route: `${vertiportManagementBaseUrl}/vertiports/bulk-edit`,
        options: { manual: true },
    });

    return { sendVertiportBulkEditRequest: sendRequest };
};
