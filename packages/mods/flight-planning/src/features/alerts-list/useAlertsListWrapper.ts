import { useOutletContext } from "@voloiq/routing";
import { useFlightStatusContext } from "../../contexts/flight-status";
import { useSelectedRoute } from "../selected-route";

type AlertsListWrapperSidebarContext = { closeRightSidebar: () => void };

export const useAlertsListWrapper = () => {
    const { closeRightSidebar } = useOutletContext<AlertsListWrapperSidebarContext>();
    const { selectedRoute } = useSelectedRoute();
    const { alerts } = useFlightStatusContext();

    if (!selectedRoute) closeRightSidebar();

    return { alerts };
};
