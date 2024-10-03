import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "@voloiq/routing";

export const useRightSidebar = (resetRouteTemplatePreview: () => void, setShowNotam: (showNotams: boolean) => void) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { routeOptionId } = useParams();
    const queryClient = useQueryClient();

    const closeRightSidebar = () => {
        navigate(`../route-options/${routeOptionId!}/map${location.search}`);
    };

    const toggleRouteTemplateList = () => {
        if (location.pathname.endsWith("/templates")) {
            closeRightSidebar();
        } else {
            navigate(`templates${location.search}`);
        }
        resetRouteTemplatePreview();
    };

    const toggleSocSettings = () => {
        if (location.pathname.endsWith("/soc-settings")) {
            closeRightSidebar();
        } else {
            navigate(`soc-settings${location.search}`);
        }
    };

    const toggleNotamList = () => {
        if (location.pathname.endsWith("/notams")) {
            closeRightSidebar();
        } else {
            navigate(`notams${location.search}`);
            setShowNotam(true);
        }
    };

    const toggleAlertsList = () => {
        if (location.pathname.endsWith("/alerts")) {
            closeRightSidebar();
        } else {
            navigate(`alerts${location.search}`);
        }
    };

    const toggleAirspaceList = () => {
        if (location.pathname.endsWith("/airspaces")) {
            closeRightSidebar();
        } else {
            navigate(`airspaces${location.search}`);
        }
    };

    const toggleVfrList = () => {
        if (location.pathname.endsWith("/vfrlayers")) {
            closeRightSidebar();
        } else {
            navigate(`vfrlayers${location.search}`);
        }
    };

    const toggleCsflSite = () => {
        if (location.pathname.endsWith("/csflSite")) {
            closeRightSidebar();
        } else {
            navigate(`csflSite${location.search}`);
        }
    };

    useEffect(() => {
        if (location.pathname.endsWith("/soc-settings")) closeRightSidebar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryClient.isMutating({ mutationKey: "editWaypointOnRoute" })]);

    useEffect(() => {
        if (!location.pathname.endsWith("/map")) closeRightSidebar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        toggleRouteTemplateList,
        toggleSocSettings,
        toggleNotamList,
        toggleAlertsList,
        toggleCsflSite,
        toggleAirspaceList,
        closeRightSidebar,
        toggleVfrList,
    };
};
