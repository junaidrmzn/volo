import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mockedBaseUrl } from "../../../testing/url";
import { RouteList } from "../components";

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

const queryClient = new QueryClient();
const mockRoutes = [
    anyRoute({ id: 1, name: "route1" }),
    anyRoute({ id: 2, name: "route2" }),
    anyRoute({ id: 3, name: "route3" }),
    anyRoute({ id: 4, name: "route4" }),
];

const mockHandleCreateNewRoute = jest.fn();

describe("Route List Tests", () => {
    const renderRouteList = () => {
        render(
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <RouteList routes={mockRoutes} handleCreateNewRoute={mockHandleCreateNewRoute} />
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("should show route list", () => {
        renderRouteList();
        expect(screen.getByText("Routes")).toBeVisible();
    });

    test("should show 4 routes", () => {
        renderRouteList();
        expect(screen.getByText("route1")).toBeVisible();
        expect(screen.getByText("route2")).toBeVisible();
        expect(screen.getByText("route3")).toBeVisible();
        expect(screen.getByText("route4")).toBeVisible();
    });

    test("clicking add button should trigger mockHandleCreateNewRoute", () => {
        renderRouteList();
        const addButton = screen.getByTestId("route-list-add");
        userEvent.click(addButton);
        expect(mockHandleCreateNewRoute).toHaveBeenCalledTimes(1);
    });
});
