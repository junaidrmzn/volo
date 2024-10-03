import { Grid, GridItem } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import React from "react";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { SubSection } from "@voloiq/flight-test-definition-components";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestMissionAndWeatherTranslation } from "./translations/useTestMissionAndWeatherTranslation";

export type WeatherBodyV2Props = {
    flightTestOrder?: FlightTestOrder;
};

export const WeatherBodyV2 = (props: WeatherBodyV2Props) => {
    const { flightTestOrder } = props;
    const { t } = useTestMissionAndWeatherTranslation();
    if (flightTestOrder === undefined) {
        return null;
    }
    const { weatherLimits, weatherObserved } = flightTestOrder;

    return (
        <SubSection
            headerLabel={t("Weather")}
            bodyContent={
                <Grid
                    w="full"
                    templateColumns="repeat(4, 1fr)"
                    templateRows="repeat(1, 1fr)"
                    gap={6}
                    role="region"
                    aria-label={t("Weather")}
                >
                    <GridItem colSpan={2} fontSize="xs">
                        <TextWithLabel
                            size="xs"
                            unknownValueText="-"
                            label={t("Flight Conditions Weather Limits")}
                            text={<EditorTextDisplay document={weatherLimits} />}
                        />
                    </GridItem>

                    <GridItem colSpan={2} fontSize="xs">
                        <TextWithLabel
                            size="xs"
                            unknownValueText="-"
                            label={t("Weather Observed")}
                            text={<EditorTextDisplay document={weatherObserved} />}
                        />
                    </GridItem>
                </Grid>
            }
        />
    );
};
