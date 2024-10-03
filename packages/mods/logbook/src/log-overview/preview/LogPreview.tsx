import { VStack } from "@volocopter/design-library-react";
import { CrewMemberRoleEnum } from "@voloiq/logbook-api/v6";
import type { Log } from "@voloiq/logbook-api/v6";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { formatDuration, formatUTCDate } from "@voloiq/utils";
import { transformRemarks } from "../details/transformRemarks";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";
import { useLogbookPreviewTranslation } from "./translations/useLogbookPreviewTranslation";

export type LogPreviewProps = {
    log: Log;
};

export const LogPreview = (props: LogPreviewProps) => {
    const { log } = props;
    const { aircraft, date, fcSoftware, files, location, crew, remarks, statistics } = log;

    const { t, i18n } = useLogbookTranslation();
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
                    fullWidth
                />

                <PreviewSectionItem label={t("logDetails.tabs.general.fcSoftwareLabel")} text={fcSoftware} />

                <PreviewSectionItem label={t("logDetails.tabs.general.locationLabel")} text={location.icaoCode} />
                <PreviewSectionItem
                    label={t("logDetails.tabs.general.crewPilotLabel")}
                    text={
                        crew
                            ?.filter((member) => member.role === CrewMemberRoleEnum.PILOT)
                            .map((member) => `${member.firstName} ${member.lastName}`)
                            .join(", ") || undefined
                    }
                />
                <PreviewSectionItem
                    label={t("logDetails.tabs.general.crewSupervisorLabel")}
                    text={
                        crew
                            ?.filter((member) => member.role === CrewMemberRoleEnum.SUPERVISOR)
                            .map((member) => `${member.firstName} ${member.lastName}`)
                            .join(", ") || undefined
                    }
                />
                <PreviewSectionItem
                    label={t("logDetails.tabs.general.remarksLabel")}
                    text={transformRemarks(remarks)}
                />
                <PreviewSectionItem label={tPreview("labels.Number of files")} text={files.length.toString()} />
            </PreviewSection>
            <PreviewSection headerLabel={tPreview("statistics")}>
                <PreviewSectionItem
                    label={t("logDetails.tabs.statistics.maxAltitude")}
                    text={
                        statistics && typeof statistics.maxAltitude === "number"
                            ? t("logDetails.tabs.statistics.altitudeText", {
                                  altitude: statistics.maxAltitude.toLocaleString(i18n.language, {
                                      maximumFractionDigits: 2,
                                      minimumFractionDigits: 2,
                                  }),
                              })
                            : undefined
                    }
                />
                <PreviewSectionItem
                    label={t("logDetails.tabs.statistics.maxVelocity")}
                    text={
                        statistics && typeof statistics.maxVelocity === "number"
                            ? t("logDetails.tabs.statistics.velocityText", {
                                  velocity: statistics.maxVelocity.toLocaleString(i18n.language, {
                                      maximumFractionDigits: 2,
                                      minimumFractionDigits: 2,
                                  }),
                              })
                            : undefined
                    }
                />
                <PreviewSectionItem
                    label={t("logDetails.tabs.statistics.flightDuration")}
                    text={
                        statistics && typeof statistics.totalFlightDuration === "number"
                            ? formatDuration(Math.round(statistics.totalFlightDuration))
                            : undefined
                    }
                />
            </PreviewSection>
        </VStack>
    );
};
