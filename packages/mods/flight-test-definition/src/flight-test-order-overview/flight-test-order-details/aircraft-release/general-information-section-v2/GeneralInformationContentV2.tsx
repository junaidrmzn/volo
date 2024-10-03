import { Grid, VStack } from "@volocopter/design-library-react";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { SubSection } from "@voloiq/flight-test-definition-components";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useGeneralInformationSectionTranslation } from "./translations/useGeneralInformationSectionTranslation";

export type GeneralInformationContentV2Props = {
    flightTestOrder: FlightTestOrder;
};

export const GeneralInformationContentV2 = (props: GeneralInformationContentV2Props) => {
    const { flightTestOrder } = props;

    const { t } = useGeneralInformationSectionTranslation();
    const { formatDate } = useFormatDateTime();

    return (
        <SubSection
            bodyContent={
                <VStack w="full" alignItems="stretch">
                    <Grid gridTemplateColumns="repeat(1, 1fr)" gap={3}>
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
                        <TextWithLabel
                            unknownValueText="-"
                            size="small"
                            label={t("Issued approved Limitations")}
                            text={flightTestOrder.issuedApprovedLimitations}
                        />
                    </Grid>
                </VStack>
            }
        />
    );
};
