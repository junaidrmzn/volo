import type { ReactNode } from "react";
import type { Action, Resource } from "./authorization";
import { useIsAuthorizedTo } from "./useIsAuthorizedTo";

export type RequirePermissionsProps = {
    actions: Action[];
    resources: Resource[];
    children: ReactNode;
};

export const RequirePermissions = (props: RequirePermissionsProps) => {
    const { children, actions, resources } = props;
    const isAuthorized = useIsAuthorizedTo(actions, resources);

    if (isAuthorized) {
        return <>{children}</>;
    }

    return null;
};
