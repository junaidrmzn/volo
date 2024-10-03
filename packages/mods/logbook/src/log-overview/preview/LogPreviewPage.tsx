import type { Log } from "@voloiq/logbook-api/v6";
import { LogPreview } from "./LogPreview";
import { LogPreviewVolocity } from "./LogPreviewVolocity";

export type LogPreviewPagePage = {
    log: Log;
};

export const LogPreviewPage = (props: LogPreviewPagePage) => {
    const { log } = props;
    const isVolocity = log.aircraft.productLine === "VoloCity";

    return isVolocity ? <LogPreviewVolocity {...props} /> : <LogPreview {...props} />;
};
