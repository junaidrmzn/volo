/* eslint-disable use-encapsulation/prefer-custom-hooks */
import { useState } from "react";
import { ParametersCacheContext } from "./ParametersCacheContext";

export const ParametersCacheProvider: FCC = (props) => {
    const { children } = props;

    const [parametersCache, setParametersCache] = useState<Record<string, string> | undefined>(undefined);
    const [initialized, setInitialized] = useState<boolean>(false);

    return (
        <ParametersCacheContext.Provider
            value={{ parametersCache, setParametersCache, initialized, setInitialized: () => setInitialized(true) }}
        >
            {children}
        </ParametersCacheContext.Provider>
    );
};
