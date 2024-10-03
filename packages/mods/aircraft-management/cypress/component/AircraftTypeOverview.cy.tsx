import { ProductLine } from "@voloiq-typescript-api/aircraft-management-types";
import { PerformanceModel } from "@voloiq/aircraft-management-api/v1";
import { anyAircraftType } from "../../lib/text-fixtures/anyAircraftType";
import { AircraftTypeOverview } from "../../src/aircraft-type/AircraftTypeOverview";
import {
    addAircraftTypeInterceptor,
    editAircraftTypeInterceptor,
    getAircraftTypeInterceptor,
    getAllAircraftTypesInterceptor,
    getProductLinesInterceptor,
} from "../interceptors/aircraftTypesInterceptors";
import { aircraftTypeAdd } from "../page-objects/aircraftTypeAddPageObject";
import { aircraftTypeDetails } from "../page-objects/aircraftTypeDetailPageObjects";
import { aircraftTypeEdit } from "../page-objects/aircraftTypeEditPageObject";
import { aircraftTypeOverview } from "../page-objects/aircraftTypeOverviewPageObject";
import { aircraftTypePreviewPageFragment } from "../page-objects/aircraftTypePreviewPageFragment";
import { FilterBarAircraftTypePageFragment } from "../page-objects/filterBarAircraftTypePageFragment";

