import { useCallback } from "react";
import { useDeleteService } from "@voloiq/service";
import type { TestPointParameter } from "./apiModels";

export const useDeleteParameter = () => {
    const { sendRequest } = useDeleteService<TestPointParameter>({
        route: "",
    });

    const deleteParameter = useCallback(
        async (parameterId: string) => {
            await sendRequest({
                url: `/ftd/v1/test-point-parameters/${parameterId}`,
            });
        },
        [sendRequest]
    );

    return { deleteParameter };
};
