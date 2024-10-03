import { useContext } from "react";
import { PermissionContext } from "./PermissionContext";

export const usePermissions = () => {
    const permissionContextValue = useContext(PermissionContext);

    if (!permissionContextValue) {
        throw new Error("usePermissions must be used within AuthenticationProvider");
    }

    return permissionContextValue;
};
