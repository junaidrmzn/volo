import { HStack } from "@volocopter/design-library-react";
import React from "react";
import { BadgeWithNumber } from "@voloiq/flight-test-definition-components";
import { useFlightTestOrderListItemV2Translation } from "./translations/useFlightTestOrderListItemV2Translation";

type FlightTestOrderAttachmentsProps = {
    testPointSequenceCounter: number;
    testPointCounter: number;
};

export const FlightTestOrderAttachments = (props: FlightTestOrderAttachmentsProps) => {
    const { testPointCounter, testPointSequenceCounter } = props;
    const { t } = useFlightTestOrderListItemV2Translation();

    return (
        <HStack spacing={1}>
            <BadgeWithNumber title={t("Test Point Sequences")} count={testPointSequenceCounter} />
            <BadgeWithNumber title={t("Test Points")} count={testPointCounter} />
        </HStack>
    );
};
