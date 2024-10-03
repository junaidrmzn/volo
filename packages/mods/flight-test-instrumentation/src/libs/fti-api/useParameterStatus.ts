import type {
    BulkStatusCreateResponse,
    ParameterStatus,
    ParameterStatusInsert,
    ParametersStatusInsert,
} from "@voloiq-typescript-api/fti-types";
import { useCreateService, usePatchService } from "@voloiq/service";
import { useGetRoute } from "./useGetRoute";

const baseRoute = "parameters";

export const usePostParameterStatus = (parameterId: string) => {
    const { route } = useGetRoute({ baseRoute });
    return useCreateService<ParameterStatusInsert, ParameterStatus>({
        route: `${route}/${parameterId}/status`,
    });
};

export const usePostParameterStatusBulk = () => {
    const { route } = useGetRoute({ baseRoute });
    return useCreateService<ParametersStatusInsert, BulkStatusCreateResponse>({ route: `${route}/status` });
};

export const usePatchParameterAircraftStatus = (parameterId: string, aircraftId: string) => {
    const { route } = useGetRoute({ baseRoute });

    return usePatchService<ParameterStatusInsert, ParameterStatus>({
        route: `${route}/${parameterId}/aircraft/${aircraftId}`,
        config: { baseURL: `${BACKEND_BASE_URL}/ftd/v2` },
    });
};
