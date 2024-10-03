import type { ReactNode } from "react";
import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { DefinitionContext } from "./DefinitionContext";

export type DefinitionProviderProps = {
    children: ReactNode;
    definition: FlightTestDefinitionResponseBody;
    refetchDefinition: () => void;
};

export const DefinitionProvider = (props: DefinitionProviderProps) => {
    const { children, definition, refetchDefinition } = props;

    return (
        <DefinitionContext.Provider value={{ definition, refetchDefinition }}>{children}</DefinitionContext.Provider>
    );
};
