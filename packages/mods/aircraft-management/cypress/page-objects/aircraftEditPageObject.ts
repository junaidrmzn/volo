import type { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const aircraftEdit = {
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    msnTextbox: () => cy.findByRole("textbox", { name: "MSN:*" }),
    serviceCombobox: () => cy.findByRole("combobox", { name: "Service:*" }),
    validFromTextbox: () => cy.findByRole("textbox", { name: "Valid from:*" }),
    validToTextbox: () => cy.findByRole("textbox", { name: "Valid to:" }),
    technicalStatusCombobox: () => cy.findByRole("combobox", { name: "Technical status:*" }),
    homebaseTextbox: () => cy.findByRole("combobox", { name: "Homebase:" }),
    crewConfigurationCombobox: () => cy.findByRole("combobox", { name: "Crew configuration:*" }),
    aircraftRegistrationTextBox: () => cy.findByRole("textbox", { name: "Aircraft registration:" }),

    edit: (
        aircraftData: Partial<{
            msn: string;
            service: Service;
            validFrom: Date;
            validTo: Date;
            technicalStatus: TechnicalStatus;
            homebase: string;
            crewConfiguration: CrewConfiguration;
            aircraftRegistration: string;
        }>
    ) => {
        const { msn, service, validFrom, validTo, technicalStatus, homebase, crewConfiguration, aircraftRegistration } =
            aircraftData;
        if (msn) aircraftEdit.msnTextbox().clear({ force: true }).type(msn, { force: true });
        if (aircraftRegistration)
            aircraftEdit
                .aircraftRegistrationTextBox()
                .clear({ force: true })
                .type(aircraftRegistration, { force: true });

        if (service) Select.selectByOptionName("Service:*", service);
        if (validFrom) {
            aircraftEdit.validFromTextbox().click();
            dateTimePicker.selectDate(validFrom);
        }
        if (validTo) {
            aircraftEdit.validToTextbox().click();
            dateTimePicker.selectDate(validTo);
        }
        if (technicalStatus) Select.selectByOptionName("Technical status:*", technicalStatus);
        if (homebase) Select.selectByOptionName("Homebase:", homebase);
        if (crewConfiguration) Select.selectByOptionName("Crew configuration:*", crewConfiguration);
        // ToDo: Find a better alternative than forcing to avoid problems with detaching
    },
};
