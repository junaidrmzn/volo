import { Text } from "@volocopter/design-library-react";
import { BookingManagementList } from "@voloiq/booking-management-components";
import { useBookingTranslation } from "../translations/useBookingTranslation";

export const BookingRefundPolicy = () => {
    const { t } = useBookingTranslation();
    const policies = [
        t("overview.detail.refundPolicy.upTo72Hours"),
        t("overview.detail.refundPolicy.lessThan72Hours"),
        t("overview.detail.refundPolicy.ifVolocopterCancel"),
    ];

    return (
        <BookingManagementList list={policies}>
            <Text size="small" color="fontOnBgBasic">
                {t("overview.detail.refundPolicy.title")}
            </Text>
        </BookingManagementList>
    );
};
