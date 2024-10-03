import { useGetVfrLayers } from "../../api-hooks/vfr-layers/getVfrLayers";

export const useVfrListWrapper = () => {
    const vfrLayersQuery = useGetVfrLayers();
    const { data: vfrLayersList } = vfrLayersQuery;

    return {
        vfrLayersList,
    };
};
