import { Route, Waypoint } from "@voloiq/flight-planning-api/v1";

export const useSnapDialog = (
    setSnapTarget: (wp: Waypoint | undefined) => void,
    setSnapTargetRoute: (route: Route | undefined) => void
) => {
    const handleSnapDialogCancel = () => {
        setSnapTarget(undefined);
        setSnapTargetRoute(undefined);
    };

    return { handleSnapDialogCancel };
};
