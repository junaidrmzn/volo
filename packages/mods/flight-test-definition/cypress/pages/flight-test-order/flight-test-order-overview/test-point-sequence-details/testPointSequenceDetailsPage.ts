import { FlightTestOrderDetailsPage } from "../../flight-test-order-details/flightTestOrderDetailsPage";
import { FlightTestOrderOverviewPage } from "../flightTestOrderOverviewPage";

export const TestPointSequenceDetailsPage = {
    saveButton: () => cy.findByRole("button", { name: "Save" }),
    testPointsTab: () => cy.findByRole("tab", { name: "Test Points Sequence" }),
    additionalNotesTab: () => cy.findByRole("tab", { name: "Additional Notes" }),
    addBlankRowButton: () => cy.findByRole("button", { name: "Add Blank Row" }),
    addFromListButton: () => cy.findByRole("button", { name: "Add From List" }),
    rows: () => cy.findAllByRole("listitem"),
    rowsWithoutToast: () => cy.findAllByRole("listitem").not(".chakra-toast"),
    toast: (message: string) => cy.get(".chakra-toast").filter(`:contains(${message})`),
    nthFieldOfNthRow: (field: number, row: number) =>
        TestPointSequenceDetailsPage.rows().eq(row).findAllByRole("textbox").eq(field),
    rowFormField: (rowIndex: number, fieldName: string) => cy.get(`input[name='formFields.${rowIndex}.${fieldName}']`),
    additionalNotesField: () => cy.get<HTMLInputElement>(".ProseMirror"),
    emptyMessage: () => cy.findByText("No Test Points found. Please add from the list."),
    goToPage: (ftoId: string) => {
        FlightTestOrderOverviewPage.flightTestOrderCardDetailButton(ftoId).click();
        FlightTestOrderDetailsPage.testPointSelectionTab().click();
        FlightTestOrderDetailsPage.testCardDetailsButton().click();
    },
    dragRow: (row: number, x: number, y: number) => {
        // need to add wait for the drag to work correctly
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        TestPointSequenceDetailsPage.rowsWithoutToast()
            .eq(row)
            .findAllByRole("button")
            .first()
            .trigger("pointerdown", 0, 0, { force: true })
            .wait(50)
            .trigger("pointermove", x * 0.2, y * 0.2, { force: true })
            .wait(50)
            .trigger("pointermove", x * 0.2, y * 0.2, { force: true })
            .wait(50)
            .trigger("pointermove", x * 0.2, y * 0.2, { force: true })
            .wait(50)
            .trigger("pointermove", x * 0.2, y * 0.2, { force: true })
            .wait(50)
            .trigger("pointermove", x * 0.2, y * 0.2, { force: true })
            .wait(50)
            .trigger("pointerup", { force: true });
    },
};
