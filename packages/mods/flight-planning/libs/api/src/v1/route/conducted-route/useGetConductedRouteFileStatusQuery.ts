import { useToast } from "@volocopter/design-library-react";
import { useQuery } from "react-query";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import type { ExtractFunctionReturnType } from "../../../extractFunctionReturnType";
import { useApiTranslation } from "../../translations";
import { useGetConductedRouteFileStatus } from "./useGetConductedRouteFileStatus";

export const useGetConductedRouteFileStatusQuery = (routeId: number | string, enabled: boolean) => {
    const toast = useToast();
    const { t: translate } = useApiTranslation();

    const { refetchData } = useGetConductedRouteFileStatus({ routeId, manual: true });

    return useQuery<ExtractFunctionReturnType<typeof refetchData>, AxiosError<ResponseEnvelope<Error>>>({
        enabled,
        queryKey: ["routes", { routeId }, "conductedRouteFileStatus"],
        queryFn: refetchData,
        onError: (error) => {
            toast({
                title: translate("errorMessages.conductedRouteFileStatusFetchError"),
                description: error.response?.data.error?.message || "",
                status: "error",
            });
        },
    });
};
