import { Text } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { Children, isValidElement } from "react";
import { match } from "ts-pattern";
import type { FileStatus } from "@voloiq/logbook-api/v6";
import { useLogDetailsTranslation } from "../../translations/useLogDetailsTranslation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StatusErrorContent = (props: { children: () => ReactElement | null }) => null;

export type FileStatusInfoProps = {
    status: FileStatus;
    showProcessed?: boolean;
};

const StatusInfoTemplate: FCC<FileStatusInfoProps> = (props) => {
    const { status, children, showProcessed = false } = props;

    const childrenArray = Children.toArray(children).filter<ReactElement>(isValidElement);
    const renderFileStatusErrorContent = childrenArray.find((child) => child.type === StatusErrorContent)?.props
        .children;
    const { t } = useLogDetailsTranslation();

    return match(status)
        .with("ERROR", () => renderFileStatusErrorContent())
        .with("QUEUED", () => <Text>{t("statusInfo.queued")}</Text>)
        .with("PROCESSING", () => <Text>{t("statusInfo.processing")}</Text>)
        .with("PROCESSED", () => (showProcessed ? <Text>{t("statusInfo.processed")}</Text> : null))
        .with("UPLOAD_REQUESTED", () => <Text>{t("statusInfo.uploadRequested")}</Text>)
        .otherwise(() => null);
};

export const StatusInfo = Object.assign(StatusInfoTemplate, {
    StatusErrorContent,
});
