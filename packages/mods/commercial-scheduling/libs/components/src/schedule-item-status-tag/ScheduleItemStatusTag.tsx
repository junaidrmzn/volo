import { Tag } from "@volocopter/design-library-react";
import { ScheduleItemStatus } from "@voloiq/commercial-scheduling-api/v1";
import { useScheduleItemStatus } from "@voloiq/commercial-scheduling-utils";

export type ScheduleItemStatusTagProps = {
    status: ScheduleItemStatus;
};

export const ScheduleItemStatusTag = (props: ScheduleItemStatusTagProps) => {
    const { status } = props;
    const text = useScheduleItemStatus({ status });

    return text ? <Tag colorScheme="gray">{text}</Tag> : null;
};
