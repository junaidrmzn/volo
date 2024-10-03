import { ExpandableCard } from "@volocopter/design-library-react";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { DetailsButton } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { FlightTestOrderListItemContent } from "./FlightTestOrderListItemContent";
import { FlightTestOrderListItemTitle } from "./FlightTestOrderListItemTitle";
import { useFlightTestOrderListItemTranslation } from "./translations/useFlightTestOrderListItemTranslation";

export type FlightTestOrderListItemProps = {
    flightTestOrder: FlightTestOrder;
};
export const FlightTestOrderListItem = (props: FlightTestOrderListItemProps) => {
    const { flightTestOrder } = props;
    const { id, ftoId } = flightTestOrder;
    const navigate = useNavigate();
    const { t } = useFlightTestOrderListItemTranslation();

    return (
        <ExpandableCard cardLabel={t("FTO {ftoId}", { ftoId })}>
            <ExpandableCard.Title>
                <FlightTestOrderListItemTitle flightTestOrder={flightTestOrder} />
            </ExpandableCard.Title>
            <ExpandableCard.ActionButton>
                <DetailsButton onClick={() => navigate(id)} />
            </ExpandableCard.ActionButton>
            <ExpandableCard.Content>
                <FlightTestOrderListItemContent flightTestOrder={flightTestOrder} />
            </ExpandableCard.Content>
        </ExpandableCard>
    );
};
