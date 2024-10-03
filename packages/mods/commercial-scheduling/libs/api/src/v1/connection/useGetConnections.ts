import { useGetAllService } from "@voloiq/service";
import { CONNECTION_BASE_URL } from "../../serviceEndpoints";
import { Connection } from "./apiModels";

export const useGetConnections = () =>
    useGetAllService<Connection>({ params: { page: 1, size: 10 }, route: CONNECTION_BASE_URL });
