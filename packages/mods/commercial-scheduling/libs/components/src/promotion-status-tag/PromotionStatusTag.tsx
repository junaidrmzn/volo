import { Tag } from "@volocopter/design-library-react";
import { PromotionStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePromotionStatus } from "@voloiq/commercial-scheduling-utils";

export type PromotionStatusTagProps = {
    status: PromotionStatus;
};

export const PromotionStatusTag = (props: PromotionStatusTagProps) => {
    const { status } = props;
    const { variant, text } = usePromotionStatus({ status });

    return text ? <Tag colorScheme={variant}>{text}</Tag> : null;
};
