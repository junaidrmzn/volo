import type { CrewMemberUpdateWithAssignments } from "@voloiq-typescript-api/crew-api-types";
import { DateTimePicker } from "../datepicker";
import { Select } from "../select";

export const CrewMemberEditPage = {
    firstNameTextbox: () => cy.findByRole("textbox", { name: "First name:*" }),
    lastNameTextbox: () => cy.findByRole("textbox", { name: "Last name:*" }),
    homeBaseSelect: () => cy.findByRole("combobox", { name: "Home base:" }),
    weightNumberbox: () => cy.findByRole("spinbutton", { name: "Weight:" }),
    licenseValiditybox: () => cy.findByLabelText("License is valid until:"),
    medicalCertificateValiditybox: () => cy.findByLabelText("Medical certificate is valid until:"),
    languageProficiencyValiditybox: () => cy.findByLabelText("Language proficiency is valid until:"),
    emailTextbox: () => cy.findByRole("textbox", { name: "Email:*" }),
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    edit: (crewMemberData: Partial<CrewMemberUpdateWithAssignments>) => {
        const {
            firstName,
            surName,
            homeBase,
            weight,
            licenseValidUntil,
            medicalCertificateValidUntil,
            languageProficiencyValidUntil,
            email,
        } = crewMemberData;

        if (firstName) {
            CrewMemberEditPage.firstNameTextbox().click();
            CrewMemberEditPage.firstNameTextbox().clear({ force: true });
            CrewMemberEditPage.firstNameTextbox().type(firstName, { force: true });
        }
        if (surName) {
            CrewMemberEditPage.lastNameTextbox().click();
            CrewMemberEditPage.lastNameTextbox().clear({ force: true });
            CrewMemberEditPage.lastNameTextbox().type(surName, { force: true });
        }
        if (email) {
            CrewMemberEditPage.emailTextbox().clear({ force: true });
            CrewMemberEditPage.emailTextbox().type(email, { force: true });
        }
        if (weight) {
            CrewMemberEditPage.weightNumberbox().click();
            CrewMemberEditPage.weightNumberbox().clear({ force: true });
            CrewMemberEditPage.weightNumberbox().type(weight.toString(), { force: true });
        }
        if (homeBase) Select.selectByOptionName("Home base:", homeBase);
        CrewMemberEditPage.licenseValiditybox().clear({ force: true }).click();
        if (licenseValidUntil) DateTimePicker.selectDate(new Date(licenseValidUntil));
        if (medicalCertificateValidUntil) DateTimePicker.selectDate(new Date(medicalCertificateValidUntil));
        if (languageProficiencyValidUntil) DateTimePicker.selectDate(new Date(languageProficiencyValidUntil));
        CrewMemberEditPage.saveButton().click();
    },
};
