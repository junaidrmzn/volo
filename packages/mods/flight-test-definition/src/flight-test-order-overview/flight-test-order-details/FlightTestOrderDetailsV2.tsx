import { Box, ButtonGroup, HStack, Header, HeaderLayout, Tag } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { useGetFlightTestOrderStatusTag } from "@voloiq/flight-test-definition-utils";
import { ApprovalCheckList } from "./ApprovalCheckList";
import { ExportFlightTestOrderButton } from "./ExportFlightTestOrderButton";
import { FlightTestOrderDetailsTabs } from "./FlightTestOrderDetailsTabs";
import { DeleteFlightTestOrderButton } from "./delete-flight-test-order/DeleteFlightTestOrderButton";
import { FlightTestOrderDeclineStatusButton } from "./flight-test-order-status-configuration/FlightTestOrderDeclineStatusButton";
import { UpdateFlightTestOrderStatusButton } from "./flight-test-order-status-configuration/UpdateFlightTestOrderStatusButton";
import { isNonExecutedOrCancelledStatus } from "./flight-test-order-status-configuration/flightTestOrderStatusGuard";
import { useFlightTestOrderDetailsTranslation } from "./translations/useFlightTestOrderDetailsTranslation";

export type FlightTestOrderDetailsV2Props = {
    flightTestOrder: FlightTestOrder;
    onReturnMarkerClick: () => void;
};

export const FlightTestOrderDetailsV2 = (props: FlightTestOrderDetailsV2Props) => {
    const { flightTestOrder, onReturnMarkerClick } = props;
    const { t } = useFlightTestOrderDetailsTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const canDecline = useIsAuthorizedTo(["create"], ["FlightTestOrderApprove"]);

    const { colorScheme, label } = useGetFlightTestOrderStatusTag({ status: flightTestOrder.status });

    return (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    parentTitle={t("Orders")}
                    title={flightTestOrder.missionTitle}
                    hasReturnMarker
                    onClick={onReturnMarkerClick}
                    returnMarkerAriaLabel={t("Back")}
                    tag={
                        isFeatureFlagEnabled("vte-1506") ? (
                            <Tag colorScheme={colorScheme}>
                                <Tag.Label aria-label={t("Flight Test Order Status")}>{label}</Tag.Label>
                            </Tag>
                        ) : undefined
                    }
                />
                <Header.Controls>
                    <ButtonGroup isAttached>
                        {flightTestOrder.status !== "CANCELLED" && (
                            <DeleteFlightTestOrderButton flightTestOrderId={flightTestOrder.id} />
                        )}
                        {isFeatureFlagEnabled("vte-1458") && (
                            <ExportFlightTestOrderButton
                                orderId={flightTestOrder.id}
                                ftoId={flightTestOrder.ftoId}
                                title={flightTestOrder.missionTitle}
                            />
                        )}
                        {isFeatureFlagEnabled("vte-1511") &&
                            flightTestOrder.status === "AWAITING_APPROVAL" &&
                            canDecline && <FlightTestOrderDeclineStatusButton flightTestOrder={flightTestOrder} />}
                        {isFeatureFlagEnabled("vte-1533") && isNonExecutedOrCancelledStatus(flightTestOrder.status) && (
                            <UpdateFlightTestOrderStatusButton
                                flightTestOrderId={flightTestOrder.id}
                                status={flightTestOrder.status}
                                missionTitle={flightTestOrder.missionTitle}
                            />
                        )}
                    </ButtonGroup>
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content>
                <HStack width="full" mt={6} p={3} alignItems="flex-start" backgroundColor="bgNavigationLayer1">
                    <Box flex={7}>
                        <FlightTestOrderDetailsTabs
                            flightTestOrderId={flightTestOrder.id}
                            orientation="vertical"
                            variant="menu"
                        />
                    </Box>
                    <Box flex={2}>
                        <ApprovalCheckList />
                    </Box>
                </HStack>
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
