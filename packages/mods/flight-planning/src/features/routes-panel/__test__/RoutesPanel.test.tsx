import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { RoutesPanel } from "../components";

const queryClient = new QueryClient();

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

const mockHandleRefocusCallback = jest.fn();
const mockRoute = anyRoute();

describe("Routes Panel Test", () => {
    const RoutesPanelTestComponent = () => {
        return (
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <RoutesPanel
                        routes={[mockRoute]}
                        resetRouteTemplatePreview={jest.fn()}
                        toggleRouteTemplateList={jest.fn()}
                        handleRefocusCallback={mockHandleRefocusCallback}
                    />
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("If selectedRoute is undefined, RouteList should be visible", async () => {
        jest.mock("../../selected-route", () => ({
            ...jest.requireActual("../../selected-route"),
            useSelectedRoute: () => ({
                selectedRoute: undefined,
            }),
        }));

        render(<RoutesPanelTestComponent />);
        const routesHeader = await screen.findByText("Routes");
        expect(routesHeader).toBeVisible();
        expect(mockHandleRefocusCallback).not.toHaveBeenCalled();
    });

    test("If selectedRoute is set, RouteDetails should be visible", async () => {
        jest.mock("../../selected-route", () => ({
            ...jest.requireActual("../../selected-route"),
            useSelectedRoute: () => ({
                selectedRoute: mockRoute,
            }),
        }));

        render(<RoutesPanelTestComponent />);
        const routeNameHeader = await screen.findByText(mockRoute.name);
        expect(routeNameHeader).toBeVisible();
        expect(mockHandleRefocusCallback).not.toHaveBeenCalled();
    });
});
