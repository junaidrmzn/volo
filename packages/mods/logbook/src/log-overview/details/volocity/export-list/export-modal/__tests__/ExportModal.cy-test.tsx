import { Button } from "@volocopter/design-library-react";
import { addMinutes } from "date-fns";
import { useState } from "react";
import type { ExportArguments, ExportInsert, Log } from "@voloiq/logbook-api/v6";
import { DateTimePicker } from "../../../../../../../cypress/page-objects/datepicker";
import { ExportModal as ExportModalCyFunction } from "../../../../../../../cypress/page-objects/export-modal";
import { CypressUIWrapper, ServiceWrapper } from "../../../../../../libs/logbook/mocks/TestWrapper";
import {
    anyExportInsert,
    makePostExportInterceptor,
} from "../../../../../../libs/logbook/mocks/cypress/ExportInterceptors";
import { anyLog } from "../../../../../../libs/logbook/mocks/cypress/LogInterceptors";
import {
    anyParameter,
    makeGetAllInstrumentationParametersInterceptor,
} from "../../../../../../libs/logbook/mocks/cypress/ParameterInterceptors";
import { makePostInstrumentationValidateInterceptor } from "../../../../../../libs/logbook/mocks/cypress/ValidationInterceptor";
import { ExportModal } from "../ExportModal";

const ExportModalTestWrapper = (props: { selectedLog: Log; onExportCreated?: () => void }) => {
    const { selectedLog, onExportCreated = () => {} } = props;
    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    const [exportRequestLog, setExportRequestLog] = useState<Log | undefined>(undefined);

    return (
        <>
            <Button onClick={() => setExportRequestLog(selectedLog)}>Open Modal</Button>
            <ExportModal
                isOpen={!!exportRequestLog}
                onClose={() => setExportRequestLog(undefined)}
                selectedLog={exportRequestLog}
                onExportCreated={onExportCreated}
            />
        </>
    );
};

