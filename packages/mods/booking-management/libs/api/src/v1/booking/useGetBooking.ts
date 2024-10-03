import { useGetService } from "@voloiq/service";
import { BOOKING_BASE_URL } from "../../serviceEndpoints";
import { Booking } from "./apiModels";

type UseGetBookingOptions = {
    manual?: boolean;
};

export const useGetBooking = (options?: UseGetBookingOptions) =>
    useGetService<Booking>({
        route: BOOKING_BASE_URL,
        resourceId: "",
        options,
    });
