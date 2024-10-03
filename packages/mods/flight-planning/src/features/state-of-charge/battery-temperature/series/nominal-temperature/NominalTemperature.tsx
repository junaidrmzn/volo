import { RegisterLegendClickEventFunctionType } from "@voloiq/graph";
import { MarkLineType } from "../../../types";
import { useRegisterLegendClick } from "../useRegisterLegendClick";
import { useNominalTemperature } from "./useNominalTemperature";

type NominalTemperatureProps = {
    setHasData: (hasData: boolean) => void;
    registerLegendClickEvent: RegisterLegendClickEventFunctionType;
    markLineData: MarkLineType[];
};

export const NominalTemperature = (props: NominalTemperatureProps) => {
    const { setHasData, registerLegendClickEvent, markLineData } = props;
    useNominalTemperature(setHasData, markLineData);
    useRegisterLegendClick(registerLegendClickEvent);
    return null;
};
