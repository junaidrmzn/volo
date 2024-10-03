import { NavigationBarMenuItem } from "@volocopter/design-library-react";
import { Children, ReactElement, ReactNode, isValidElement } from "react";
import { useIsAuthorizedToSome } from "@voloiq/auth";
import { isProtectedNavigationBarMenuEntry } from "./isProtectedNavigationBarMenuEntry";

export type ProtectedNavigationBarMenuItemProps = {
    children: ReactNode;
    label: string;
    icon: ReactElement;
};

export const ProtectedNavigationBarMenuItem = (props: ProtectedNavigationBarMenuItemProps) => {
    const { children, icon, label } = props;

    const resourcesArray = Children.toArray(children)
        .filter(isValidElement)
        .filter(isProtectedNavigationBarMenuEntry)
        .map((child) => child.props.requiresPermissionsFor ?? []);

    const hasChildren = resourcesArray.length > 0;
    const hasPermissionToSeeSomeMenuItemEntries = useIsAuthorizedToSome(["read"], resourcesArray);

    return hasChildren && hasPermissionToSeeSomeMenuItemEntries ? (
        <NavigationBarMenuItem label={label} icon={icon}>
            {children}
        </NavigationBarMenuItem>
    ) : null;
};
