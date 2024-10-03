import type { Log } from "@voloiq/logbook-api/v6";
import { LogDetails } from "./default/LogDetails";
import { LogDetailsVolocity } from "./volocity/LogDetailsVolocity";

export type LogDetailsPageProps = {
    log: Log;
    reloadDetails: () => void;
};

export const LogDetailsPage = (props: LogDetailsPageProps) => {
    const { log } = props;

    if (log.aircraft.productLine === "VoloCity") {
        return <LogDetailsVolocity {...props} />;
    }
    return <LogDetails {...props} />;
};
