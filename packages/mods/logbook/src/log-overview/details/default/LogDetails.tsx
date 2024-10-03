import { Stack } from "@volocopter/design-library-react";
import type { LogDetailsPageProps } from "../LogDetailsPage";
import { FileList } from "../file-list";
import { LogContextProvider } from "../log-context";
import { GeneralView } from "./general-view";
import { StatisticsView } from "./statistics-view";

export type LogDetailsProps = LogDetailsPageProps;

export const LogDetails = (props: LogDetailsProps) => {
    const { log, reloadDetails } = props;

    return (
        <LogContextProvider value={{ refresh: reloadDetails }}>
            <Stack spacing={3}>
                <GeneralView log={log} />
                <StatisticsView log={log} />
                <FileList log={log} />
            </Stack>
        </LogContextProvider>
    );
};
