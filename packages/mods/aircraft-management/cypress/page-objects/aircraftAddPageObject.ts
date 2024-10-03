import type { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { dateTimePicker } from "./dateTimePickerPageObject";
import { Select } from "./select";

export const aircraftAdd = {
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    msnTextbox: () => cy.findByRole("textbox", { name: "MSN:*" }),
    aircraftTypeCombobox: () => cy.findByRole("combobox", { name: "Aircraft type:*" }),
    aircraftRegistrationTextbox: () => cy.findByRole("textbox", { name: "Aircraft registration:" }),
    serviceCombobox: () => cy.findByRole("combobox", { name: "Service:*" }),
    validFromTextbox: () => cy.findByRole("textbox", { name: "Valid from:" }),
    validToTextbox: () => cy.findByRole("textbox", { name: "Valid to:" }),
    technicalStatusCombobox: () => cy.findByRole("combobox", { name: "Technical status:*" }),
    homebaseCombobox: () => cy.findByRole("combobox", { name: "Homebase:" }),
    crewConfigurationCombobox: () => cy.findByRole("combobox", { name: "Crew configuration:*" }),
    add: (
        aircraftData: Partial<{
            aircraftRegistration: string;
            msn: string;
            service: Service;
            validFrom: Date;
            validTo: Date;
            aircraftType: string;
            technicalStatus: TechnicalStatus;
            homebase: string;
            crewConfiguration: CrewConfiguration;
        }>
    ) => {
        const {
            aircraftRegistration,
            msn,
            service,
            validFrom,
            validTo,
            aircraftType,
            technicalStatus,
            homebase,
            crewConfiguration,
        } = aircraftData;
        if (aircraftRegistration) aircraftAdd.aircraftRegistrationTextbox().type(aircraftRegistration, { force: true });
        if (msn) aircraftAdd.msnTextbox().type(msn);
        if (service) Select.selectByOptionName("Service:*", service);
        if (aircraftType) Select.selectByOptionName("Aircraft type:*", aircraftType);
        if (validFrom) {
            aircraftAdd.validFromTextbox().click();
            dateTimePicker.selectDate(validFrom);
        }
        if (validTo) {
            aircraftAdd.validToTextbox().click();
            dateTimePicker.selectDate(validTo);
        }

        if (technicalStatus) Select.selectByOptionName("Technical status:*", technicalStatus);
        if (homebase) Select.selectByOptionName("Homebase:", homebase);
        if (crewConfiguration) Select.selectByOptionName("Crew configuration:*", crewConfiguration);
    },
};
