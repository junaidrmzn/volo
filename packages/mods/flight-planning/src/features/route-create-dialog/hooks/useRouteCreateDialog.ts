import { Route } from "@voloiq/flight-planning-api/v1";
import { useLocation, useNavigate, useParams } from "@voloiq/routing";
import { useCreateRoute } from "../../../api-hooks";
import { useSelectedRoute } from "../../selected-route";

export const useRouteCreateDialog = (
    routes: Route[],
    resetRouteTemplatePreview: () => void,
    handleCloseCreateDialog: () => void,
    handleRefocusCallback: (route?: Route) => void
) => {
    const { routeOptionId } = useParams();
    const { selectRoute } = useSelectedRoute();
    const { createRouteAsync } = useCreateRoute(routeOptionId!);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateNewRoute = () => {
        handleCloseCreateDialog();

        // TODO: use actual creator for plannedBy
        createRouteAsync({ name: `New Route ${routes.length + 1}`, plannedBy: "Flight-Planning User" }).then(
            (responseData) => {
                if (responseData.data) {
                    selectRoute(responseData.data.id);
                    handleRefocusCallback();
                }
                resetRouteTemplatePreview();

                const navigatePath = `../route-options/${routeOptionId!}/map?selectedRoute=${responseData.data!.id}&${
                    location.search
                }`;

                // close route template list if it's open
                // when clicking "new route" in route create dialog
                navigate(navigatePath);
            }
        );
    };

    return { handleCreateNewRoute };
};
