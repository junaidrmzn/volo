import { HStack } from "@volocopter/design-library-react";
import type { Aircraft } from "@voloiq-typescript-api/network-scheduling-types";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

type AircraftRowLabelType = {
    aircraftData: Aircraft;
};
export const AircraftRowLabel = (props: AircraftRowLabelType) => {
    const { aircraftData } = props;
    const { t } = useMissionTranslations();

    return (
        <HStack
            boxSize="full"
            justifyContent="space-between"
            p={4}
            columnGap={2}
            spacing={0}
            alignItems="flex-start"
            aria-label={t("aircraft")}
        >
            <TextWithLabel label={t("aircraft")} text={`${aircraftData.aircraftTypeName} - ${aircraftData.msn}`} />
        </HStack>
    );
};
