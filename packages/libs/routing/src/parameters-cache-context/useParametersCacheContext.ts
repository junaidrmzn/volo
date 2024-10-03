import { useContext } from "react";
import { ParametersCacheContext } from "./ParametersCacheContext";

export const useParametersCacheContext = () => {
    const parameterContext = useContext(ParametersCacheContext);

    if (!parameterContext) {
        throw new Error("useParametersContext must be used within ParametersProvider");
    }

    return parameterContext;
};
