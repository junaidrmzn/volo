import { FlightTestCrewInsert } from "@voloiq/flight-test-definition-api/v1";
import { FlightTestOrderFlightTestCrewFragment } from "../../pages/flight-test-order/flight-test-order-overview/page-fragments/flightTestOrderFlightTestCrewFragment";
import { Select } from "../../pages/utils/select";

export const FlightTestCrewSteps = {
    addNewFlightTestCrewMembersAndSubmit: (
        pilotInCommand: FlightTestCrewInsert,
        testConductor: FlightTestCrewInsert,
        flightTestCrewMembers: FlightTestCrewInsert[]
    ) => {
        // #1 is always the pilot in command
        cy.findByRole("listitem", { name: "Flight Test Crew & Occupants modal row #1" }).within(() => {
            Select.selectByOptionName("Category:", pilotInCommand.category ?? "-");
            FlightTestOrderFlightTestCrewFragment.nameRowTextField().clear().type(pilotInCommand.name);
            Select.selectByOptionName("Position:*", pilotInCommand.position);
        });

        // #2 is always the test conductor
        cy.findByRole("listitem", { name: "Flight Test Crew & Occupants modal row #2" }).within(() => {
            Select.selectByOptionName("Category:", testConductor.category ?? "-");
            FlightTestOrderFlightTestCrewFragment.nameRowTextField().clear().type(testConductor.name);
            Select.selectByOptionName("Position:*", testConductor.position);
        });

        for (const [index, crewMember] of flightTestCrewMembers.entries()) {
            FlightTestOrderFlightTestCrewFragment.addCrewAndOccupantsButton().click();

            // index + 3 in order to account for the pilot in command and test conductor
            cy.findByRole("listitem", { name: `Flight Test Crew & Occupants modal row #${index + 3}` }).within(() => {
                FlightTestOrderFlightTestCrewFragment.roleRowTextField().clear().type(crewMember.role);
                Select.selectByOptionName("Category:", crewMember.category ?? "-");
                FlightTestOrderFlightTestCrewFragment.nameRowTextField().clear().type(crewMember.name);
                Select.selectByOptionName("Position:*", crewMember.position);
            });
        }

        FlightTestOrderFlightTestCrewFragment.doneButton().click();
    },
    // Omit "role" just to avoid overcomplication with the rows whose roles are fixed.
    editCrewMember: (index: number, crewMember: Partial<Omit<FlightTestCrewInsert, "role">>) => {
        cy.findByRole("listitem", { name: `Flight Test Crew & Occupants modal row #${index + 1}` }).within(() => {
            if (crewMember.category) Select.selectByOptionName("Category:", crewMember.category ?? "-");
            if (crewMember.name) FlightTestOrderFlightTestCrewFragment.nameRowTextField().clear().type(crewMember.name);
            if (crewMember.position) Select.selectByOptionName("Position:*", crewMember.position);
        });
    },
    deleteCrewMember: (index: number) => {
        cy.findByRole("listitem", { name: `Flight Test Crew & Occupants modal row #${index + 1}` }).within(() => {
            cy.findByRole("button", { name: "Delete" }).click();
        });
    },
    submit: () => {
        FlightTestOrderFlightTestCrewFragment.doneButton().click();
    },
};
