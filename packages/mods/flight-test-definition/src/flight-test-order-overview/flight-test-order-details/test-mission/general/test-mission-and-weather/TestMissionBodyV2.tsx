import { Grid } from "@volocopter/design-library-react";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { SubSection } from "@voloiq/flight-test-definition-components";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestMissionAndWeatherTranslation } from "./translations/useTestMissionAndWeatherTranslation";

export type TestMissionAndWeatherBodyV2Props = {
    flightTestOrder: FlightTestOrder;
};

export const TestMissionBodyV2 = (props: TestMissionAndWeatherBodyV2Props) => {
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
    } = flightTestOrder;

    const { t } = useTestMissionAndWeatherTranslation();

    return (
        <SubSection
            bodyContent={
                <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)" gap={6}>
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Max Test Alt.")} text={maxTestAltitude} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Flight Rule")} text={flightRule} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Departure")} text={departure} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Arrival")} text={arrival} />

                    <TextWithLabel
                        size="xs"
                        unknownValueText="-"
                        label={t("Frequency OPS")}
                        text={frequencyOperations}
                    />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Frequency TWR")} text={frequencyTower} />
                    <TextWithLabel
                        size="xs"
                        unknownValueText="-"
                        label={t("Optional Frequency")}
                        text={optionalFrequency}
                    />
                    <TextWithLabel
                        size="xs"
                        unknownValueText="-"
                        label={t("Airspace Requested")}
                        text={airspaceRequested}
                    />
                </Grid>
            }
        />
    );
};
