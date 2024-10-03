import { MarkLineType } from "../../../types";
import { useCsflMaxTemperature } from "./useCsflMaxTemperature";

type CsflMaxTemperatureProps = {
    markLineData: MarkLineType[];
};
export const CsflMaxTemperature = (props: CsflMaxTemperatureProps) => {
    const { markLineData } = props;
    useCsflMaxTemperature(markLineData);
    return null;
};
