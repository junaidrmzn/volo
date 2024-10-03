import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { ReactQueryClientProvider } from "../../../contexts/queryclient/ReactQueryContext";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { FlightPlanLog } from "../FlightPlanLog";

const TestComponent = () => {
    return (
        <I18nProvider>
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <ReactQueryClientProvider>
                    <FlightPlanLog flightPlanId={1} />
                </ReactQueryClientProvider>
            </ServiceProvider>
        </I18nProvider>
    );
};

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("FlightPlan - FlightPlanLog", () => {
    it("renders without crashing", async () => {
        render(<TestComponent />);
        expect(await screen.findByText("Log")).toBeVisible();
        expect(await screen.findByText("create")).toBeVisible();
        expect(await screen.findByText("accept")).toBeVisible();
        expect(await screen.findByText("update")).toBeVisible();
        expect(await screen.findByText("conflict")).toBeVisible();
    });
});
