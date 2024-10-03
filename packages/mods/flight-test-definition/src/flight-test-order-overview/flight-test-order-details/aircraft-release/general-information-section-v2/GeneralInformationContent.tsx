import { Grid, VStack } from "@volocopter/design-library-react";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useGeneralInformationSectionTranslation } from "./translations/useGeneralInformationSectionTranslation";

export type GeneralInformationContentProps = {
    flightTestOrder: FlightTestOrder;
};

export const GeneralInformationContent = (props: GeneralInformationContentProps) => {
    const { flightTestOrder } = props;

    const { t } = useGeneralInformationSectionTranslation();
    const { formatDate } = useFormatDateTime();

    return (
        <VStack w="full" spacing={4} alignItems="stretch">
            <Grid gridTemplateColumns="repeat(2, 1fr)">
                <TextWithLabel
                    unknownValueText="-"
                    size="small"
                    label={t("Aircraft Configuration Status")}
                    text={flightTestOrder?.aircraftConfigurationStatus}
                />
                <TextWithLabel
                    unknownValueText="-"
                    size="small"
                    label={t("Date")}
                    text={flightTestOrder?.date ? formatDate(flightTestOrder?.date) : "-"}
                />
            </Grid>
            <Grid gridTemplateColumns="repeat(2, 1fr)">
                <TextWithLabel
                    unknownValueText="-"
                    size="small"
                    label={t("Issued approved Limitations")}
                    text={flightTestOrder.issuedApprovedLimitations}
                />
            </Grid>
        </VStack>
    );
};
