import { useCreateService } from "@voloiq/service";
import type { FlightTestDefinitionInsert, FlightTestDefinitionResponseBody } from "./apiModels";

export const useAddDefinition = () => {
    const { sendRequest } = useCreateService<FlightTestDefinitionInsert, FlightTestDefinitionResponseBody>({
        route: "/ftd/v2/definitions",
    });

    return { addDefinition: sendRequest };
};
