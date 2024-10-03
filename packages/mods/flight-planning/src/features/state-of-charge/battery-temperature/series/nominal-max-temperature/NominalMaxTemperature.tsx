import { MarkLineType } from "../../../types";
import { useNominalMaxTemperature } from "./useNominalMaxTemperature";

type NominalMaxTemperatureProps = {
    markLineData: MarkLineType[];
};
export const NominalMaxTemperature = (props: NominalMaxTemperatureProps) => {
    const { markLineData } = props;
    useNominalMaxTemperature(markLineData);
    return null;
};
