import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import {
    anyFlightTestOrder,
    anyTestPointSequence,
    anyTestPointSequenceManualRow,
    anyTestPointSequenceTestPointAssociation,
    anyTestPointSequenceTestPointAssociations,
} from "@voloiq/flight-test-definition-api/v1";
import { anyFlightTestOrder as anyFlightTestOrderV2 } from "@voloiq/flight-test-definition-api/v2";
import { AppWithoutProvider as App } from "../../../../src/App";
import { getAllFlightTestCrewInterceptor } from "../../../interceptors/flightTestCrewInterceptors";
import {
    getAllFlightTestOrdersInterceptor,
    getAllFlightTestOrdersV2Interceptor,
    getFlightTestOrderInterceptor,
    getFlightTestOrderV2Interceptor,
} from "../../../interceptors/flightTestOrderInterceptors";
import {
    bulkUpdateTestPointSequencesInterceptor,
    getAllTestPointSequenceTestPointAssociationsInterceptor,
    getAllTestPointSequencesInterceptor,
    getTestPointSequenceInterceptor,
} from "../../../interceptors/testPointSequenceInterceptors";
import {
    bulkAddTestPointSequenceManualRowsInterceptor,
    bulkDeleteTestPointSequenceTestPointAssociationsInterceptor,
    bulkEditTestPointSequenceTestPointAssociationsInterceptor,
} from "../../../interceptors/testPointSequenceTestPointAssociationsInterceptors";
import { TestPointSequenceDetailsPage } from "../../../pages/flight-test-order/flight-test-order-overview/test-point-sequence-details/testPointSequenceDetailsPage";

const ftoId = "FTO-V21-2023-001";
const testFlightTestOrder = anyFlightTestOrder({ ftoId });
const testFlightTestOrderV2 = anyFlightTestOrderV2({ ftoId });
const testTestPointSequence = anyTestPointSequence();
const testPointAssociations = anyTestPointSequenceTestPointAssociations();
const testPointAssociationsAfterDeletion = testPointAssociations.slice(0, 4);

const getTestPointAssociationsAfterEdit = (rowToEdit: number) =>
    testPointAssociations.map((item, index) =>
        index === rowToEdit ? { ...item, notes: "some meaningful notes for this test point" } : item
    );

