export const OverviewPage = {
    createButton: () => cy.findByTestId("flight-list-create-button"),
    sortButton: () => cy.findByTestId("flight-list-sort-button"),
    filterButton: () => cy.findByTestId("flight-list-filter-button"),
    flightCreateButton: () => cy.findByTestId("create-flight-button"),
    editButton: () => cy.findByTestId("edit-flight-button"),
    routeOptionList: () => cy.findByTestId("route-option-list"),
};

export const CreatePanel = {
    nameInput: () => cy.findByLabelText("Name:*"),
    aircraftTypeSelect: () => cy.findByLabelText("Aircraft Type:*"),
    arrivaVertiportlSelect: () => cy.findByLabelText("Arrival Vertiport:*"),
    departureVertiportSelect: () => cy.findByLabelText("Departure Vertiport:*"),
    createButton: () => cy.findByTestId("flight-create-submit-button"),
    cancelButton: () => cy.findByTestId("flight-create-cancel-button"),
};

export const DetailPanel = {
    nameInput: () => cy.findByLabelText("Name:*"),
    aircraftTypeSelect: () => cy.findByLabelText("Aircraft Type:*"),
    arrivaVertiportlSelect: () => cy.findByLabelText("Arrival Vertiport:*"),
    departureVertiportSelect: () => cy.findByLabelText("Departure Vertiport:*"),
    fileFlightPlanButton: () => cy.findByTestId("flight-details-file-flight-plan-button"),
    cancelButton: () => cy.findByTestId("flight-create-cancel-button"),
};

export const FilterPanel = {
    filterLabel: () => cy.findByLabelText("Filter", { exact: false }),
    nameInput: () => cy.findByLabelText("Name:*"),
    aircraftTypeSelect: () => cy.findByLabelText("Aircraft Type:*"),
    arrivaVertiportlSelect: () => cy.findByLabelText("Arrival Vertiport:*"),
    departureVertiportSelect: () => cy.findByLabelText("Departure Vertiport:*"),
    fileFlightPlanButton: () => cy.findByTestId("flight-details-file-flight-plan-button"),
    cancelButton: () => cy.findByTestId("flight-create-cancel-button"),
};

export const ResourceOverviewPage = {
    overviewList: () => cy.findByRole("list", { name: /routeoption/i }),
    overviewListItems: () => ResourceOverviewPage.overviewList().findAllByRole("listitem"),
    addButton: () => cy.findByRole("button", { name: /add/i }),
    sortButton: () => cy.findByRole("button", { name: /sort/i }),
};

export const ResourceOverviewPreview = {
    previewPanel: () => cy.findByTestId("preview-sidepanel"),
    headerText: () => ResourceOverviewPreview.previewPanel().findByRole("heading"),
    fileFlightPlanButton: () =>
        ResourceOverviewPreview.previewPanel().findByRole("button", { name: /file flight plan/i }),
    openButton: () => ResourceOverviewPreview.previewPanel().findByRole("button", { name: /open/i }),
    deleteButton: () => ResourceOverviewPreview.previewPanel().findByRole("button", { name: /delete/i }),
    deleteModal: () => cy.findByRole("dialog"),
    deleteModalDeleteButton: () => ResourceOverviewPreview.deleteModal().findByRole("button", { name: /delete/i }),
    deleteModalCancelButton: () => ResourceOverviewPreview.deleteModal().findByRole("button", { name: /cancel/i }),
};

export const ResourceOverviewSort = {
    applyButton: () => cy.findByRole("button", { name: /apply/i }),
    cancelButton: () => cy.findByRole("button", { name: /cancel/i }),
    ascendingRadioButton: () => cy.findByLabelText(/ascending/i),
    selectAscendingSort: () => ResourceOverviewSort.ascendingRadioButton().click({ force: true }),
    descendingRadioButton: () => cy.findByLabelText(/descending/i).click({ force: true }),
    selectDescendingSort: () => ResourceOverviewSort.descendingRadioButton().click({ force: true }),
};

export const ResourceOverviewAdd = {
    saveButton: () => cy.findByRole("button", { name: /save/i }),
    nameInput: () => cy.findByLabelText(/name:*/i),
    aircraftTypeSelect: () => cy.findByLabelText(/aircraft type/i),
    arrivaVertiportlSelect: () => cy.findByLabelText(/arrival vertiport/i),
    departureVertiportSelect: () => cy.findByLabelText(/departure vertiport/),
};
