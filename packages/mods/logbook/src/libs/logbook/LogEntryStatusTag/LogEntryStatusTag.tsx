import { Tag } from "@volocopter/design-library-react";
import { match } from "ts-pattern";

export type LogEntryStatus = "ERROR" | "PENDING" | "UPLOAD_REQUESTED" | "TM_DATA" | "ONBOARD_RECORDED_DATA";

type StatusTagProps = {
    status: LogEntryStatus;
    label: string;
};

export const LogEntryStatusTag = (props: StatusTagProps) => {
    const { label, status } = props;

    return (
        <Tag
            colorScheme={match(status)
                .with("ERROR", () => "error" as const)
                .with("PENDING", () => "warning-subtle" as const)
                .with("UPLOAD_REQUESTED", () => "blue" as const)
                .with("TM_DATA", () => "blue" as const)
                .with("ONBOARD_RECORDED_DATA", () => "blue" as const)
                .exhaustive()}
        >
            {match(status)
                .with("TM_DATA", "ONBOARD_RECORDED_DATA", () => <Tag.Icon icon="package" size={4} />)
                .otherwise(() => {})}
            <Tag.Label>{label}</Tag.Label>
        </Tag>
    );
};
