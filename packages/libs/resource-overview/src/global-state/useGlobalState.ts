import { useContext } from "react";
import { GlobalStateContext } from "./GlobalStateContext";

export const useGlobalState = () => {
    const globalState = useContext(GlobalStateContext);

    if (globalState === undefined) {
        throw new Error("useGlobalState must be used within GlobalStateContext");
    }

    return globalState;
};
