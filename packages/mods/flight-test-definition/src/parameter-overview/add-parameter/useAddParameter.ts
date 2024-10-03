import type { TestPointParameter, TestPointParameterInsert } from "@voloiq-typescript-api/ftd-types";
import { useCreateService } from "@voloiq/service";

export const useAddParameter = () => {
    const { sendRequest } = useCreateService<TestPointParameterInsert, TestPointParameter>({
        route: "/ftd/v1/test-point-parameters",
    });

    return { addParameter: sendRequest };
};
