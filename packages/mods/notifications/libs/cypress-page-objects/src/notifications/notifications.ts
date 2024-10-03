import { notificationsPopover } from "./notifications-popover/notificationsPopover";

export const notifications = {
    button: () => cy.findByRole("button", { name: "Notifications" }),
    buttonCount: (count: number) => cy.findByText(count),
    popover: notificationsPopover,
    toast: (resolverName: string, senderName: string, notificationType: string) =>
        cy.findByText(`${resolverName} resolved ${senderName} ${notificationType}`),
};
