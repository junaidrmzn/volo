import { createContext } from "react";
import type { Permission } from "../authorization/authorization";

export type PermissionContextValue = {
    permissions: Permission[];
};

export const PermissionContext = createContext<PermissionContextValue | undefined>(undefined);
