import { useDeleteService } from "@voloiq/service";

export const useDeleteSoftwareConfiguration = () => {
    const { sendRequest: deleteSoftwareConfiguration, error, state } = useDeleteService({ route: "software-configs" });
    return { deleteSoftwareConfiguration, error, state };
};
