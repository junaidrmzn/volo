import { useCreateService } from "@voloiq/service";
import type { SoftwareConfig } from "./apiModels";

export const useAddSoftwareConfiguration = () => {
    const {
        data: softwareConfiguration,
        sendRequest: addSoftwareConfiguration,
        statusCode,
        state,
        error,
    } = useCreateService<FormData, SoftwareConfig>({
        route: "software-configs",
    });

    return {
        softwareConfiguration,
        addSoftwareConfiguration,
        statusCode,
        state,
        error,
    };
};
