import { Tag } from "@volocopter/design-library-react";
import { OfferStatus } from "@voloiq/commercial-scheduling-api/v1";
import { useOfferStatus } from "@voloiq/commercial-scheduling-utils";

export type OfferStatusTagProps = {
    status: OfferStatus;
};

export const OfferStatusTag = (props: OfferStatusTagProps) => {
    const { status } = props;
    const { variant, text } = useOfferStatus({ status });

    return text ? <Tag colorScheme={variant}>{text}</Tag> : null;
};
