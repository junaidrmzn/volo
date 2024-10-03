import { usePermissions } from "../authentication/usePermissions";
import type { Action, Permission, Resource } from "./authorization";

const checkAuthorization = (actions: Action[], resources: Resource[], permissions: Permission[]) => {
    if (permissions.includes("*")) {
        return true;
    }

    for (const action of actions) {
        for (const resource of resources) {
            if (!permissions.includes(`${resource}.${action}`)) {
                return false;
            }
        }
    }

    return true;
};

export const useIsAuthorizedToSome = (actions: Action[], resourcesArray: Resource[][]) => {
    const { permissions } = usePermissions();

    return resourcesArray.map((resources) => checkAuthorization(actions, resources, permissions)).some(Boolean);
};

export const useIsAuthorizedTo = (actions: Action[], resources: Resource[]) => {
    const { permissions } = usePermissions();

    return checkAuthorization(actions, resources, permissions);
};
