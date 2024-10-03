import { useContext } from "react";
import { LogContext } from "./LogContext";

export const useLogContext = () => {
    const logContext = useContext(LogContext);

    if (!logContext) {
        throw new Error("useLogContext must be used within LogContext.Provider");
    }

    return logContext;
};
