import { useToken } from "@volocopter/design-library-react";
import { useMemo } from "react";

export const useGetSeriesColors = () => {
    const nominalTemperature = useToken("colors", "indigo.500");
    const csflTemperature = useToken("colors", "green.500");
    const pdm2CsflTemperature = useToken("colors", "red.500");
    const conductedRouteTemperature = useToken("colors", "orange.300");
    const maximumTemperature = useToken("colors", "monochrome.500");
    const csflMaximumTemperature = useToken("colors", "indigo.400");
    const markLine = useToken("colors", "gray.700");

    return useMemo(() => {
        return {
            nominalTemperature,
            csflTemperature,
            pdm2CsflTemperature,
            conductedRouteTemperature,
            maximumTemperature,
            csflMaximumTemperature,
            markLine,
        };
    }, [
        nominalTemperature,
        csflTemperature,
        pdm2CsflTemperature,
        conductedRouteTemperature,
        maximumTemperature,
        csflMaximumTemperature,
        markLine,
    ]);
};
