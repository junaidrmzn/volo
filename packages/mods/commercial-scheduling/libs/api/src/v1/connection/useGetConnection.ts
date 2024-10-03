import { useGetService } from "@voloiq/service";
import { CONNECTION_BASE_URL } from "../../serviceEndpoints";
import { Connection } from "./apiModels";

export const useGetConnection = (connectionId?: string) =>
    useGetService<Connection>({ resourceId: connectionId ?? "", route: CONNECTION_BASE_URL });
