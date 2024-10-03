import { ExpandableCard } from "@volocopter/design-library-react";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { DetailsButton } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { FlightTestOrderListItemContentV2 } from "./FlightTestOrderListItemContentV2";
import { FlightTestOrderListItemTitleV2 } from "./FlightTestOrderListItemTitleV2";
import { useFlightTestOrderListItemV2Translation } from "./translations/useFlightTestOrderListItemV2Translation";

export type FlightTestOrderListItemV2Props = {
    flightTestOrder: FlightTestOrder;
};
export const FlightTestOrderListItemV2 = (props: FlightTestOrderListItemV2Props) => {
    const { flightTestOrder } = props;
    const { id, ftoId } = flightTestOrder;
    const navigate = useNavigate();
    const { t } = useFlightTestOrderListItemV2Translation();

    return (
        <ExpandableCard cardLabel={t("FTO {ftoId}", { ftoId })}>
            <ExpandableCard.Title>
                <FlightTestOrderListItemTitleV2 flightTestOrder={flightTestOrder} />
            </ExpandableCard.Title>
            <ExpandableCard.ActionButton>
                <DetailsButton onClick={() => navigate(id)} />
            </ExpandableCard.ActionButton>
            <ExpandableCard.Content>
                <FlightTestOrderListItemContentV2 flightTestOrder={flightTestOrder} />
            </ExpandableCard.Content>
        </ExpandableCard>
    );
};
