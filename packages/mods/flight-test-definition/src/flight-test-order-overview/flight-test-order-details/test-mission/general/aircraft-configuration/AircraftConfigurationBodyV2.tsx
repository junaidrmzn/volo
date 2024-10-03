import { Grid, GridItem } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { SubSection } from "@voloiq/flight-test-definition-components";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useAircraftConfigurationTranslation } from "./translations/useAircraftConfigurationTranslation";

export type AircraftConfigurationBodyV2Props = {
    flightTestOrder: FlightTestOrder;
};

export const AircraftConfigurationBodyV2 = (props: AircraftConfigurationBodyV2Props) => {
    const { flightTestOrder } = props;
    const {
        allUpMass,
        centerOfGravity,
        massAndBalanceCategory,
        ballasts,
        charging,
        bingo,
        totalDuration,
        setupSheet,
        notesToAircraft,
    } = flightTestOrder;

    const { t } = useAircraftConfigurationTranslation();
    return (
        <SubSection
            bodyContent={
                <Grid width="100%" templateColumns="repeat(4, 1fr)" templateRows="repeat(3, 1fr)" rowGap={3}>
                    <TextWithLabel size="xs" unknownValueText="-" label={t("AUM")} text={allUpMass} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("CG")} text={centerOfGravity} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("M&B Cat.")} text={massAndBalanceCategory} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Ballasts")} text={ballasts} />

                    <TextWithLabel size="xs" unknownValueText="-" label={t("Charging")} text={charging} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Bingo")} text={bingo} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Total Duration")} text={totalDuration} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Setup Sheet")} text={setupSheet} />

                    <GridItem colSpan={4} fontSize="xs">
                        <TextWithLabel
                            size="xs"
                            unknownValueText="-"
                            label={t("Notes to Aircraft & Configuration")}
                            text={<EditorTextDisplay document={notesToAircraft} />}
                        />
                    </GridItem>
                </Grid>
            }
        />
    );
};
