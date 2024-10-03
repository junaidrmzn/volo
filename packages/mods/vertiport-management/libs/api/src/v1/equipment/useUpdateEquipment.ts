import type { ServiceOptions } from "@voloiq/service";
import { usePatchService } from "@voloiq/service";
import { Equipment, EquipmentUpdate } from "@voloiq/vertiport-management-api/v1";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";

export type UseUpdateEquipmentOptions = Partial<ServiceOptions> & {
    vertiportId: string;
};
export const useUpdateEquipment = (options: UseUpdateEquipmentOptions) => {
    const { vertiportId, ...serviceOptions } = options;
    return usePatchService<EquipmentUpdate, Equipment>({
        route: `${vertiportManagementBaseUrl}/vertiports/${vertiportId}/inventory`,
        ...serviceOptions,
    });
};