describe("Test Point Sequence Details Positive Test Cases", () => {
    beforeEach(() => {
        getFlightTestOrderInterceptor();
        getFlightTestOrderV2Interceptor();
        getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
        getAllFlightTestOrdersV2Interceptor([testFlightTestOrderV2]);
        getAllTestPointSequencesInterceptor([testTestPointSequence]);
        getTestPointSequenceInterceptor(testTestPointSequence);
        getAllTestPointSequenceTestPointAssociationsInterceptor(testPointAssociations);
        bulkAddTestPointSequenceManualRowsInterceptor();
        bulkEditTestPointSequenceTestPointAssociationsInterceptor();
        bulkDeleteTestPointSequenceTestPointAssociationsInterceptor();
        getAllFlightTestCrewInterceptor();
    });

    it("User sees the test card test point list with empty message if no test points added", () => {
        getAllTestPointSequenceTestPointAssociationsInterceptor([]);

        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.emptyMessage().should("be.visible");
        TestPointSequenceDetailsPage.addBlankRowButton().should("be.disabled");
        TestPointSequenceDetailsPage.addFromListButton().should("be.enabled");
        TestPointSequenceDetailsPage.saveButton().should("be.disabled");
    });

    it("User can see manual rows with editable input fields", () => {
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);
        cy.get('input[value="FTD-V21-01-001-A11-01-D03"]').should("have.prop", "readOnly", false);
        cy.get('input[value="Starting Here"]').should("have.prop", "readOnly", false);
    });

    it("User can see test point rows with read only input fields", () => {
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);
        cy.get('input[value="FTD-V21-01-001-A11-01-D01"]').should("have.prop", "readOnly", true);
        cy.get('input[value="Test Point 1"]').should("have.prop", "readOnly", true);
    });

    it("User can view the test card test point list with correct table headings", () => {
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        cy.findByRole("list", { name: "Test Points Sequence" }).within(() => {
            TestPointSequenceDetailsPage.rows().should("have.length", 5);
        });
        cy.findByText("Above Ground Level [ft]").should("be.visible");
        cy.findByText("AirSpeed [kt]").should("be.visible");
        cy.findByText("ROC/D [ft/min]").should("be.visible");
        cy.findByText("Wind Azimuth [deg]").should("be.visible");
        cy.findByText("Above Ground Level [ft]").parent().parent().scrollTo("right");
        cy.findByText("Target Emergency Power Unit [s]").should("be.visible");
    });

    it("User can delete rows", () => {
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        cy.findByRole("list", { name: "Test Points Sequence" }).within(() => {
            TestPointSequenceDetailsPage.rows().should("have.length", 5);
        });
        TestPointSequenceDetailsPage.rowFormField(4, "procedureTitle").should("exist");
        TestPointSequenceDetailsPage.rows().eq(4).findByLabelText("Delete").click();

        cy.findByRole("list", { name: "Test Points Sequence" }).within(() => {
            TestPointSequenceDetailsPage.rows().should("have.length", 4);
        });
        TestPointSequenceDetailsPage.rowFormField(4, "procedureTitle").should("not.exist");

        getAllTestPointSequenceTestPointAssociationsInterceptor(testPointAssociationsAfterDeletion);
        cy.wait("@getAllTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.saveButton().click();
        cy.wait("@bulkDeleteTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.rowsWithoutToast().should("have.length", 4);
        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");

        cy.wait("@getAllTestPointSequenceTestPointAssociations");
    });

    it("User can add manual rows", () => {
        const rowToEdit = 5;

        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);
        TestPointSequenceDetailsPage.addBlankRowButton().click();

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "procedureTitle").type("this is a test");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(1, rowToEdit).type("1");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(2, rowToEdit).type("2");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(3, rowToEdit).type("3");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(4, rowToEdit).type("4");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(5, rowToEdit).type("5");
        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "testPointId").type("test point id notes");
        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").type("some more notes");

        getAllTestPointSequenceTestPointAssociationsInterceptor([
            ...testPointAssociations,
            anyTestPointSequenceManualRow(),
        ]);

        TestPointSequenceDetailsPage.saveButton().click();
        cy.wait("@bulkAddTestPointSequenceManualRows");

        TestPointSequenceDetailsPage.rowsWithoutToast().should("have.length", 6);
        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");

        cy.wait("@getAllTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "procedureTitle").should("have.value", "this is a test");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(1, rowToEdit).should("have.value", "1");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(2, rowToEdit).should("have.value", "2");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(3, rowToEdit).should("have.value", "3");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(4, rowToEdit).should("have.value", "4");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(5, rowToEdit).should("have.value", "5");
        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "testPointId").should("have.value", "test point id notes");
        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").should("have.value", "some more notes");
    });

    it("User can add additional notes", () => {
        bulkUpdateTestPointSequencesInterceptor();

        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.additionalNotesTab().click();
        TestPointSequenceDetailsPage.additionalNotesField().type("this is a test additional note");
        getTestPointSequenceInterceptor({
            ...testTestPointSequence,
            additionalNotes: "this is a test additional note",
        });
        TestPointSequenceDetailsPage.saveButton().click();
        cy.wait("@bulkUpdateTestPointSequences");

        TestPointSequenceDetailsPage.toast("Your additional notes have been saved.").should("be.visible");
        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");
        TestPointSequenceDetailsPage.additionalNotesField()
            .get("p")
            .should("contain.text", "this is a test additional note");
    });

    it("Data should persist after switching to additional notes and back", () => {
        const rowToEdit = 1;
        bulkUpdateTestPointSequencesInterceptor();

        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes")
            .clear()
            .type("some meaningful notes for this test point");
        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").should(
            "have.value",
            "some meaningful notes for this test point"
        );

        TestPointSequenceDetailsPage.additionalNotesTab().click();
        TestPointSequenceDetailsPage.testPointsTab().click();

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").should(
            "have.value",
            "some meaningful notes for this test point"
        );
    });

    it("User can update test point rows and update additional notes", () => {
        const rowToEdit = 1;
        bulkUpdateTestPointSequencesInterceptor();
        const testPointAssociationsAfterEdit = getTestPointAssociationsAfterEdit(rowToEdit);
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes")
            .clear()
            .type("some meaningful notes for this test point");

        TestPointSequenceDetailsPage.additionalNotesTab().click();

        TestPointSequenceDetailsPage.additionalNotesField().type("this is a test additional note");
        getTestPointSequenceInterceptor({
            ...testTestPointSequence,
            additionalNotes: "this is a test additional note",
        });

        getAllTestPointSequenceTestPointAssociationsInterceptor(testPointAssociationsAfterEdit);
        cy.wait("@getAllTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.saveButton().click();

        cy.wait("@bulkUpdateTestPointSequences");

        TestPointSequenceDetailsPage.toast("Your additional notes have been saved.").should("be.visible");
        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");

        TestPointSequenceDetailsPage.additionalNotesField()
            .get("p")
            .should("contain.text", "this is a test additional note");

        TestPointSequenceDetailsPage.testPointsTab().click();

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").should(
            "have.value",
            "some meaningful notes for this test point"
        );

        cy.wait("@getAllTestPointSequenceTestPointAssociations");
    });

    it("User can update additional notes and update test point rows", () => {
        const rowToEdit = 1;
        bulkUpdateTestPointSequencesInterceptor();
        const testPointAssociationsAfterEdit = getTestPointAssociationsAfterEdit(rowToEdit);
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.additionalNotesTab().click();

        TestPointSequenceDetailsPage.additionalNotesField().type("this is a test additional note");
        getTestPointSequenceInterceptor({
            ...testTestPointSequence,
            additionalNotes: "this is a test additional note",
        });

        TestPointSequenceDetailsPage.testPointsTab().click();
        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes")
            .clear()
            .type("some meaningful notes for this test point");

        getAllTestPointSequenceTestPointAssociationsInterceptor(testPointAssociationsAfterEdit);
        cy.wait("@getAllTestPointSequenceTestPointAssociations");
        TestPointSequenceDetailsPage.saveButton().click();

        cy.wait("@bulkUpdateTestPointSequences");

        TestPointSequenceDetailsPage.toast("Your additional notes have been saved.").should("be.visible");
        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").should(
            "have.value",
            "some meaningful notes for this test point"
        );
        TestPointSequenceDetailsPage.additionalNotesTab().click();

        TestPointSequenceDetailsPage.additionalNotesField()
            .get("p")
            .should("contain.text", "this is a test additional note");
        cy.wait("@getAllTestPointSequenceTestPointAssociations");
    });

    it("User can update rows", () => {
        const rowToEdit = 4;

        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes")
            .clear()
            .type("some meaningful notes for this test point");

        getAllTestPointSequenceTestPointAssociationsInterceptor([
            ...testPointAssociations.slice(0, 4),
            anyTestPointSequenceTestPointAssociation({
                procedureTitle: "Test Point 4",
                sequenceIndex: 5,
                testPointId: "FTD-V21-01-001-A11-01-D04",
                notes: "some meaningful notes for this test point",
            }),
        ]);

        TestPointSequenceDetailsPage.saveButton().click();

        cy.wait("@bulkEditTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");

        cy.wait("@getAllTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").should(
            "have.value",
            "some meaningful notes for this test point"
        );
    });

    it("User can update and delete rows, and add manual rows", () => {
        const rowToEditTestPointRow = 4;
        const rowToEditManualRow = 5;
        const manualTestPointAssociation = anyTestPointSequenceManualRow();
        const testPointAssociationsAfterEdit = [
            ...getTestPointAssociationsAfterEdit(rowToEditTestPointRow),
            manualTestPointAssociation,
        ];
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        // edit row
        TestPointSequenceDetailsPage.rowFormField(rowToEditTestPointRow, "notes")
            .clear()
            .type("some meaningful notes for this test point");

        getAllTestPointSequenceTestPointAssociationsInterceptor([
            ...testPointAssociations.slice(0, 4),
            anyTestPointSequenceTestPointAssociation({
                procedureTitle: "Test Point 4",
                sequenceIndex: 5,
                testPointId: "FTD-V21-01-001-A11-01-D04",
                notes: "some meaningful notes for this test point",
            }),
        ]);

        // add and edit blank row
        TestPointSequenceDetailsPage.addBlankRowButton().click();

        TestPointSequenceDetailsPage.rowFormField(rowToEditManualRow, "procedureTitle").type("this is a test");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(1, rowToEditManualRow).type("1");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(2, rowToEditManualRow).type("2");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(3, rowToEditManualRow).type("3");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(4, rowToEditManualRow).type("4");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(5, rowToEditManualRow).type("5");
        TestPointSequenceDetailsPage.rowFormField(rowToEditManualRow, "testPointId").type("test point id notes");
        TestPointSequenceDetailsPage.rowFormField(rowToEditManualRow, "notes").type("some more notes");

        getAllTestPointSequenceTestPointAssociationsInterceptor([
            ...testPointAssociations,
            anyTestPointSequenceManualRow(),
        ]);
        TestPointSequenceDetailsPage.addBlankRowButton().click();

        // delete row
        TestPointSequenceDetailsPage.rows().should("have.length", 7);
        TestPointSequenceDetailsPage.rowFormField(6, "procedureTitle").should("exist");
        TestPointSequenceDetailsPage.rows().eq(6).findByLabelText("Delete").click();
        TestPointSequenceDetailsPage.rows().should("have.length", 6);
        TestPointSequenceDetailsPage.rowFormField(6, "procedureTitle").should("not.exist");

        getAllTestPointSequenceTestPointAssociationsInterceptor(testPointAssociationsAfterEdit);
        cy.wait("@getAllTestPointSequenceTestPointAssociations");
        TestPointSequenceDetailsPage.saveButton().click();
        cy.wait("@bulkEditTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");

        // assert edit row
        TestPointSequenceDetailsPage.rowFormField(rowToEditTestPointRow, "notes").should(
            "have.value",
            "some meaningful notes for this test point"
        );

        // assert add and edit blank row
        TestPointSequenceDetailsPage.rowsWithoutToast().should("have.length", 6);

        TestPointSequenceDetailsPage.rowFormField(rowToEditManualRow, "procedureTitle").should(
            "have.value",
            "this is a test"
        );
        TestPointSequenceDetailsPage.nthFieldOfNthRow(1, rowToEditManualRow).should("have.value", "1");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(2, rowToEditManualRow).should("have.value", "2");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(3, rowToEditManualRow).should("have.value", "3");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(4, rowToEditManualRow).should("have.value", "4");
        TestPointSequenceDetailsPage.nthFieldOfNthRow(5, rowToEditManualRow).should("have.value", "5");
        TestPointSequenceDetailsPage.rowFormField(rowToEditManualRow, "testPointId").should(
            "have.value",
            "test point id notes"
        );
        TestPointSequenceDetailsPage.rowFormField(rowToEditManualRow, "notes").should("have.value", "some more notes");

        // assert delete row
        TestPointSequenceDetailsPage.rowsWithoutToast().should("have.length", 6);
        TestPointSequenceDetailsPage.toast("Your test point card changes have been saved.").should("be.visible");

        cy.wait("@getAllTestPointSequenceTestPointAssociations");
    });
});

