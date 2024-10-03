import { useAirspaceLayer } from "./useAirspaceLayer";

export type Option = {
    value: number;
    label: string | undefined;
    type?: string;
};

type AirspaceLayerProps = {
    altitudeRange: [number, number];
    selectedAirspaceOptions: Option[];
    isSatellite: Boolean;
};

export const AirspaceLayer = (props: AirspaceLayerProps) => {
    const { altitudeRange, selectedAirspaceOptions, isSatellite } = props;
    useAirspaceLayer({ altitudeRange, selectedAirspaceOptions, isSatellite });
    return null;
};
