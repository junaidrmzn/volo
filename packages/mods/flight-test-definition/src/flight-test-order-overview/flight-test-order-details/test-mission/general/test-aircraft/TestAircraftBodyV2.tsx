import { Grid, GridItem } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { SubSection } from "@voloiq/flight-test-definition-components";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestAircraftTranslation } from "./translations/useTestAircraftTranslation";

export type TestAircraftBodyV2Props = {
    flightTestOrder: FlightTestOrder;
};

export const TestAircraftBodyV2 = (props: TestAircraftBodyV2Props) => {
    const { flightTestOrder } = props;
    const {
        masterModel,
        model,
        msn,
        applicability,
        aircraftCallsign,
        flightConditions,
        revision,
        issueDateFlightConditions,
        permitToFly,
        issueDatePermitToFly,
        validUntil,
    } = flightTestOrder;
    const { t } = useTestAircraftTranslation();

    return (
        <SubSection
            bodyContent={
                <Grid width="100%" templateColumns="repeat(4, 1fr)" templateRows="repeat(4, 1fr)" rowGap={3}>
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Master Model")} text={masterModel} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Model")} text={model} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("MSN")} text={msn} />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Applicability")} text={applicability} />

                    <GridItem colSpan={4} fontSize="xs">
                        <TextWithLabel
                            size="xs"
                            unknownValueText="-"
                            label={t("Aircraft Callsign")}
                            text={<EditorTextDisplay document={aircraftCallsign} />}
                        />
                    </GridItem>

                    <TextWithLabel
                        size="xs"
                        unknownValueText="-"
                        label={t("Flight Conditions")}
                        text={flightConditions}
                    />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Rev.")} text={revision} />
                    <GridItem colSpan={2}>
                        <TextWithLabel
                            size="xs"
                            unknownValueText="-"
                            label={t("Issue Date for Flight Conditions")}
                            text={issueDateFlightConditions}
                        />
                    </GridItem>

                    <GridItem colSpan={2}>
                        <TextWithLabel size="xs" unknownValueText="-" label={t("Permit to Fly")} text={permitToFly} />
                    </GridItem>
                    <TextWithLabel
                        size="xs"
                        unknownValueText="-"
                        label={t("Issue Date for Permit")}
                        text={issueDatePermitToFly}
                    />
                    <TextWithLabel size="xs" unknownValueText="-" label={t("Valid Until")} text={validUntil} />
                </Grid>
            }
        />
    );
};
