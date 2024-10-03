import { VStack } from "@volocopter/design-library-react";
import type { Log } from "@voloiq/logbook-api/v6";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { formatUTCDate } from "@voloiq/utils/src";
import { transformRemarks } from "../details/transformRemarks";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";
import { useLogbookPreviewTranslation } from "./translations/useLogbookPreviewTranslation";

export type LogPreviewVolocityProps = {
    log: Log;
};

export const LogPreviewVolocity = (props: LogPreviewVolocityProps) => {
    const { log } = props;
    const { aircraft, date, location, remarks, flightTestOrder } = log;

    const { t } = useLogbookTranslation();
    const { t: tPreview } = useLogbookPreviewTranslation();

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={tPreview("General")}>
                <PreviewSectionItem
                    label={t("logDetails.tabs.general.aircraftLabel")}
                    text={`${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`}
                    fullWidth
                />
                <PreviewSectionItem
                    label={t("logDetails.tabs.general.timeOfFlightLabel")}
                    text={formatUTCDate(new Date(date))}
                />
                <PreviewSectionItem label={t("logDetails.tabs.general.flightTestOrder")} text={flightTestOrder} />
                <PreviewSectionItem label={t("logDetails.tabs.general.locationLabel")} text={location.icaoCode} />
                <PreviewSectionItem
                    label={t("logDetails.tabs.general.remarksLabel")}
                    text={transformRemarks(remarks)}
                />
            </PreviewSection>
        </VStack>
    );
};