describe("AircraftTypeOverview", () => {
    beforeEach(() => {
        getProductLinesInterceptor(["VOLOCITY", "VOLODRONE", "VOLOREGION", "2X", "LILIUM_JET", "UNKNOWN"]);
        addAircraftTypeInterceptor();
    });

    it("User can add aircraft type", () => {
        getAllAircraftTypesInterceptor([]);
        cy.mount(<AircraftTypeOverview />);
        aircraftTypeOverview.addButton().click();
        const aircraftTypeInsert = {
            airDensity: 1,
            cloudCeilingHeight: 13,
            massAndBalanceData: {
                bem: 14,
                cgPosition: { x: 15, y: 16 },
                mtom: 17,
                latCgEnvelopePoints: [],
                longCgEnvelopePoints: [],
            },
            minimumTemperature: 18,
            maximumTemperature: 19,
            name: "orange",
            productLine: ProductLine.VOLOCITY,
            rain: 20,
            relativeHumidity: 21,
            validFrom: "2020-11-06T16:34:41.000Z",
            validTo: "2020-11-06T16:34:41.000Z",
            visibility: 22,
            windSpeed: 23,
            maxDurationToCsfl: 100,
            performanceModel: PerformanceModel.VOLOREGION001,
            voltageThreshold: 1.3,
        };
        const aircraftType = anyAircraftType(aircraftTypeInsert);
        addAircraftTypeInterceptor();
        getAllAircraftTypesInterceptor([aircraftType]);
        aircraftTypeAdd.add(aircraftTypeInsert);
        getAircraftTypeInterceptor(aircraftType);
    });

    it("User can edit an existing aircraft type", () => {
        const aircraftType = anyAircraftType();
        getAllAircraftTypesInterceptor([aircraftType]);
        getAircraftTypeInterceptor(aircraftType);
        editAircraftTypeInterceptor(aircraftType);

        cy.mount(<AircraftTypeOverview />);
        aircraftTypeOverview.aircraftTypeCard("orange").click();

        aircraftTypeOverview.editButton().click({ force: true });
        cy.wait("@getAircraftTypeInterceptor");
        editAircraftTypeInterceptor(aircraftType);
        const aircraftTypeUpdate = {
            name: "apple",
            maxDurationToCsfl: 200,
            performanceModel: PerformanceModel.VOLOCITY001,
            voltageThreshold: 3,
        };
        const updatedaircraftType = { ...aircraftType, ...aircraftTypeUpdate };
        getAllAircraftTypesInterceptor([updatedaircraftType]);
        getAircraftTypeInterceptor(updatedaircraftType);
        aircraftTypeEdit.edit(anyAircraftType(aircraftTypeUpdate));
        cy.wait("@editAircraftTypeInterceptor");
    });

    it("User can filter aircraft types", () => {
        const aircraftTypeList = [
            {
                name: "orange",
                productLine: ProductLine.VOLOCITY,
                id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
            },
            {
                name: "orange 1",
                productLine: ProductLine.VOLOREGION,
                id: "ce118b6e-d8e1-11e7-9296-cec278b6b50b",
            },
        ].map((aircraftType) => anyAircraftType(aircraftType));

        getAllAircraftTypesInterceptor(aircraftTypeList);

        cy.mount(<AircraftTypeOverview />);
        getAllAircraftTypesInterceptor(aircraftTypeList.slice(0, 1));
        FilterBarAircraftTypePageFragment.filter({ productLine: ["VoloCity"] });
        aircraftTypeOverview.aircraftTypeCard("orange").should("be.visible");
    });

    it("User can add aircraft type with 0 minimumTemperature", () => {
        getAllAircraftTypesInterceptor([]);
        cy.mount(<AircraftTypeOverview />);
        aircraftTypeOverview.addButton().click();
        const aircraftTypeInsert = {
            airDensity: 1,
            cloudCeilingHeight: 13,
            massAndBalanceData: {
                bem: 13,
                cgPosition: { x: 13, y: 13 },
                mtom: 13,
                latCgEnvelopePoints: [],
                longCgEnvelopePoints: [],
            },
            visibility: 13,
            windSpeed: 13,
            minimumTemperature: 0,
            maximumTemperature: 2,
            name: "orange",
            productLine: ProductLine.VOLOCITY,
            rain: 13,
            relativeHumidity: 13,
            validFrom: "2020-11-06T16:34:41.000Z",
            validTo: "2020-11-06T16:34:41.000Z",
            performanceModel: PerformanceModel.VOLOREGION001,
            voltageThreshold: 1.3,
        };
        const aircraftType = anyAircraftType(aircraftTypeInsert);
        addAircraftTypeInterceptor().as("aircraftTypeCreation");
        getAllAircraftTypesInterceptor([aircraftType]);
        aircraftTypeAdd.add(aircraftTypeInsert);
        cy.wait("@aircraftTypeCreation").its("response.statusCode").should("equal", 201);
        getAircraftTypeInterceptor(aircraftType);
    });

    it("User can filter aircraft types by name", () => {
        const aircraftTypeList = [
            {
                name: "VC-2X",
                id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
            },
            {
                name: "VX",
                id: "ce118b6e-d8e1-11e7-9296-cec278b6b50b",
            },
        ].map((aircraftType) => anyAircraftType(aircraftType));

        getAllAircraftTypesInterceptor(aircraftTypeList);

        cy.mount(<AircraftTypeOverview />);
        getAllAircraftTypesInterceptor(aircraftTypeList.slice(0, 1));
        FilterBarAircraftTypePageFragment.filter({ aircraftType: "VC-2X" });
        aircraftTypeOverview.aircraftTypeCard("VC-2X").should("be.visible");
    });

    it("User can edit an existing aircraft type from detail page", () => {
        const aircraftType = anyAircraftType();
        getAllAircraftTypesInterceptor([aircraftType]);
        cy.mount(<AircraftTypeOverview />);
        getAircraftTypeInterceptor(aircraftType);
        aircraftTypeOverview.aircraftTypeCard("orange").click();
        cy.wait("@getAircraftTypeInterceptor").then(() => {
            aircraftTypePreviewPageFragment.detailsButton().click();
            editAircraftTypeInterceptor(aircraftType);
            aircraftTypeDetails.editButton().click();
            const aircraftTypeUpdate = {
                name: "apple",
                performanceModel: PerformanceModel.VOLOCITY001,
                voltageThreshold: 3,
            };
            const updatedaircraftType = { ...aircraftType, ...aircraftTypeUpdate };
            aircraftTypeEdit.edit(anyAircraftType(aircraftTypeUpdate));
            getAllAircraftTypesInterceptor([updatedaircraftType]);
            getAircraftTypeInterceptor(updatedaircraftType);
        });
    });
});
