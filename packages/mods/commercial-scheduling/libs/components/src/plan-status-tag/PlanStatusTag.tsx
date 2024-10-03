import { Tag } from "@volocopter/design-library-react";
import type { PlanStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanStatus } from "@voloiq/commercial-scheduling-utils";

export type PlanStatusTagProps = {
    status: PlanStatus;
};

export const PlanStatusTag = (props: PlanStatusTagProps) => {
    const { status } = props;
    const { variant, text } = usePlanStatus({ status });

    return text ? <Tag colorScheme={variant}>{text}</Tag> : null;
};
