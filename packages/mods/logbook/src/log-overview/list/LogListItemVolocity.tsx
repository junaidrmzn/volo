import { Center, Grid, GridItem } from "@volocopter/design-library-react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import type { Log } from "@voloiq/logbook-api/v6";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { formatUTCDate } from "@voloiq/utils/src";
import { useLogbookTranslation } from "../translations/useLogbookTranslation";
import { StatusIndicator } from "./StatusIndicator";

export type LogListItemVolocityProps = CardListItemProps & {
    log: Log;
};

export const LogListItemVolocity = (props: LogListItemVolocityProps) => {
    const { log, onClick, isSelected } = props;
    const { id, date, aircraft, flightTestOrder } = log;
    const { t } = useLogbookTranslation();

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
                />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <Grid templateColumns="repeat(14, 1fr)" columnGap={6} width="full">
                    <GridItem colSpan={4}>
                        <TextWithLabel label={t("overview.logEntryList.flightTestOrder")} text={flightTestOrder} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <TextWithLabel label={t("overview.logEntryList.msnLabel")} text={aircraft?.msn} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <TextWithLabel label={t("overview.logEntryList.locationLabel")} text={log.location?.icaoCode} />
                    </GridItem>
                </Grid>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <Center h="full">
                    <StatusIndicator log={log} />
                </Center>
            </CardListItem.Status>
        </CardListItem>
    );
};
