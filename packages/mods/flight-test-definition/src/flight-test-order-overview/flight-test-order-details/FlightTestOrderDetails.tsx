import { ButtonGroup, Header, HeaderLayout } from "@volocopter/design-library-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { FlightTestOrder } from "@voloiq/flight-test-definition-api/v1";
import { ExportFlightTestOrderButton } from "./ExportFlightTestOrderButton";
import { FlightTestOrderDetailsTabs } from "./FlightTestOrderDetailsTabs";
import { DeleteFlightTestOrderButton } from "./delete-flight-test-order/DeleteFlightTestOrderButton";
import { useFlightTestOrderDetailsTranslation } from "./translations/useFlightTestOrderDetailsTranslation";

export type FlightTestOrderDetailsProps = {
    flightTestOrder: FlightTestOrder;
    onReturnMarkerClick: () => void;
};
export const FlightTestOrderDetails = (props: FlightTestOrderDetailsProps) => {
    const { flightTestOrder, onReturnMarkerClick } = props;
    const { t } = useFlightTestOrderDetailsTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    parentTitle={t("Orders")}
                    title={flightTestOrder.missionTitle}
                    hasReturnMarker
                    onClick={onReturnMarkerClick}
                    returnMarkerAriaLabel={t("Back")}
                />
                <Header.Controls>
                    <ButtonGroup isAttached>
                        <DeleteFlightTestOrderButton flightTestOrderId={flightTestOrder.id} />
                        {isFeatureFlagEnabled("vte-1458") && (
                            <ExportFlightTestOrderButton
                                orderId={flightTestOrder.id}
                                ftoId={flightTestOrder.ftoId}
                                title={flightTestOrder.missionTitle}
                            />
                        )}
                    </ButtonGroup>
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content>
                <FlightTestOrderDetailsTabs flightTestOrderId={flightTestOrder.id} />
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
