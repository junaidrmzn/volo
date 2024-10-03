import React from "react";
import { anyRegion } from "../../lib/test-fixtures/anyRegion";
import { RegionOverview } from "../../src/region/RegionOverview";
import {
    bulkEditRegionInterceptors,
    createRegionInterceptor,
    getRegionInterceptor,
    regionsListWithEntriesInterceptor,
    updateRegionInterceptor,
} from "../interceptors/vertiportInterceptors";
import { dateTimePicker } from "../page-objects/dateTimePickerPageObject";
import { FilterBarRegionPageFragment } from "../page-objects/filterBarRegionPageFragment";
import { RegionAddPage } from "../page-objects/regionAddPAgeObject";
import { regionBulkEditPageObject } from "../page-objects/regionBulkEditPageObject";
import { RegionEditPage } from "../page-objects/regionEditPageObject";
import { RegionOverviewPage } from "../page-objects/regionOverviewPageObject";
import { Select } from "../page-objects/select";

describe("Region Overview", () => {
    it("should not display bulk edit button when no filters are applied", () => {
        regionsListWithEntriesInterceptor([anyRegion()]);
        cy.mount(<RegionOverview />);

        regionBulkEditPageObject.bulkEditButton().should("not.exist");
    });

    it("renders bulk edit modal and select edit properties", () => {
        const date = "2024-01-01 12:00";
        const region = anyRegion({
            name: "iloveorange",
            validFrom: "2023-11-10T16:34:41.000Z",
            validTo: "2024-11-30T16:34:41.000Z",
        });
        regionsListWithEntriesInterceptor([region]);
        getRegionInterceptor(region);
        regionsListWithEntriesInterceptor([region].slice(0, 1));
        cy.mount(<RegionOverview />);
        FilterBarRegionPageFragment.filter({
            validFromStart: "2023-10-10T16:34:41.000Z",
        });
        regionBulkEditPageObject.bulkEditButton().click({ force: true });

        regionBulkEditPageObject.selectLabelText("Bulk Edit - Regions").should("be.visible");
        regionBulkEditPageObject.selectLabelText("Edit Properties").should("be.checked");
        regionBulkEditPageObject.selectLabelText("Archive").should("not.be.checked");

        Select.selectByOptionName("Property:", "Valid from");
        regionBulkEditPageObject.selectLabelText("Change to:").click({ force: true });
        dateTimePicker.selectDate(new Date(date));
        regionBulkEditPageObject.doneButton().click();

        regionBulkEditPageObject.selectLabelText("Confirm - Multi Edit").should("be.visible");
        regionBulkEditPageObject.selectAllText("Valid from").should("be.visible");
        regionBulkEditPageObject.selectText("to").should("be.visible");
        regionBulkEditPageObject.selectAllText(date).should("be.visible");
        regionBulkEditPageObject
            .selectText("Are you sure? You can’t undo this action afterwards.")
            .should("be.visible");

        bulkEditRegionInterceptors(region);
        regionBulkEditPageObject.confirmButton().click();
        cy.get("@bulkEditRegionInterceptors");

        regionBulkEditPageObject.selectLabelText("Confirm - Multi Edit").should("not.exist");
        regionBulkEditPageObject.selectLabelText("Bulk Edit - Regions").should("not.exist");
    });

    it("User can add a new region", () => {
        const region = anyRegion({
            name: "iloveorange",
        });
        regionsListWithEntriesInterceptor([]);
        cy.mount(<RegionOverview />);

        RegionOverviewPage.addButton().click();
        createRegionInterceptor();
        RegionAddPage.add(region);
    });

    it("User can edit region", () => {
        const region = anyRegion({
            name: "iloveorange",
            coordinates: {
                points: [
                    {
                        longitude: 1,
                        latitude: 0,
                        height: 13,
                    },
                    {
                        longitude: 0,
                        latitude: 1,
                        height: 13,
                    },
                    {
                        longitude: 1,
                        latitude: 1,
                        height: 13,
                    },
                ],
            },
        });
        regionsListWithEntriesInterceptor([region]);
        cy.mount(<RegionOverview />);

        getRegionInterceptor(region).as("regionPreview");
        RegionOverviewPage.regionCard("iloveorange").click();

        cy.wait("@regionPreview").then(() => {
            RegionOverviewPage.editButton().click();
            updateRegionInterceptor(region.id);
            RegionEditPage.edit(region);
        });
    });

    it("User can filter region", () => {
        const regionsList = [
            {
                name: "iloveorange",
                validFrom: "2023-11-06T16:34:41.000Z",
                validTo: "2020-11-06T16:34:41.000Z",
            },
            {
                name: "iloveorange 1",
                validFrom: "2023-10-06T16:34:41.000Z",
            },
            {
                name: "iloveorange 2",
                validFrom: "2023-11-02T16:34:41.000Z",
            },
        ].map((region) => anyRegion(region));
        regionsListWithEntriesInterceptor(regionsList);
        cy.mount(<RegionOverview />);
        regionsListWithEntriesInterceptor(regionsList.slice(0, 1));
        FilterBarRegionPageFragment.filter({
            validFromStart: "2023-11-06T01:34:41.000Z",
            validFromEnd: "2023-11-06T21:34:41.000Z",
        });
        RegionOverviewPage.regionCard("iloveorange").should("be.visible");
    });
});
