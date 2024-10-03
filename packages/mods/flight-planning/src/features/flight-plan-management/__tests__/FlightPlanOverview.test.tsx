import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { useGetFlightPlans } from "../../../api-hooks";
import { ReactQueryClientProvider } from "../../../contexts/queryclient/ReactQueryContext";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { FlightPlanOverview } from "../FlightPlanOverview";

const TestComponent = () => {
    const query = useGetFlightPlans();

    return (
        <>
            {query.isSuccess && (
                <I18nProvider>
                    <FlightPlanOverview />
                </I18nProvider>
            )}
        </>
    );
};

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("FlightPlan - FlightPlanOverview", () => {
    it("renders without crashing", async () => {
        render(
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <ReactQueryClientProvider>
                    <TestComponent />
                </ReactQueryClientProvider>
            </ServiceProvider>
        );
        expect(await screen.findByText(/Flight Plan Management/)).toBeVisible();
    });
});
