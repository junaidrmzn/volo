import { Pad } from "@voloiq-typescript-api/vertiport-management-types";
import type { ServiceOptions } from "@voloiq/service";
import { useGetAllService } from "@voloiq/service";
import { vertiportManagementBaseUrl } from "../../vertiportManagementBaseUrl";

export type UseGetAllAvailablePadsOptions = Partial<ServiceOptions> & {
    vertiportId: string;
};
export const useGetAllAvailablePads = (options: UseGetAllAvailablePadsOptions) => {
    const { vertiportId, ...serviceOptions } = options;
    return useGetAllService<Pad>({
        route: `${vertiportManagementBaseUrl}/vertiport/${vertiportId}/pads/availability`,
        ...serviceOptions,
    });
};
