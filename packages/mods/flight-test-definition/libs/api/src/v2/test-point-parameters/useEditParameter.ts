import { usePatchService } from "@voloiq/service";
import type { TestPointParameter, TestPointParameterPatch } from "./apiModels";

export const useEditParameter = (parameterId: string) => {
    const { sendRequest } = usePatchService<TestPointParameterPatch, TestPointParameter>({
        resourceId: parameterId,
        route: "/ftd/v2/test-point-parameters",
    });

    return { editParameter: sendRequest };
};
