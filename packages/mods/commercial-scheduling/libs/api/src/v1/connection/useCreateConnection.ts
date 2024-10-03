import { useCreateService } from "@voloiq/service";
import { CONNECTION_BASE_URL } from "../../serviceEndpoints";
import { Connection, CreateConnection } from "./apiModels";

export const useCreateConnection = () => useCreateService<CreateConnection, Connection>({ route: CONNECTION_BASE_URL });
