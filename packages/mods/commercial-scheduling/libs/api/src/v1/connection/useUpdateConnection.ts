import { useUpdateService } from "@voloiq/service";
import { CONNECTION_BASE_URL } from "../../serviceEndpoints";

export const useUpdateConnection = () => useUpdateService({ route: `${CONNECTION_BASE_URL}` });
