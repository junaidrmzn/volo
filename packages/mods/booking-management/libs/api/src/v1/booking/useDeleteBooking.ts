import { useDeleteService } from "@voloiq/service";
import { BOOKINGS_URL } from "../../serviceEndpoints";
import { CancelBookingPayload } from "./apiModels";

export const useDeleteBooking = () => useDeleteService<{}, CancelBookingPayload>({ route: BOOKINGS_URL });
