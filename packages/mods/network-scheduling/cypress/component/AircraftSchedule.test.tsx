import { add } from "date-fns";
import { anyAircraft } from "../../lib/test-fixtures/anyAircraft";
import { AircraftSchedule } from "../../src/aircraft-schedule/AircraftSchedule";
import { getAllAircraftsInterceptor } from "../interceptors/EventInterceptors";

describe("When a user uses the aircraft schedule", () => {
    it("then they can see missions", () => {
        const aircraftWithOldDate = anyAircraft();
        const aircraftWithCurrentDate = anyAircraft({
            reservations: aircraftWithOldDate.reservations?.map((reservation) => ({
                ...reservation,
                startDateTime: new Date().toISOString(),
                endDateTime: add(new Date(), { minutes: 30 }).toISOString(),
                reservationModel: {
                    ...reservation.reservationModel,
                    scheduledDepartureDateTime: new Date().toISOString(),
                    scheduledArrivalDateTime: add(new Date(), { minutes: 30 }).toISOString(),
                },
            })),
        });
        getAllAircraftsInterceptor([aircraftWithCurrentDate]);
        cy.mountWithWrappers(<AircraftSchedule />);

        cy.findByText("VC-0097");
        cy.findByText("BRU - KAR");
    });
});
