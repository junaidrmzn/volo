import { useGetAllService } from "@voloiq/service";
import { BOOKING_BASE_URL } from "../../serviceEndpoints";
import { Booking } from "./apiModels";

type UseGetBookingsOptions = {
    manual?: boolean;
};

export const useGetBookings = (options?: UseGetBookingsOptions) =>
    useGetAllService<Booking>({
        route: BOOKING_BASE_URL,
        options,
    });
