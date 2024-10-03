import type { CrewMemberUpdateWithAssignments } from "@voloiq-typescript-api/crew-api-types";
import { DateTimePicker } from "../datepicker";
import { Select } from "../select";

export const CrewMemberAddPage = {
    firstNameTextbox: () => cy.findByRole("textbox", { name: "First name:*" }),
    lastNameTextbox: () => cy.findByRole("textbox", { name: "Last name:*" }),
    homeBaseSelect: () => cy.findByRole("combobox", { name: "Home base:" }),
    weightNumberbox: () => cy.findByRole("spinbutton", { name: "Weight:" }),
    licenseValiditybox: () => cy.findByLabelText("License is valid until:"),
    medicalCertificateValiditybox: () => cy.findByLabelText("Medical certificate is valid until:"),
    languageProficiencyValiditybox: () => cy.findByLabelText("Language proficiency is valid until:"),
    emailTextbox: () => cy.findByRole("textbox", { name: "Email:*" }),
    licensedRemotePilotedFlightsCheckbox: () => cy.findByLabelText("Licensed for remote flights"),
    licensedPilotedFlightsCheckbox: () => cy.findByLabelText("Licensed for piloted flights"),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    valueMustBelow200ErrorText: () => cy.findByText("Please use a value below 200"),
    add: (crewMemberData: CrewMemberUpdateWithAssignments) => {
        const {
            firstName,
            surName,
            homeBase,
            weight,
            licenseValidUntil,
            medicalCertificateValidUntil,
            languageProficiencyValidUntil,
            email,
            licensedRemotePilotedFlights,
            licensedPilotedFlights,
        } = crewMemberData;

        if (firstName) {
            const firstNameTextbox = CrewMemberAddPage.firstNameTextbox();
            firstNameTextbox.type(firstName, { force: true });
        }
        if (surName) CrewMemberAddPage.lastNameTextbox().type(surName);
        if (email) CrewMemberAddPage.emailTextbox().type(email);
        if (weight) CrewMemberAddPage.weightNumberbox().type(weight.toString());
        if (homeBase) Select.selectByOptionName("Home base:", homeBase);
        CrewMemberAddPage.licenseValiditybox().click();
        if (licenseValidUntil) DateTimePicker.selectDate(new Date(licenseValidUntil));
        if (medicalCertificateValidUntil) DateTimePicker.selectDate(new Date(medicalCertificateValidUntil));
        if (languageProficiencyValidUntil) DateTimePicker.selectDate(new Date(languageProficiencyValidUntil));
        if (licensedRemotePilotedFlights)
            CrewMemberAddPage.licensedRemotePilotedFlightsCheckbox().click({ force: true });
        if (licensedPilotedFlights) CrewMemberAddPage.licensedPilotedFlightsCheckbox().click({ force: true });
    },
};
