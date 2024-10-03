import { Tag } from "@volocopter/design-library-react";
import { PriceStatus } from "@voloiq/commercial-scheduling-api/v1";
import { usePriceStatus } from "@voloiq/commercial-scheduling-utils";

export type PriceStatusTagProps = {
    status: PriceStatus;
};

export const PriceStatusTag = (props: PriceStatusTagProps) => {
    const { status } = props;
    const { variant, text } = usePriceStatus({ status });

    return text ? <Tag colorScheme={variant}>{text}</Tag> : null;
};
