import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import { vertiportManagementBaseUrl } from "../vertiportManagementBaseUrl";
import { Equipment } from "./apiModels";

export type UseGetAllEquipmentsOptions = Partial<ServiceOptions> & {
    vertiportId: string;
};

export const useGetAllEquipments = (options: UseGetAllEquipmentsOptions) => {
    const { vertiportId, ...serviceOptions } = options;
    return useGetAllService<Equipment>({
        route: `${vertiportManagementBaseUrl}/vertiports/${vertiportId}/inventory`,
        ...serviceOptions,
    });
};
