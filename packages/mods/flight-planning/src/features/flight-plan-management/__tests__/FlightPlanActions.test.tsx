import type { FlightPlanConflictStatus, FlightPlanStage } from "@voloiq-typescript-api/flight-planning-types";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { ReactQueryClientProvider } from "../../../contexts/queryclient/ReactQueryContext";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { FlightPlanActions } from "../FlightPlanActions";
import { createFlightPlanMock } from "../__mocks__/flightPlan";

const TestComponent = (props: { conflictStatus: FlightPlanConflictStatus; planStage: FlightPlanStage }) => {
    const { conflictStatus, planStage } = props;
    return (
        <I18nProvider>
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <ReactQueryClientProvider>
                    <FlightPlanActions
                        flightPlan={createFlightPlanMock()}
                        conflictStatus={conflictStatus}
                        planStage={planStage}
                    />
                </ReactQueryClientProvider>
            </ServiceProvider>
        </I18nProvider>
    );
};

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("FlightPlan - FlightPlanActions", () => {
    it("renders with activate button enabled and modification disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="accepted" />);
        expect(await screen.findByText("Activate")).not.toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
    it("renders with activate button disabled and modification enabled", async () => {
        render(<TestComponent conflictStatus="conflicting" planStage="deconfliction" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).not.toBeDisabled();
    });
    it("renders with all buttons disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="aborted" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
    it("renders with all buttons disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="activated" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
    it("renders with all buttons disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="canceled" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
    it("renders with all buttons disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="completed" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
    it("renders with all buttons disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="filed" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
    it("renders with all buttons disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="rejected" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
    it("renders with all buttons disabled", async () => {
        render(<TestComponent conflictStatus="no_conflict" planStage="validation-in-progress" />);
        expect(await screen.findByText("Activate")).toBeDisabled();
        expect(await screen.findByText("Resolve conflict and accept change")).toBeDisabled();
    });
});
