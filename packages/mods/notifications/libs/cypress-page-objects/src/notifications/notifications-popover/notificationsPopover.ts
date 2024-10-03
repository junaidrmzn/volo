import { notificationCard } from "./notificationCard";

export const notificationsPopover = {
    notificationCard,
    closePopover: () => cy.get("body").type("{esc}"),
    showMutedSwitch: () => cy.findByRole("checkbox", { name: "show muted" }),
    noOpenNotificationsIndication: () => cy.findByText("You don't have any open notifications"),
    noResolvedNotificationsIndication: () => cy.findByText("There are no resolved notifications"),
    openTab: () => cy.findByRole("tab", { name: "open" }),
    resolvedTab: () => cy.findByRole("tab", { name: "resolved" }),
};
