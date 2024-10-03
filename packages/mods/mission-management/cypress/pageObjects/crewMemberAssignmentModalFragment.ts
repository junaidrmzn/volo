import { Select } from "./select";

export const crewMemberAssignment = {
    closeButton: () => cy.findByRole("button", { name: "Close" }),
    assignButton: () => cy.findByRole("button", { name: "Assign" }),
    crewMemberCard: (crewMemberId: string) => cy.findByLabelText(`crewMember-${crewMemberId}`),
    roleCombobox: () => cy.findByRole("combobox", { name: "Role:*" }),
    selectRole: (role: string) => {
        if (role) {
            Select.selectByOptionName("Role:*", role);
        }
    },
    fatoCard: (padId: string) => cy.findByLabelText(`pad-${padId}`),
};
