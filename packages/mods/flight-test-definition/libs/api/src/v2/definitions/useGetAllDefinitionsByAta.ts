import { useGetAllService } from "@voloiq/service";
import type { FlightTestDefinitionResponseBody } from "./apiModels";

export const useGetAllDefinitionsByAta = () =>
    useGetAllService<FlightTestDefinitionResponseBody>({
        route: "/ftd/v2/definitions-by-ata",
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "title:asc",
        },
    });
