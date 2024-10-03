import { v4 as uuidV4 } from "uuid";
import { Booking } from "./apiModels";

export const anyBooking = (overwrites?: Partial<Booking>): Required<Booking> => ({
    id: uuidV4(),
    flightNumber: "VC1111",
    bookingDateTime: "2024-05-20T00:00:00Z",
    bookingClass: "STD",
    bookingStatus: "VALID",
    tripPurpose: "PRIVATE",
    departureVertiportCode: "BRU",
    departureVertiportShortName: "Bruchsal",
    departureDateTime: "2024-05-20T00:00:00Z",
    arrivalVertiportShortName: "Bruchsal",
    arrivalVertiportCode: "BRU",
    arrivalDateTime: "2024-05-20T01:00:00Z",
    departureTimeZone: "Europe/Berlin",
    arrivalTimeZone: "Europe/Berlin",
    bookingCode: "BOCOD1234",
    customerId: uuidV4(),
    passengerFirstName: "Passenger First Name",
    passengerMiddleName: "",
    passengerLastName: "Passenger Last Name",
    regionId: uuidV4(),
    connectionId: uuidV4(),
    connectionTitle: "Connection Title",
    connectionName: "BRU1",
    paymentDateTime: "2024-05-20T00:00:00Z",
    passengerEmail: "passenger@volocopter.com",
    price: 100,
    currency: "EUR",
    newDepartureDateTime: "",
    newArrivalDateTime: "",
    isPaid: true,
    isForeign: false,
    ...overwrites,
});
