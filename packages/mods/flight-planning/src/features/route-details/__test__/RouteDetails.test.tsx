import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { RouteDetails } from "../components";

const queryClient = new QueryClient();
const mockRoute = anyRoute({ name: "WP0 - wp1" });

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("Route Details Test", () => {
    const RouteDetailsTestComponent = () => {
        return (
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <RouteDetails route={mockRoute} />
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("If selectedRouteSequenceIndex is undefined, RouteDetails should be visible", async () => {
        jest.mock("../../selected-route-sequence-index", () => ({
            ...jest.requireActual("../../selected-route-sequence-index"),
            selectedRouteSequenceIndex: undefined,
        }));

        render(<RouteDetailsTestComponent />);
        const routeNameHeader = await screen.findByText(mockRoute.name);
        expect(routeNameHeader).toBeVisible();
    });

    test("If selectedRouteSequenceIndex is set, WaypointDetails should be visible", async () => {
        jest.mock("../../selected-route-sequence-index", () => ({
            ...jest.requireActual("../../selected-route-sequence-index"),
            selectedRouteSequenceIndex: 0,
        }));

        render(<RouteDetailsTestComponent />);
        const waypointNameHeader = await screen.findByText("WP0 - wp1");
        expect(waypointNameHeader).toBeVisible();
    });
});
