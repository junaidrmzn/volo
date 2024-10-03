import { useUpdateService } from "@voloiq/service";
import { aircraftManagementBaseUrl } from "../aircraftManagementBaseUrl";
import { Aircraft, AircraftBulkUpdate } from "./apiModels";

export const useBulkEditAircraftService = () => {
    const { sendRequest } = useUpdateService<AircraftBulkUpdate, Aircraft[]>({
        route: `${aircraftManagementBaseUrl}/aircrafts/bulk-edit`,
        options: { manual: true },
    });

    return { sendAircraftBulkEditRequest: sendRequest };
};
