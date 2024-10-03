import { Text } from "@volocopter/design-library-react";
import type { Log } from "@voloiq/logbook-api/v6";
import { PreviewSection, PreviewSectionItem, SectionHeader } from "@voloiq/text-layouts";
import { formatDuration } from "@voloiq/utils";
import { useLogDetailsTranslation } from "../../translations/useLogDetailsTranslation";
import { useStatisticsView } from "./useStatisticsView";

export type StatisticsViewProps = {
    log: Log;
};

export const StatisticsView = (props: StatisticsViewProps) => {
    const {
        log: { statistics, files },
    } = props;

    const { t, i18n } = useLogDetailsTranslation();
    const { hasPendingFiles } = useStatisticsView(files);

    if (hasPendingFiles) {
        return (
            <>
                <SectionHeader label={t("statistics.header")} />
                <Text>{t("statistics.statisticsView.pendingText")} </Text>
            </>
        );
    }
    return (
        <PreviewSection headerLabel={t("statistics.header")}>
            <PreviewSectionItem
                label={t("statistics.statisticsView.maxAltitude")}
                text={
                    statistics && typeof statistics.maxAltitude === "number"
                        ? t("statistics.statisticsView.altitudeText", {
                              altitude: statistics.maxAltitude.toLocaleString(i18n.language, {
                                  maximumFractionDigits: 2,
                                  minimumFractionDigits: 2,
                              }),
                          })
                        : undefined
                }
            />
            <PreviewSectionItem
                label={t("statistics.statisticsView.maxVelocity")}
                text={
                    statistics && typeof statistics.maxVelocity === "number"
                        ? t("statistics.statisticsView.velocityText", {
                              velocity: statistics.maxVelocity.toLocaleString(i18n.language, {
                                  maximumFractionDigits: 2,
                                  minimumFractionDigits: 2,
                              }),
                          })
                        : undefined
                }
            />
            <PreviewSectionItem
                label={t("statistics.statisticsView.flightDuration")}
                text={
                    statistics && typeof statistics.totalFlightDuration === "number"
                        ? formatDuration(Math.round(statistics.totalFlightDuration))
                        : undefined
                }
            />
        </PreviewSection>
    );
};
