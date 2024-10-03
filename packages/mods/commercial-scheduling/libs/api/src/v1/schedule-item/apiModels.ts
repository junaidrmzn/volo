export type ScheduleItemStatus = "DRAFT" | "ORDERED" | "PLANNED" | "OFFERED" | "BOOKED" | "CANCELLED" | "CLOSED";

export type ScheduleItem = {
    id: string;
    planName: string;
    status: ScheduleItemStatus;
    operationType: string;
    service: string;
    flightNumber: string;
    numberOfPassengerSeats: number;
    departureTime: string;
    arrivalTime: string;
    earliestBookable: string;
    latestBookable: string;
    bookingStartDifference: number;
    connection: {
        arrivalVertiportCode: string;
        departureVertiportCode: string;
    };
};
