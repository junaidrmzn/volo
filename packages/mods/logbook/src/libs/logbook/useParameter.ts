import type { Parameter } from "@voloiq-typescript-api/fti-types";
import { useState } from "react";
import { SizeBasedPagination, useAxiosService } from "@voloiq/service";

export const useGetParameters = () => {
    const { axiosGet } = useAxiosService();
    const [pagination, setPagination] = useState<SizeBasedPagination>();

    const path = "/instrumentation-parameters";
    const baseURL = `${BACKEND_BASE_URL}/ftd/v1`;

    const getParameters = (props: Omit<Parameters<typeof axiosGet>[0], "path">) =>
        axiosGet<Parameter[]>({
            path,
            baseURL,
            ...props,
        }).then((result) => {
            setPagination(result.pagination as SizeBasedPagination);
            return result.data || [];
        });

    return { getParameters, pagination };
};
