import { Tag } from "@volocopter/design-library-react";
import { PromotionItemStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePromotionItemStatus } from "@voloiq/commercial-scheduling-utils";

export type PromotionItemStatusTagProps = {
    status: PromotionItemStatus;
};

export const PromotionItemStatusTag = (props: PromotionItemStatusTagProps) => {
    const { status } = props;
    const { color, text } = usePromotionItemStatus({ status });

    return text ? <Tag colorScheme={color}>{text}</Tag> : null;
};
