import { Grid, GridItem } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestMissionAndWeatherTranslation } from "./translations/useTestMissionAndWeatherTranslation";

export type TestMissionAndWeatherBodyProps = {
    flightTestOrder: FlightTestOrder;
};

export const TestMissionAndWeatherBody = (props: TestMissionAndWeatherBodyProps) => {
    const { flightTestOrder } = props;
    const {
        maxTestAltitude,
        flightRule,
        departure,
        arrival,
        frequencyOperations,
        frequencyTower,
        optionalFrequency,
        airspaceRequested,
        weatherLimits,
        weatherObserved,
    } = flightTestOrder;

    const { t } = useTestMissionAndWeatherTranslation();

    return (
        <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(3, 1fr)" gap={6}>
            <TextWithLabel size="xs" unknownValueText="-" label={t("Max Test Alt.")} text={maxTestAltitude} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Flight Rule")} text={flightRule} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Departure")} text={departure} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Arrival")} text={arrival} />

            <TextWithLabel size="xs" unknownValueText="-" label={t("Frequency OPS")} text={frequencyOperations} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Frequency TWR")} text={frequencyTower} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Optional Frequency")} text={optionalFrequency} />
            <TextWithLabel size="xs" unknownValueText="-" label={t("Airspace Requested")} text={airspaceRequested} />

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
    );
};
