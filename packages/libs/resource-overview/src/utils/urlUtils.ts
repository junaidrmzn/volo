import { useLocation } from "@voloiq/routing";

/**
 * Parses the selected resource id from the URL.
 * This is a temporary measure until we have proper routing in the resource overview.
 */
export const useGetResourceIdFromURL = () => {
    const location = useLocation();
    const routeParameters = location.pathname.split("/");
    return routeParameters[routeParameters.indexOf("overview") + 1];
};

/**
 * Persists the selected resource id in the URL.
 * This is a temporary measure until we have proper routing in the resource overview.
 */
export const updateURLFromState = (selectedResourceId?: string) => {
    const routeParameters = window.location.pathname.split("/");
    const pathNameUntilOverview = routeParameters.slice(0, routeParameters.indexOf("overview") + 1).join("/");
    const { origin, search } = window.location;

    if (selectedResourceId) {
        window.history.replaceState(undefined, "", `${origin}${pathNameUntilOverview}/${selectedResourceId}${search}`);
    } else {
        window.history.replaceState(undefined, "", `${origin}${pathNameUntilOverview}${search}`);
    }
};
