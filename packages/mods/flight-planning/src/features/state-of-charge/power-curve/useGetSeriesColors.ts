import { useToken } from "@volocopter/design-library-react";

export const useGetSeriesColors = () => {
    const nominalEnergy = useToken("colors", "indigo.500");
    const nominalCsflEnergy = useToken("colors", "green.500");
    const pdm2CsflEnergy = useToken("colors", "red.500");
    const conductedRouteEnergy = useToken("colors", "orange.300");
    const markLine = useToken("colors", "gray.700");
    const finalReserveEnergy = useToken("colors", "indigo.400");
    const contingencyEnergy = useToken("colors", "monochrome.500");
    const unusableEnergy = useToken("colors", "green.300");
    const additionalEnergy = useToken("colors", "coral.300");
    const extraEnergy = useToken("colors", "sunrise.400");
    const discretionaryEnergy = useToken("colors", "mint.500");

    return {
        nominalEnergy,
        nominalCsflEnergy,
        pdm2CsflEnergy,
        conductedRouteEnergy,
        markLine,
        finalReserveEnergy,
        contingencyEnergy,
        unusableEnergy,
        additionalEnergy,
        extraEnergy,
        discretionaryEnergy,
    };
};
