import { ServiceOptions, useCreateService } from "@voloiq/service";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";
import { Equipment, EquipmentCreate } from "./apiModels";

export type UseAddEquipmentOptions = Partial<ServiceOptions> & {
    vertiportId: string;
};
export const useAddEquipment = (options: UseAddEquipmentOptions) => {
    const { vertiportId, ...serviceOptions } = options;
    return useCreateService<EquipmentCreate, Equipment>({
        route: `${vertiportManagementBaseUrl}/vertiports/${vertiportId}/inventory`,
        ...serviceOptions,
    });
};
