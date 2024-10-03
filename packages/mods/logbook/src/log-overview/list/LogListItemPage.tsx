import type { CardListItemProps } from "@voloiq/card-list-item";
import type { Log } from "@voloiq/logbook-api/v6";
import { LogListItem } from "./LogListItem";
import { LogListItemVolocity } from "./LogListItemVolocity";

export type LogListItemPageProps = CardListItemProps & {
    log: Log;
};

export const LogListItemPage = (props: LogListItemPageProps) => {
    const { log } = props;
    const isVolocity = log.aircraft.productLine === "VoloCity";

    return isVolocity ? <LogListItemVolocity {...props} /> : <LogListItem {...props} />;
};
