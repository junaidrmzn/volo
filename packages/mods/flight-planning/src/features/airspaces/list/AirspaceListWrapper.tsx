import { useOutletContext } from "@voloiq/routing";
import { ErrorPage } from "../../../components";
import { AirspaceList } from "./AirspaceList";

type AirspaceListWrapperSidebarContext = {
    closeRightSidebar: () => void;
    showAirspaces: boolean;
};

export const AirspaceListWrapper = () => {
    const { closeRightSidebar, showAirspaces } = useOutletContext<AirspaceListWrapperSidebarContext>();

    if (!showAirspaces) {
        closeRightSidebar();
    }

    if (!showAirspaces) return <ErrorPage error="No airspaces" />;

    return <AirspaceList closeRightSidebar={closeRightSidebar} />;
};
