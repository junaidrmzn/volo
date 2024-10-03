export const EnergySettingPanel = {
    taxiingButton: () => cy.findByRole("button", { name: /taxiing/i }),
    expertSettingsButton: () => cy.findByRole("button", { name: /expert settings/i }),
    weatherSettingsButton: () => cy.findByRole("button", { name: /weather settings/i }),
};
