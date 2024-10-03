import type { Flight } from "@voloiq-typescript-api/flight-planning-types";
import { render, screen } from "@voloiq/testing";
import { FlightInformationPanel } from "../FlightInformationPanel";

const mockedFlight: Flight = {
    arrivalVertiport: { id: 2, name: "Aéroport de Paris-Charles de Gaulle", lat: 49.011, lng: 2.536, alt: 0 },
    date: "2022-06-01T12:00:00Z",
    departureVertiport: { id: 1, name: "Aéroport de Paris-Le Bourget", lat: 48.969, lng: 2.441, alt: 0 },
    flightNumber: "VC1234",
    id: 1,
    name: "Paris Test-Flight",
    tsat: "2022-06-01T12:03:30Z",
    vtolRegistration: "MSN123",
    vtolType: "VC2-1",
    aircraftId: "MSNTest",
};

describe("Flight Information Panel Test", () => {
    const renderIt = () => render(<FlightInformationPanel flight={mockedFlight} startTime="2022-06-01T11:45:00Z" />);

    it("should render", () => {
        renderIt();
        expect(screen.getByText(mockedFlight.name)).toBeInTheDocument();
    });
});
