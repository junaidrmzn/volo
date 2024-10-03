import type { NavigationBarMenuEntryProps } from "@volocopter/design-library-react";
import { NavigationBarMenuEntry } from "@volocopter/design-library-react";
import type { Action, RequirePermissionsProps } from "@voloiq/auth";
import { RequirePermissions } from "@voloiq/auth";
import { Link } from "@voloiq/routing";
import { ConditionalWrapper } from "@voloiq/utils";

export type ProtectedNavigationBarMenuEntryProps = Pick<NavigationBarMenuEntryProps, "label"> & {
    to: string;
    requiresPermissionsFor?: RequirePermissionsProps["resources"];
    isActive?: boolean;
    isExternal?: boolean;
};
export const ProtectedNavigationBarMenuEntry = (props: ProtectedNavigationBarMenuEntryProps) => {
    const { label, to, requiresPermissionsFor, isActive, isExternal } = props;
    const actions: Action[] = ["read"];

    return (
        <ConditionalWrapper
            Wrapper={RequirePermissions}
            wrapperProps={{ resources: requiresPermissionsFor!, actions }}
            condition={requiresPermissionsFor !== undefined}
        >
            {isExternal ? (
                <NavigationBarMenuEntry href={to} label={label} isActive={isActive} />
            ) : (
                <NavigationBarMenuEntry as={Link} to={to} label={label} isActive={isActive} />
            )}
        </ConditionalWrapper>
    );
};
