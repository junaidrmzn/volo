import { useCallback } from "react";
import { useDeleteService } from "@voloiq/service";
import type { FlightTestDefinition } from "./apiModels";

export const useDeleteDefinition = () => {
    const { sendRequest } = useDeleteService<FlightTestDefinition>({
        route: "",
    });

    const deleteDefinition = useCallback(
        async (definitionId: string, editSessionId: string) => {
            await sendRequest({
                url: `/ftd/v1/definitions/${definitionId}`,
                params: { editSessionId },
            });
        },
        [sendRequest]
    );

    return { deleteDefinition };
};
