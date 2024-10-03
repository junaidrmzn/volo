export const scheduleItemOverview = {
    findInformation: () => cy.findAllByText(/this is the detail of the network schedule for the commercial plan/i),
    findList: () => cy.findByLabelText(/schedule items/i),
    findListItem: (flightNumber: string) => scheduleItemOverview.findList().findByLabelText(flightNumber),
    findVertiportCode: (flightNumber: string, vertiportCode: string) =>
        scheduleItemOverview.findListItem(flightNumber).findByText(vertiportCode),
    findStatus: (flightNumber: string, status: string) =>
        scheduleItemOverview.findListItem(flightNumber).findByText(status),
    findActionsButton: (flightNumber: string) =>
        scheduleItemOverview.findListItem(flightNumber).findByRole("button", { name: /actions/i }),
    findDetailsButton: (flightNumber: string) =>
        scheduleItemOverview.findListItem(flightNumber).findByRole("button", { name: /details/i }),
};
