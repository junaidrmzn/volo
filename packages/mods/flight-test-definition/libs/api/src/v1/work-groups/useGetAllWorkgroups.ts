import { useGetAllService } from "@voloiq/service";
import { WorkGroupV1 } from "./apiModels";

const route = "/ftd/v1/workgroups";

export const useGetAllWorkgroups = () =>
    useGetAllService<WorkGroupV1>({
        route,
        params: {
            size: 100,
            orderBy: "label:asc",
        },
    });
