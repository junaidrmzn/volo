import { useCallback, useState } from "react";
import { useDeleteVfrLayer } from "../../api-hooks/vfr-layers/deleteVfrLayers";
import { useFlightPlanningTranslation } from "../../translations";
import type { VfrLayer } from "./types";

type SelectOption = {
    value?: string | null | undefined;
    label: string;
};

type UseVfrListProps = {
    vfrLayersList: VfrLayer[] | undefined;
    handleVfrLayerSelection: (selectedVfrLayers: string) => void;
};

const addOptionsToList = (regionsList: string[]) => {
    return regionsList.map((region) => ({ value: region, label: `${region}` }));
};

export const useVfrList = (props: UseVfrListProps) => {
    const { handleVfrLayerSelection, vfrLayersList } = props;
    const [availableRegions, setAvailableRegions] = useState<SelectOption[]>();
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined | null>();
    const [vfrLayerToDelete, setVfrLayerToDelete] = useState<VfrLayer | undefined>();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { deleteVfrLayer } = useDeleteVfrLayer();
    const { t } = useFlightPlanningTranslation();

    const changeSelectedOption = (option: SelectOption | null) => {
        setSelectedOption(option);
    };

    const displayConfirmationModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteConfirmation = (selectedVfrLayers: string[]) => {
        // if VfrLayerToDelete is included in the list of selectedVfrLayers, remove it from the current selected maps by passing it to handleVfrLayerSelection.
        if (vfrLayerToDelete) {
            if (selectedVfrLayers?.includes(vfrLayerToDelete.file_name)) {
                handleVfrLayerSelection(vfrLayerToDelete.file_name);
            }
            deleteVfrLayer(vfrLayerToDelete.id);
        }
        setIsDeleteModalOpen(false);
        setVfrLayerToDelete(undefined);
    };

    // Create unqiue list for regions
    const createRegionOptions = useCallback(() => {
        const regionsListWithDoubles = vfrLayersList?.map((tileMap) => tileMap.region_id);
        const uniqueRegionList = [...new Set(regionsListWithDoubles)];
        const regionOptionsList = addOptionsToList(uniqueRegionList);
        const completeOptionsList = [
            { value: undefined, label: `${t("vfrLayer.selectRegion")}...` },
            ...regionOptionsList,
        ];
        setAvailableRegions(completeOptionsList);
    }, [vfrLayersList, t]);

    return {
        availableRegions,
        createRegionOptions,
        selectedOption,
        changeSelectedOption,
        isDeleteModalOpen,
        displayConfirmationModal,
        handleDeleteModalCancel,
        handleDeleteConfirmation,
        vfrLayerToDelete,
        setVfrLayerToDelete,
    };
};
