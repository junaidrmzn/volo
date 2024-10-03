import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export const useAuthentication = () => {
    const authenticationContextValue = useContext(AuthenticationContext);

    if (!authenticationContextValue) {
        throw new Error("useAuthentication must be used within AuthenticationProvider");
    }

    return authenticationContextValue;
};
