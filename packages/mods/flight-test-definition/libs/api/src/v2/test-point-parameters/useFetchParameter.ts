import { useCallback } from "react";
import { useGetService } from "@voloiq/service";
import type { TestPointParameter } from "./apiModels";

export const useFetchParameter = () => {
    const { refetchDataWithResponseEnvelope } = useGetService<TestPointParameter>({
        route: "",
        resourceId: "",
        options: {
            manual: true,
        },
    });

    const fetchParameter = useCallback(
        (parameterId: string) => {
            return refetchDataWithResponseEnvelope({
                url: `/ftd/v2/test-point-parameters/${parameterId}`,
            });
        },
        [refetchDataWithResponseEnvelope]
    );

    return { fetchParameter };
};
