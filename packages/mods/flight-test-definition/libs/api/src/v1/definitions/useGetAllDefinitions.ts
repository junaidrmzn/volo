import { useGetAllService } from "@voloiq/service";
import type { FlightTestDefinition } from "./apiModels";

export const useGetAllDefinitionsByAta = () =>
    useGetAllService<FlightTestDefinition>({
        route: "/ftd/v1/definitions-by-ata",
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "title:asc",
        },
    });

export const useGetAllDefinitions = () =>
    useGetAllService<FlightTestDefinition>({
        route: "/ftd/v1/definitions",
        options: {
            manual: true,
        },
        params: {
            size: 100,
            orderBy: "title:asc",
        },
    });
