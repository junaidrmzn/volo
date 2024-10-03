import { MarkLineType } from "../../../types";
import { useCsflTemperature } from "./useCsflTemperature";

type CsflTemperatureProps = {
    markLineData: MarkLineType[];
};
export const CsflTemperature = (props: CsflTemperatureProps) => {
    const { markLineData } = props;
    useCsflTemperature(markLineData);
    return null;
};