describe("Export modal ", () => {
    beforeEach(() => {
        Cypress.on("uncaught:exception", (error) => !error.message.includes("ResizeObserver loop limit exceeded"));
        makePostInstrumentationValidateInterceptor({ valid: true });
        makeGetAllInstrumentationParametersInterceptor();
    });

    it("can be opened and closed", () => {
        const onExportCreatedMock = cy.stub();
        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} onExportCreated={onExportCreatedMock} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.header().should("be.visible");
        ExportModalCyFunction.cancelButton().click();
        ExportModalCyFunction.header().should("not.exist");
        cy.wrap(onExportCreatedMock).should("not.have.been.called");
    });

    it("can send an export request", () => {
        const onExportCreatedMock = cy.stub();
        const testExport: ExportArguments = anyExportInsert();

        makePostExportInterceptor();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} onExportCreated={onExportCreatedMock} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.endTime));

        ExportModalCyFunction.exportFileTypeRadioGroup().within(() => {
            cy.contains(".chakra-radio", "PARQUET").click();
        });

        ExportModalCyFunction.sampleRateNumberInput().type(String(testExport.sampleRate));
        ExportModalCyFunction.ftiParameterInput().type(testExport.parameters.join(","));

        ExportModalCyFunction.confirmButton().click();

        cy.wait("@postExport").its("response.statusCode").should("eq", 201);

        cy.findByText("An export has been requested successfully").should("be.visible");
        cy.wrap(onExportCreatedMock).should("have.been.calledOnce");
    });

    it("should disable sample rate and set sampleRate to null when HDF5 is selected", () => {
        const onExportCreatedMock = cy.stub();
        const testExport: ExportArguments = anyExportInsert();

        makePostExportInterceptor();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} onExportCreated={onExportCreatedMock} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.endTime));
        ExportModalCyFunction.exportFileTypeRadioGroup().within(() => {
            cy.contains(".chakra-radio", "HDF5").click();
        });
        ExportModalCyFunction.sampleRateNumberInput().should("be.disabled");

        ExportModalCyFunction.ftiParameterInput().type("123 ");

        ExportModalCyFunction.confirmButton().click();

        cy.wait("@postExport").its("request.body").as("requestBody");

        cy.get("@requestBody").should("have.property", "sampleRate", null);

        cy.get("@requestBody").should("have.property", "exportFileType", "HDF5");
    });

    it("can detect an invalid fti code", () => {
        const testExport: ExportArguments = anyExportInsert();

        makePostInstrumentationValidateInterceptor({ valid: false }, undefined, { delay: 1000 });

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.endTime));
        ExportModalCyFunction.ftiParameterInput().type(testExport.parameters.join(","));

        cy.get(`[aria-busy]`).should("have.length", 1);

        cy.wait("@postInstrumentationValidate").its("response.statusCode").should("eq", 201);

        cy.get(`[aria-busy]`).should("not.exist");
        cy.get(`[aria-invalid]`).should("have.length", 1);
    });

    it("can detect a valid fti code", () => {
        const testExport: ExportArguments = anyExportInsert();

        makePostInstrumentationValidateInterceptor({ valid: true }, undefined, { delay: 1000 });

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.endTime));
        ExportModalCyFunction.ftiParameterInput().type(testExport.parameters.join(","));

        cy.get(`[aria-busy]`).should("have.length", 1);

        cy.wait("@postInstrumentationValidate").its("response.statusCode").should("eq", 201);

        cy.get(`[aria-busy]`).should("not.exist");
        cy.get(`[aria-invalid]`).should("not.exist");
    });

    it("can read parameters with different separators", () => {
        const testExport: ExportInsert = anyExportInsert({
            parameters: ["123", "345", "456", "567", "678", "789"],
        });
        const parameterIds = ",123,345, 456 . 567   678 ;789  ";

        makePostExportInterceptor();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.endTime));
        ExportModalCyFunction.sampleRateNumberInput().type(String(testExport.sampleRate));
        ExportModalCyFunction.ftiParameterInput().type(parameterIds);

        ExportModalCyFunction.confirmButton().click();

        cy.wait("@postExport")
            .its("request.body.parameters")
            .should("include.members", testExport.parameters)
            .should("have.length", testExport.parameters.length);
    });

    it("can enter parameter ids by using different separators", () => {
        const testExport: ExportInsert = anyExportInsert({
            parameters: ["123", "345", "567", "789"],
        });

        makePostExportInterceptor();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.endTime));
        ExportModalCyFunction.sampleRateNumberInput().type(String(testExport.sampleRate));
        ExportModalCyFunction.ftiParameterInput().type("123 345, 567. 789;");

        ExportModalCyFunction.confirmButton().click();

        cy.wait("@postExport")
            .its("request.body.parameters")
            .should("include.members", testExport.parameters)
            .should("have.length", testExport.parameters.length);
    });

    it("has a initial start date value", () => {
        const testLog = anyLog({ date: "2023-01-20T13:07:21.588000+00:00", endDate: undefined });

        makePostExportInterceptor();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={testLog} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().should("contain.value", "2023-01-20 13:07");
        ExportModalCyFunction.endDateDatePicker().should("contain.value", "");
    });

    it("has a initial start date value and end date value if 'validTo' is provided", () => {
        const testLog = anyLog({
            date: "2023-01-20T13:07:21.588000+00:00",
            endDate: "2023-01-20T15:07:21.588000+00:00",
        });

        makePostExportInterceptor();

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={testLog} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().should("contain.value", "2023-01-20 13:07");
        ExportModalCyFunction.endDateDatePicker().should("contain.value", "2023-01-20 15:07");
    });

    it("can select a combobox parameter by clicking on it", () => {
        const testExport: ExportInsert = anyExportInsert({
            parameters: ["123"],
        });

        makePostExportInterceptor();
        makeGetAllInstrumentationParametersInterceptor([anyParameter()]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper selectedLog={anyLog()} />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.endTime));
        ExportModalCyFunction.sampleRateNumberInput().type(String(testExport.sampleRate));
        ExportModalCyFunction.ftiParameterInput().click().type("123");

        cy.wait("@getAllInstrumentationParameters");
        ExportModalCyFunction.tagSelectListItems().first().click();
        ExportModalCyFunction.ftiParameterInput().clear();

        ExportModalCyFunction.confirmButton().click();

        cy.wait("@postExport")
            .its("request.body.parameters")
            .should("include.members", testExport.parameters)
            .should("have.length", testExport.parameters.length);
    });

    // TODO: Please fix this test. It is related to the NumberInput change in the Design Library https://jira.volocopter.org/browse/FECOP-299
    it.skip("will not submit if the calculated dataPoints exceed 150 million", () => {
        const testExport: ExportInsert = anyExportInsert({
            parameters: ["123"],
            sampleRate: 300_000,
        });

        makePostExportInterceptor();
        makeGetAllInstrumentationParametersInterceptor([anyParameter()]);

        cy.mount(
            <CypressUIWrapper>
                <ServiceWrapper>
                    <ExportModalTestWrapper
                        selectedLog={anyLog({ endDate: addMinutes(new Date(testExport.endTime), 10).toISOString() })}
                    />
                </ServiceWrapper>
            </CypressUIWrapper>
        );

        cy.findByRole("button", { name: /open modal/i }).click();

        ExportModalCyFunction.startDateDatePicker().click();
        DateTimePicker.selectTime(new Date(testExport.startTime));
        ExportModalCyFunction.endDateDatePicker().click();
        DateTimePicker.selectTime(addMinutes(new Date(testExport.endTime), 10));
        ExportModalCyFunction.sampleRateNumberInput().type(String(testExport.sampleRate));
        ExportModalCyFunction.ftiParameterInput().click().type("123");

        cy.wait("@getAllInstrumentationParameters");
        ExportModalCyFunction.tagSelectListItems().first().click();
        ExportModalCyFunction.ftiParameterInput().clear();

        ExportModalCyFunction.confirmButton().click();

        cy.findByText(/the exports of 179,700,000 data points exceed the limit of 150 million data points./i).should(
            "be.visible"
        );
    });
});
