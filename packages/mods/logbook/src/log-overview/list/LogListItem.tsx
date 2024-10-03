import { Grid, GridItem, Spacer } from "@volocopter/design-library-react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import type { Log, LogCrewMember } from "@voloiq/logbook-api/v6";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { formatDuration, formatUTCDate } from "@voloiq/utils";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";
import { StatusIndicator } from "./StatusIndicator";

export type LogListItemProps = CardListItemProps & {
    log: Log;
};

export const LogListItem = (props: LogListItemProps) => {
    const { log, onClick, isSelected } = props;
    const { id, date, crew, aircraft, statistics } = log;
    const { t, i18n } = useLogbookTranslation();

    const getPilotName = (crew: LogCrewMember[] | undefined) => {
        const pilots = crew?.filter((crewMember) => crewMember.role === "PILOT");
        if (pilots && pilots.length > 0) {
            const [pilot1, ...otherPilots] = pilots;
            return `${pilot1?.firstName} ${pilot1?.lastName}${
                otherPilots && otherPilots.length > 0 ? ` (+${otherPilots.length})` : ""
            }`;
        }
        return t("overview.logEntryList.unknownValue");
    };

    return (
        <CardListItem
            key={id}
            ariaLabel={`${t("overview.listItemAriaLabel")} ${id}`}
            onClick={onClick || (() => {})}
            isSelected={isSelected}
            layout="wideAdditionalContent"
        >
            <CardListItem.Identifier>
                <IdentifierStack
                    mainIdentifier={formatUTCDate(new Date(date))}
                    secondaryIdentifier={aircraft?.aircraftType}
                    thirdIdentifier={getPilotName(crew)}
                />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <Grid templateColumns="repeat(5, 1fr)" columnGap={6} width="full">
                    <GridItem colSpan={4}>
                        <Spacer />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <TextWithLabel label={t("overview.logEntryList.msnLabel")} text={aircraft?.msn} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <TextWithLabel label={t("overview.logEntryList.locationLabel")} text={log.location?.icaoCode} />
                    </GridItem>

                    <GridItem colSpan={2}>
                        <TextWithLabel
                            label={t("overview.logEntryList.totalFlightDuration")}
                            text={
                                statistics && typeof statistics.totalFlightDuration === "number"
                                    ? formatDuration(Math.round(statistics.totalFlightDuration))
                                    : t("overview.logEntryList.unknownValue")
                            }
                        />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <TextWithLabel
                            label={t("overview.logEntryList.maxAltitude")}
                            text={
                                statistics && typeof statistics.maxAltitude === "number"
                                    ? t("overview.logEntryList.altitudeText", {
                                          altitude: statistics.maxAltitude.toLocaleString(i18n.language, {
                                              maximumFractionDigits: 2,
                                              minimumFractionDigits: 2,
                                          }),
                                      })
                                    : t("overview.logEntryList.unknownValue")
                            }
                        />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <TextWithLabel
                            label={t("overview.logEntryList.maxVelocity")}
                            text={
                                statistics && typeof statistics.maxVelocity === "number"
                                    ? t("overview.logEntryList.velocityText", {
                                          velocity: statistics.maxVelocity.toLocaleString(i18n.language, {
                                              maximumFractionDigits: 2,
                                              minimumFractionDigits: 2,
                                          }),
                                      })
                                    : t("overview.logEntryList.unknownValue")
                            }
                        />
                    </GridItem>
                </Grid>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <StatusIndicator log={log} />
            </CardListItem.Status>
        </CardListItem>
    );
};
