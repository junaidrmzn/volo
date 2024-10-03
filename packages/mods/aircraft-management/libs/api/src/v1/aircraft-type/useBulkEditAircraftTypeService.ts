import { useUpdateService } from "@voloiq/service";
import { aircraftManagementBaseUrl } from "../aircraftManagementBaseUrl";
import { AircraftBulkUpdate } from "../aircrafts";
import { AircraftType } from "./apiModels";

export const useBulkEditAircraftTypeService = () => {
    const { sendRequest } = useUpdateService<AircraftBulkUpdate, AircraftType[]>({
        route: `${aircraftManagementBaseUrl}/aircraft-types/bulk-edit`,
        options: { manual: true },
    });

    return { sendAircraftTypeBulkEditRequest: sendRequest };
};
