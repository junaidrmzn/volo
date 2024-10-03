import { GroundEvent } from "@voloiq/network-schedule-management-api/v1";
import { InboundGroundTimeCard } from "./detail-components/InboundGroundTimeCard";
import { OutboundGroundTimeCard } from "./detail-components/OutboundGroundTimeCard";

type GroundTimeType = "inbound" | "outbound";
export type GroundTimeDetailsCardProps = {
    groundEvent: GroundEvent;
    type: GroundTimeType;
};

export const GroundTimeDetailsCard = (props: GroundTimeDetailsCardProps) => {
    const { groundEvent, type } = props;

    return (
        <>
            {type === "inbound" ? (
                <InboundGroundTimeCard groundEvent={groundEvent} />
            ) : (
                <OutboundGroundTimeCard groundEvent={groundEvent} />
            )}
        </>
    );
};
