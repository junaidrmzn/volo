import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { ReactQueryClientProvider } from "../../../contexts/queryclient/ReactQueryContext";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { FlightPlanSidebar } from "../FlightPlanSidebar";

const TestComponent = () => {
    return (
        <ServiceProvider baseUrl={mockedBaseUrl}>
            <ReactQueryClientProvider>
                <I18nProvider>
                    <FlightPlanSidebar selectedId="0000-0000-0000-0000" />
                </I18nProvider>
            </ReactQueryClientProvider>
        </ServiceProvider>
    );
};

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("FlightPlan - FlightPlanSidebar", () => {
    it("renders without crashing", async () => {
        render(<TestComponent />);
        expect(await screen.findByText("flight plan accepted")).toBeVisible();
    });
});
