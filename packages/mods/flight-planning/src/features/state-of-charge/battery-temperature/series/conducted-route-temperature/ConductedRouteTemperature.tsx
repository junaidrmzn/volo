import { MarkLineType } from "../../../types";
import { useConductedRouteTemperature } from "./useConductedRouteTemperature";

type ConductedRouteTemperatureProps = {
    markLineData: MarkLineType[];
};
export const ConductedRouteTemperature = (props: ConductedRouteTemperatureProps) => {
    const { markLineData } = props;
    useConductedRouteTemperature(markLineData);
    return null;
};
