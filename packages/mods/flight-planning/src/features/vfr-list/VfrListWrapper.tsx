import { useOutletContext } from "@voloiq/routing";
import { VfrList } from "./VfrList";
import { useVfrListWrapper } from "./useVfrListWrapper";

type VfrListWrapperSidebarContext = {
    selectedVfrLayers: string[];
    handleVfrLayerSelection: (selectedVfrLayer: string) => void;
    showVfr: boolean;
    closeRightSidebar: () => void;
};

export const VfrListWrapper = () => {
    const { closeRightSidebar, showVfr, selectedVfrLayers, handleVfrLayerSelection } =
        useOutletContext<VfrListWrapperSidebarContext>();
    const { vfrLayersList } = useVfrListWrapper();

    if (!showVfr) closeRightSidebar();

    return (
        <VfrList
            vfrLayersList={vfrLayersList}
            selectedVfrLayers={selectedVfrLayers}
            handleVfrLayerSelection={handleVfrLayerSelection}
            closeRightSidebar={closeRightSidebar}
        />
    );
};
