import { useGetService } from "@voloiq/service";
import type { FlightTestDefinitionResponseBody } from "./apiModels";

export type UseGetDefinitionOptions = {
    definitionId: string;
    manual?: boolean;
};

export const useGetDefinition = (options: UseGetDefinitionOptions) => {
    const { definitionId, manual = true } = options;

    const { data: definition, refetchData: getDefinition } = useGetService<FlightTestDefinitionResponseBody>({
        route: "ftd/v2/definitions",
        resourceId: definitionId,
        options: {
            manual,
        },
    });

    return { definition, getDefinition };
};
