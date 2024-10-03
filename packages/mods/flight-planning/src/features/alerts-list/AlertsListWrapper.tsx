import { useOutletContext } from "@voloiq/routing";
import { ErrorPage } from "../../components";
import { AlertsList } from "./AlertsList";
import { useAlertsListWrapper } from "./useAlertsListWrapper";

type AlertsListWrapperSidebarContext = { closeRightSidebar: () => void };

export const AlertsListWrapper = () => {
    const { closeRightSidebar } = useOutletContext<AlertsListWrapperSidebarContext>();
    const { alerts } = useAlertsListWrapper();

    if (!alerts)
        return (
            <ErrorPage error="Error alerts property is not in selectedRoute which results in alertslist not being able to render" />
        );

    return <AlertsList alerts={alerts} closeRightSidebar={closeRightSidebar} />;
};
