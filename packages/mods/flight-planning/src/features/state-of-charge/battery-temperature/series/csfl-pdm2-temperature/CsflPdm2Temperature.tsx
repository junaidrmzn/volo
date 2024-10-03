import { MarkLineType } from "../../../types";
import { useCsflPdm2Temperature } from "./useCsflPdm2Temperature";

type CsflPdm2TemperatureProps = {
    markLineData: MarkLineType[];
};
export const CsflPdm2Temperature = (props: CsflPdm2TemperatureProps) => {
    const { markLineData } = props;
    useCsflPdm2Temperature(markLineData);
    return null;
};
