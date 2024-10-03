import { useOutletContext } from "@voloiq/routing";
import { StateOfChargeSettings } from "./StateOfChargeSettings";
import type { SocSidebarContext } from "./types";

export const StateOfChargeSettingsWrapper = () => {
    const { selectedRoute, closeRightSidebar } = useOutletContext<SocSidebarContext>();
    if (!selectedRoute) {
        closeRightSidebar();
        return null;
    }

    return <StateOfChargeSettings />;
};
