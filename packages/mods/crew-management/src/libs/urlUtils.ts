export const getResourceIdFromURL = () => {
    const routeParameters = window.location.pathname.split("/");
    return routeParameters[routeParameters.indexOf("overview") + 1];
};
