import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { DateTimePicker } from "./datepicker";

export const CreateFileFlightPlan = {
    headerText: () => cy.findByRole("heading", { name: /file flight plan/i }),
    scheduledDepartureTime: () => cy.findByLabelText("Scheduled Departure Time (UTC):*"),
    scheduledArrivalTime: () => cy.findByLabelText("Scheduled Arrival Time (UTC):*"),
    typeSelect: () => cy.findByLabelText("Type:*"),
    flightRulesSelect: () => cy.findByLabelText("Flight Rules:*"),
    aircraftSelect: () => cy.findByLabelText("Select Aircraft:*"),
    numberOfPaxInput: () => cy.findByLabelText("Number of PAX:*"),
    preferredRouteSelect: () => cy.findByLabelText("Preferred Route:*"),
    alternativeRoutesMultiSelect: () => cy.findByRole("combobox", { name: "Alternative Routes:" }),
    utmProviderSelect: () => cy.findByLabelText("UTM Provider:*"),
    submitButton: () => cy.findByRole("button", { name: /submit flight plan/i }),
    setScheduledDepartureTime: (props: FlightPlanInfo) => {
        const { scheduledDepartureTime } = props;
        CreateFileFlightPlan.scheduledDepartureTime().click({ force: true });
        DateTimePicker.selectDate(new Date(scheduledDepartureTime));
    },
    setScheduledArrivalTime: (props: FlightPlanInfo) => {
        const { scheduledArrivalTime } = props;
        CreateFileFlightPlan.scheduledArrivalTime().click({ force: true });
        DateTimePicker.selectDate(new Date(scheduledArrivalTime));
    },
};
