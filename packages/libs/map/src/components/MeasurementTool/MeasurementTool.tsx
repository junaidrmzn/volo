import { Tag } from "@volocopter/design-library-react";
import { useMeasurementTool } from "./hooks";

type MeasurementToolProps = {
    map?: maplibregl.Map;
    isReady: boolean;
};

export const MeasurementTool = (props: MeasurementToolProps) => {
    const { map, isReady } = props;

    const { totalDistance } = useMeasurementTool(isReady, map);

    return <Tag colorScheme="gray">{totalDistance.toFixed(2)} km</Tag>;
};
