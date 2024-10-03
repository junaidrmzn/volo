import { createContext } from "react";
import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";

export type DefinitionContextType = {
    definition: FlightTestDefinitionResponseBody;
    refetchDefinition: () => void;
};
export const DefinitionContext = createContext<DefinitionContextType | undefined>(undefined);
