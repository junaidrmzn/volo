import { useGetAllService } from "@voloiq/service";
import { CONNECTION_BASE_URL } from "../../serviceEndpoints";
import { Connection } from "./apiModels";

type UseGetConnectionsOptions = {
    manual: boolean;
};

export const useGetConnections = (options: UseGetConnectionsOptions) =>
    useGetAllService<Connection>({
        route: CONNECTION_BASE_URL,
        options,
    });
