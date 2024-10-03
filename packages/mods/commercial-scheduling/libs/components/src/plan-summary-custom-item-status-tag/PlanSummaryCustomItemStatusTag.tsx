import { Tag } from "@volocopter/design-library-react";
import { PlanSummaryCustomItemStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanSummaryCustomItemStatus } from "@voloiq/commercial-scheduling-utils";

export type PlanSummaryCustomItemStatusTagProps = {
    status?: PlanSummaryCustomItemStatus;
    isCustomOverwritten?: boolean;
};

export const PlanSummaryCustomItemStatusTag = (props: PlanSummaryCustomItemStatusTagProps) => {
    const { status, isCustomOverwritten } = props;
    const { variant, text } = usePlanSummaryCustomItemStatus({ status, isCustomOverwritten });

    return text ? <Tag colorScheme={variant}>{text}</Tag> : null;
};
