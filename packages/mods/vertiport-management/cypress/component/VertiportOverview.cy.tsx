import { PadEventType, PadService, PassengerCheckinType } from "@voloiq-typescript-api/vertiport-management-types";
import { anyEquipment, anyEquipmentUpdate } from "@voloiq/vertiport-management-api/v1";
import { anyPad } from "../../lib/test-fixtures/anyPad";
import { anyPadEvent } from "../../lib/test-fixtures/anyPadEvent";
import { anyRegion } from "../../lib/test-fixtures/anyRegion";
import { anyService } from "../../lib/test-fixtures/anyService";
import { anyVertiport } from "../../lib/test-fixtures/anyVertiport";
import { VertiportOverview } from "../../src/vertiport/VertiportOverview";
import {
    createEquipmentInterceptor,
    getAllEquipmentsInterceptor,
    updateEquipmentInterceptor,
} from "../interceptors/equipmentInterceptors";
import { createPadEventInterceptor } from "../interceptors/padEventInterceptors";
import {
    createPadInterceptor,
    deletePadInterceptor,
    getAllPadsInterceptor,
    updatePadInterceptor,
} from "../interceptors/padInterceptors";
import {
    bulkEditVertiportInterceptors,
    createVertiportInterceptor,
    deleteVertiportInterceptor,
    getAllVertiportsInterceptor,
    getVertiportInterceptor,
    regionsListWithEntriesInterceptor,
    servicesListWithEntriesInterceptor,
    updateVertiportInterceptor,
    vertiportsListWithEntriesInterceptor,
} from "../interceptors/vertiportInterceptors";
import { ApproachDirectionsFormPageFragment } from "../page-objects/approachDirectionsFormPageFragment";
import { dateTimePicker } from "../page-objects/dateTimePickerPageObject";
import { DeleteVertiportModalPageFragment } from "../page-objects/deleteVertiportModalPageFragment";
import { AddEquipmentModal } from "../page-objects/equipments/addEquipmentModalPageFragment";
import { EditEquipmentModal } from "../page-objects/equipments/editEquipmentModalPageFragment";
import { EquipmentActionsPopover } from "../page-objects/equipments/equipmentActionsPopoverPageFragment";
import { FilterBarVertiportPageFragment } from "../page-objects/filterBarVertiportPageFragment";
import { AddPadPopover } from "../page-objects/pads/addPadPopoverPageFragment";
import { AddPadEventPopover } from "../page-objects/pads/pad-events/addPadEventPopoverPageFragment";
import { PadActionsPopover } from "../page-objects/pads/padActionsPopoverPageFragment";
import { Select } from "../page-objects/select";
import { VertiportAddPage } from "../page-objects/vertiportAddPageObject";
import { vertiportBulkEdit } from "../page-objects/vertiportBulkEditPageObject";
import { VertiportDetailPage } from "../page-objects/vertiportDetailPageObject";
import { VertiportEditPage } from "../page-objects/vertiportEditPageObject";
import { VertiportOverviewPage } from "../page-objects/vertiportOverviewPageObject";
import { VertiportPreviewPageFragment } from "../page-objects/vertiportPreviewPageFragment";

