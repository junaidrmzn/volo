import { useVfrLayer } from "./useVfrLayer";

export type VfrLayerProps = {
    tilesets: string[];
    isSatellite: boolean;
};

export const VfrLayer = (props: VfrLayerProps) => {
    const { tilesets, isSatellite } = props;
    useVfrLayer({ tilesets, isSatellite });
    return null;
};