describe("Test Point Sequence Details Negative Test Cases", () => {
    beforeEach(() => {
        getFlightTestOrderInterceptor();
        getFlightTestOrderV2Interceptor();
        getAllFlightTestOrdersInterceptor([testFlightTestOrder]);
        getAllFlightTestOrdersV2Interceptor([testFlightTestOrderV2]);
        getAllTestPointSequencesInterceptor([testTestPointSequence]);
        getTestPointSequenceInterceptor(testTestPointSequence);
        getAllTestPointSequenceTestPointAssociationsInterceptor(testPointAssociations);
        bulkAddTestPointSequenceManualRowsInterceptor(400);
        bulkEditTestPointSequenceTestPointAssociationsInterceptor(400);
        bulkDeleteTestPointSequenceTestPointAssociationsInterceptor(400);
    });

    it("Delete endpoint throws an error, user cannot delete rows.", () => {
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.rowsWithoutToast().should("have.length", 5);
        TestPointSequenceDetailsPage.rows().eq(4).findByLabelText("Delete").click();

        TestPointSequenceDetailsPage.saveButton().click();
        cy.wait("@bulkDeleteTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.toast("Something went wrong saving your changes.").should("be.visible");

        cy.wait("@getAllTestPointSequenceTestPointAssociations");
    });

    it("Add Manual Rows endpoint throws an error, user cannot add manual rows", () => {
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);
        TestPointSequenceDetailsPage.addBlankRowButton().click();

        getAllTestPointSequenceTestPointAssociationsInterceptor([
            ...testPointAssociations,
            anyTestPointSequenceManualRow(),
        ]);

        TestPointSequenceDetailsPage.saveButton().click();
        cy.wait("@bulkAddTestPointSequenceManualRows");

        TestPointSequenceDetailsPage.rowsWithoutToast().should("have.length", 6);
        TestPointSequenceDetailsPage.toast("Something went wrong saving your changes.").should("be.visible");

        cy.wait("@getAllTestPointSequenceTestPointAssociations");
    });

    it("Update endpoint throws an error, user cannot update rows", () => {
        const rowToEdit = 4;

        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes")
            .clear()
            .type("some meaningful notes for this test point");

        getAllTestPointSequenceTestPointAssociationsInterceptor([
            ...testPointAssociations.slice(0, 4),
            anyTestPointSequenceTestPointAssociation({
                procedureTitle: "Test Point 4",
                sequenceIndex: 5,
                testPointId: "FTD-V21-01-001-A11-01-D04",
                notes: "some meaningful notes for this test point",
            }),
        ]);

        TestPointSequenceDetailsPage.saveButton().click();

        cy.wait("@bulkEditTestPointSequenceTestPointAssociations");
        TestPointSequenceDetailsPage.toast("Something went wrong saving your changes.").should("be.visible");

        cy.wait("@getAllTestPointSequenceTestPointAssociations");

        TestPointSequenceDetailsPage.rowFormField(rowToEdit, "notes").should(
            "have.value",
            "some meaningful notes for this test point"
        );
    });

    it("Additional Notes Update endpoint throws an error, user cannot add additional notes", () => {
        bulkUpdateTestPointSequencesInterceptor(400);

        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        TestPointSequenceDetailsPage.additionalNotesTab().click();
        TestPointSequenceDetailsPage.additionalNotesField().type("this is a test additional note");
        getTestPointSequenceInterceptor({
            ...testTestPointSequence,
            additionalNotes: "this is a test additional note",
        });
        TestPointSequenceDetailsPage.saveButton().click();
        cy.wait("@bulkUpdateTestPointSequences");

        TestPointSequenceDetailsPage.toast("Something went wrong saving your changes.").should("be.visible");
        TestPointSequenceDetailsPage.toast("Something went wrong updating additional notes").should("be.visible");
        TestPointSequenceDetailsPage.additionalNotesField()
            .get("p")
            .should("contain.text", "this is a test additional note");
    });

    it("Row is dragged to new position and sequence indizes are updated correctly", () => {
        cy.mountFlightTestOrder(
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    "vte-1516": { enabled: true },
                }}
            >
                <App />
            </LocalFeatureFlagsProvider>
        );
        TestPointSequenceDetailsPage.goToPage(ftoId);

        const sourceRowIndex = 1;
        const targetRowIndex = 4;

        getAllTestPointSequenceTestPointAssociationsInterceptor([
            ...testPointAssociations,
            anyTestPointSequenceManualRow(),
        ]);

        // starting position
        TestPointSequenceDetailsPage.rowFormField(sourceRowIndex, "procedureTitle").should(
            "have.value",
            "Test Point 1"
        );
        TestPointSequenceDetailsPage.rowFormField(targetRowIndex, "procedureTitle").should(
            "have.value",
            "Test Point 4"
        );

        TestPointSequenceDetailsPage.dragRow(sourceRowIndex, 0, 420);

        // after dragging the row, the target row should be at the new place
        TestPointSequenceDetailsPage.rowFormField(targetRowIndex, "procedureTitle").should(
            "have.value",
            "Test Point 1"
        );
        TestPointSequenceDetailsPage.rowFormField(sourceRowIndex, "procedureTitle").should(
            "have.value",
            "Test Point 2"
        );

        // after dragging the row, the sequence indizes should be updated
        TestPointSequenceDetailsPage.rowFormField(0, "sequenceIndex").should("have.value", "1");
        TestPointSequenceDetailsPage.rowFormField(sourceRowIndex, "sequenceIndex").should("have.value", "2");
        TestPointSequenceDetailsPage.rowFormField(2, "sequenceIndex").should("have.value", "3");
        TestPointSequenceDetailsPage.rowFormField(3, "sequenceIndex").should("have.value", "4");
        TestPointSequenceDetailsPage.rowFormField(targetRowIndex, "sequenceIndex").should("have.value", "5");
    });
});
