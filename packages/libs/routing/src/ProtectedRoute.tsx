import type { Action, Resource } from "@voloiq/auth";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { UnauthorizedPage } from "@voloiq/error-views";

type ProtectedRouteProps = {
    actions?: Action[];
    resources: Resource[];
    redirectPath?: string;
};

export const ProtectedRoute: FCC<ProtectedRouteProps> = (props) => {
    const { actions = ["read"], children, resources } = props;
    const isAuthorized = useIsAuthorizedTo(actions, resources);

    if (!isAuthorized) {
        return <UnauthorizedPage />;
    }

    return <>{children}</>;
};
