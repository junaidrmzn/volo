import {
    Button,
    ButtonGroup,
    Card,
    Grid,
    GridItem,
    HStack,
    Icon,
    Text,
    VStack,
    useDisclosure,
} from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { Booking } from "@voloiq/booking-management-api/v1";
import { BookingManagementList, BookingManagementModal } from "@voloiq/booking-management-components";
import { useBookingTranslation } from "../../translations/useBookingTranslation";
import { useCancelBooking } from "./useCancelBooking";

type CancelBookingProps = {
    booking: Booking;
    reloadList: () => void;
};

export const CancelBooking = (props: CancelBookingProps) => {
    const { booking, reloadList } = props;
    const { bookingStatus } = booking;
    const isBookingCancelled = bookingStatus === "CANCELLED";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { cancelBookingReason, setCancelBookingReason, cancelBooking } = useCancelBooking({
        booking,
        onSuccess: () => {
            reloadList();
            onClose();
        },
    });
    const { t } = useBookingTranslation();

    const messageList = match(cancelBookingReason)
        .with("OPERATOR", () => [
            t("overview.actions.cancelBooking.cancelForVolocopter.passengerEmailMessage"),
            t("overview.actions.cancelBooking.cancelForVolocopter.refundTriggerMessage"),
        ])
        .with("CUSTOMER", () => [t("overview.actions.cancelBooking.cancelForPassenger.confirmationEmailMessage")])
        .exhaustive();

    return (
        <>
            <Button variant="primary" onClick={onOpen} isDisabled={isBookingCancelled}>
                {t("overview.detail.cancelBooking")}
            </Button>
            <BookingManagementModal
                heading={t("generic.confirm")}
                subHeading={t("overview.actions.cancelBooking.title")}
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack alignItems="flex-start">
                    <Text fontWeight="light">{t("overview.actions.cancelBooking.selectionMessage")}:</Text>
                    <Grid w="full" templateColumns="repeat(2,2fr)" gap={3} alignItems="center">
                        <GridItem
                            border={1}
                            borderStyle="solid"
                            borderRadius="md"
                            borderColor="borderOnAccentSecondaryMuted"
                        >
                            <Card
                                ariaLabel="OPERATOR"
                                isSelected={cancelBookingReason === "OPERATOR"}
                                onClick={() => setCancelBookingReason("OPERATOR")}
                            >
                                <VStack spacing={1}>
                                    <Icon icon="volocopter" size={4} />
                                    <Text>{t("overview.actions.cancelBooking.cancelForVolocopter.title")}</Text>
                                </VStack>
                            </Card>
                        </GridItem>
                        <GridItem
                            border={1}
                            borderStyle="solid"
                            borderRadius="md"
                            borderColor="borderOnAccentSecondaryMuted"
                        >
                            <Card
                                ariaLabel="CUSTOMER"
                                isSelected={cancelBookingReason === "CUSTOMER"}
                                onClick={() => setCancelBookingReason("CUSTOMER")}
                            >
                                <VStack spacing={1}>
                                    <Icon icon="user" size={4} />
                                    <Text>{t("overview.actions.cancelBooking.cancelForPassenger.title")}</Text>
                                </VStack>
                            </Card>
                        </GridItem>
                    </Grid>
                    <BookingManagementList list={messageList}>
                        <Text>{t("overview.actions.cancelBooking.information")}</Text>
                        <Text>{t("overview.actions.cancelBooking.subInformation")}</Text>
                    </BookingManagementList>
                    <HStack alignSelf="flex-end" mt={6}>
                        <ButtonGroup isAttached>
                            <Button variant="secondary" onClick={onClose}>
                                {t("generic.cancel")}
                            </Button>
                            <Button variant="primary" onClick={cancelBooking}>
                                {t("overview.actions.cancelBooking.title")}
                            </Button>
                        </ButtonGroup>
                    </HStack>
                </VStack>
            </BookingManagementModal>
        </>
    );
};