describe("Vertiport Overview", () => {
    it("User can delete vertiport", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);

        VertiportOverviewPage.vertiportCard("iloveorange").click();

        deleteVertiportInterceptor(vertiport.id);
        getAllVertiportsInterceptor([]);
        VertiportPreviewPageFragment.deleteButton().click();
        DeleteVertiportModalPageFragment.deleteButton().click();
        VertiportOverviewPage.noEntriesFoundHeading().should("be.visible");
    });

    it("User can filter vertiport", () => {
        const vertiportsList = [
            {
                name: "iloveorange",
                services: [
                    {
                        serviceKey: "PAX",
                    },
                ],
                synchronizedWithLeon: true,
            },
            {
                name: "iloveorange 1",
                synchronizedWithLeon: false,
            },
            {
                name: "iloveorange 2",
                synchronizedWithLeon: false,
            },
        ].map((vertiport) => anyVertiport(vertiport));
        getAllVertiportsInterceptor(vertiportsList);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        cy.mount(<VertiportOverview />);
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getAllVertiportsInterceptor(vertiportsList.slice(0, 1));
        FilterBarVertiportPageFragment.filter({ services: "PAX", leonId: true, comparisonOperatorLabel: "is not" });
        VertiportOverviewPage.vertiportCard("iloveorange").should("be.visible");
    });

    it("User can sort the vertiport list ", () => {
        const vertiportsList = [
            {
                name: "iloveorange",
            },
            {
                name: "Airfield Bruchsal",
            },
            {
                name: "Charles de Gaulle Airport",
            },
        ].map((vertiport) => anyVertiport(vertiport));
        getAllVertiportsInterceptor(vertiportsList);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        cy.mount(<VertiportOverview />);
        FilterBarVertiportPageFragment.sorting({ sortingOption: "Name" });

        getAllVertiportsInterceptor(
            vertiportsList.sort((a, b) => {
                if (a.name < b.name) return -1;
                return a.name > b.name ? 1 : 0;
            })
        );
        VertiportOverviewPage.vertiportCard("Airfield Bruchsal").should("be.visible");
        FilterBarVertiportPageFragment.sorting({ sortingOption: "Name", comparisonOperatorLabel: "Descending" });
        getAllVertiportsInterceptor(
            vertiportsList.sort((a, b) => {
                if (a.name > b.name) return -1;
                return a.name < b.name ? 1 : 0;
            })
        );
        VertiportOverviewPage.vertiportCard("iloveorange").should("be.visible");
    });

    it("User can visit all vertiport tabs", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);

        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.detailsButton().click();
        getAllPadsInterceptor(vertiport.id, []);
        VertiportDetailPage.generalTab().click();
        VertiportDetailPage.locationTab().click();
        VertiportDetailPage.operationsTab().click();
        VertiportDetailPage.localiisationTab().click();
        VertiportDetailPage.fatoStandTab().click();
        VertiportDetailPage.returnToListButton().click();
    });

    it("User can add, edit and delete pads", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);

        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.detailsButton().click();
        getAllPadsInterceptor(vertiport.id, []);
        VertiportDetailPage.fatoStandTab().click();
        const pad = anyPad({ padKey: "PAD A" });
        createPadInterceptor(vertiport.id);
        getAllPadsInterceptor(vertiport.id, [pad]).as("apiRequest");
        VertiportDetailPage.addFatoStandButton().click();
        AddPadPopover.addPad(pad);
        AddPadPopover.doneButton().click({ force: true });
        cy.wait("@apiRequest").then(() => {
            VertiportDetailPage.actionsForFatoStands().should("be.visible");
            updatePadInterceptor(vertiport.id, pad.id);
            VertiportDetailPage.actionsForFatoStands().click();
            PadActionsPopover.editFatoStandButton().click({ force: true });
            const editPad = anyPad({ services: [PadService.STAND] });
            PadActionsPopover.editPad(editPad);
            PadActionsPopover.doneButton().click({ force: true });

            deletePadInterceptor(vertiport.id, pad.id);
            getAllPadsInterceptor(vertiport.id, [pad]);
            VertiportDetailPage.actionsForFatoStands().click();
            PadActionsPopover.deleteFatoStandButton().click({ force: true });
            PadActionsPopover.removeButton().click({ force: true });
        });
    });

    it("User can add pad events", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        const pad = anyPad({ padKey: "PAD A" });
        getAllPadsInterceptor(vertiport.id, [pad]);
        cy.mount(<VertiportOverview />);

        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.detailsButton().click();
        VertiportDetailPage.fatoStandTab().click();
        VertiportDetailPage.actionsForFatoStands().should("be.visible");
        createPadEventInterceptor(vertiport.id, pad.id);
        VertiportDetailPage.actionsForFatoStands().click();
        PadActionsPopover.addFatoStandEventButton().click({ force: true });
        const padEvent = anyPadEvent({ title: "arriving V0002" });
        AddPadEventPopover.addPadEvent(padEvent);
        AddPadPopover.doneButton().click();
    });

    it("User can add pad event without subtitle", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        const pad = anyPad({ padKey: "PAD A" });
        getAllPadsInterceptor(vertiport.id, [pad]);
        cy.mount(<VertiportOverview />);

        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.detailsButton().click();
        VertiportDetailPage.fatoStandTab().click();
        VertiportDetailPage.actionsForFatoStands().should("be.visible");
        createPadEventInterceptor(vertiport.id, pad.id);
        VertiportDetailPage.actionsForFatoStands().click();
        PadActionsPopover.addFatoStandEventButton().click({ force: true });
        const padEvent = {
            title: "arriving V0002",
            startTime: "2023-03-24T10:34:59.873385617Z",
            endTime: "2023-03-24T10:34:59.873412944Z",
            type: PadEventType.ACPARKING,
        };
        AddPadEventPopover.addPadEvent(padEvent);
        AddPadPopover.doneButton().click();
    });

    it("User cannot submit vertiport without elevation and type again to submit", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
            elevation: undefined,
        });
        vertiportsListWithEntriesInterceptor([]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        cy.mount(<VertiportOverview />);
        VertiportOverviewPage.addButton().click();
        createVertiportInterceptor();
        VertiportAddPage.add(vertiport);
        VertiportAddPage.saveButton().click();
        VertiportAddPage.requiredValueErrorText().should("be.visible");
        VertiportAddPage.elevationNumberbox().type("4.4");
        VertiportAddPage.saveButton().click();
        VertiportAddPage.requiredValueErrorText().should("not.exist");
    });

    it("User can add vertiport", () => {
        const vertiport = anyVertiport({
            name: "ilove",
        });
        vertiportsListWithEntriesInterceptor([]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        cy.mount(<VertiportOverview />);
        VertiportOverviewPage.addButton().click();
        createVertiportInterceptor();
        VertiportAddPage.add(vertiport);
    });

    it("User can edit vertiport", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
            passengerCheckinType: PassengerCheckinType.NOT_ALLOWED,
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);
        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.editButton().click();
        updateVertiportInterceptor(vertiport.id);
        VertiportEditPage.edit(vertiport);
    });

    it("User can add approach direction in add vertiport", () => {
        const vertiport = anyVertiport({
            name: "ilove",
        });
        vertiportsListWithEntriesInterceptor([]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        cy.mount(<VertiportOverview />);
        VertiportOverviewPage.addButton().click();
        createVertiportInterceptor();
        ApproachDirectionsFormPageFragment.addButton().click();
        ApproachDirectionsFormPageFragment.DirectionNumberbox().type("3");
        ApproachDirectionsFormPageFragment.checkButton().click();
        cy.findByText("3.00").should("be.visible");
        VertiportAddPage.add(vertiport);
    });

    it("User can add, edit and delete approach direction in edit vertiport", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
            passengerCheckinType: PassengerCheckinType.NOT_ALLOWED,
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);
        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.editButton().click();
        updateVertiportInterceptor(vertiport.id);
        ApproachDirectionsFormPageFragment.editButton().click();
        ApproachDirectionsFormPageFragment.DirectionNumberbox().clear({ force: true }).type("3.4");
        ApproachDirectionsFormPageFragment.checkButton().click();
        cy.findByText("3.40").should("be.visible");
        ApproachDirectionsFormPageFragment.addButton().click();
        ApproachDirectionsFormPageFragment.DirectionNumberbox().type("3");
        ApproachDirectionsFormPageFragment.checkButton().click();
        cy.findByText("3.00").should("be.visible");
        VertiportEditPage.edit(vertiport);
    });

    it("User can add and edit equipments", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);

        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.detailsButton().click();
        getAllEquipmentsInterceptor(vertiport.id, []);
        VertiportDetailPage.equipmentTab().click();
        const equipment = anyEquipment({ name: "Equipment A" });
        createEquipmentInterceptor(vertiport.id);
        getAllEquipmentsInterceptor(vertiport.id, [equipment]).as("apiRequest");
        VertiportDetailPage.addEquipmentButton().click();
        AddEquipmentModal.addEquipment(equipment);
        AddEquipmentModal.doneButton().click({ force: true });
        cy.wait("@apiRequest").then(() => {
            VertiportDetailPage.actionsForEquipments().should("be.visible");
            updateEquipmentInterceptor(vertiport.id, equipment.id);
            VertiportDetailPage.actionsForEquipments().click();
            EquipmentActionsPopover.editEquipmentButton().click({ force: true });
            const editEquipment = anyEquipmentUpdate();
            EditEquipmentModal.editEquipment(editEquipment);
            EditEquipmentModal.doneButton().click({ force: true });
        });
    });

    it("User can edit vertiport from detail page", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
            passengerCheckinType: PassengerCheckinType.NOT_ALLOWED,
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);
        VertiportOverviewPage.vertiportCard("iloveorange").click();
        VertiportPreviewPageFragment.detailsButton().click();
        VertiportDetailPage.editButton().click();
        updateVertiportInterceptor(vertiport.id);
        VertiportEditPage.edit(vertiport);
    });

    it("should not display bulk edit button when no filters are applied", () => {
        const vertiport = anyVertiport({
            name: "iloveorange",
            passengerCheckinType: PassengerCheckinType.NOT_ALLOWED,
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);

        vertiportBulkEdit.bulkEditButton().should("not.exist");
    });

    it("renders bulk edit modal and select edit properties", () => {
        const date = "2024-01-01 12:00";
        const vertiport = anyVertiport({
            name: "iloveorange",
            passengerCheckinType: PassengerCheckinType.NOT_ALLOWED,
        });
        vertiportsListWithEntriesInterceptor([vertiport]);
        const region = anyRegion({
            name: "iloveorange",
        });
        const service = anyService({
            key: "PAX",
        });
        regionsListWithEntriesInterceptor([region]);
        servicesListWithEntriesInterceptor([service]);
        getVertiportInterceptor(vertiport);
        cy.mount(<VertiportOverview />);

        FilterBarVertiportPageFragment.filter({ leonId: true });
        vertiportBulkEdit.bulkEditButton().click();

        vertiportBulkEdit.selectLabelText("Bulk Edit - Vertiports").should("be.visible");
        vertiportBulkEdit.selectLabelText("Edit Properties").should("be.checked");
        vertiportBulkEdit.selectLabelText("Archive").should("not.be.checked");

        Select.selectByOptionName("Property:", "Valid from");
        vertiportBulkEdit.selectLabelText("Change to:").click({ force: true });
        dateTimePicker.selectDate(new Date(date));
        vertiportBulkEdit.doneButton().click();

        vertiportBulkEdit.selectLabelText("Confirm - Multi Edit").should("be.visible");
        vertiportBulkEdit.selectAllText("Valid from").should("be.visible");
        vertiportBulkEdit.selectText("to").should("be.visible");
        vertiportBulkEdit.selectAllText(date).should("be.visible");
        vertiportBulkEdit.selectText("Are you sure? You can’t undo this action afterwards.").should("be.visible");

        bulkEditVertiportInterceptors(vertiport);
        vertiportBulkEdit.confirmButton().click();
        cy.get("@bulkEditVertiportInterceptors");

        vertiportBulkEdit.selectLabelText("Confirm - Multi Edit").should("not.exist");
        vertiportBulkEdit.selectLabelText("Bulk Edit - Vertiports").should("not.exist");
    });
});
