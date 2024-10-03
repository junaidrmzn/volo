import { QueryClient, QueryClientProvider } from "react-query";
import { anyWaypoint } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { fireEvent, render, screen, userEvent } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { WaypointOnRouteList } from "../components";

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

const mockSetSelectedRouteSequenceIndex = jest.fn();
jest.mock("../../selected-route-sequence-index", () => ({
    ...jest.requireActual("../../selected-route-sequence-index"),
    useSelectedRouteSequenceIndex: () => ({
        setSelectedRouteSequenceIndex: mockSetSelectedRouteSequenceIndex,
    }),
}));

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

const queryClient = new QueryClient();

describe("WaypointOnRouteList", () => {
    const renderWaypointOnRouteList = () => {
        render(
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <WaypointOnRouteList
                        waypoints={[
                            anyWaypoint({ id: 1, name: "wp1", routeSequenceIndex: 0 }),
                            anyWaypoint({ id: 2, name: "wp2", routeSequenceIndex: 1 }),
                        ]}
                        routeId={1}
                    />
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    it("should render", async () => {
        renderWaypointOnRouteList();
        expect(await screen.findByText("WP0 - wp1")).toBeInTheDocument();
    });

    it("should handle drag & drop", async () => {
        renderWaypointOnRouteList();
        const item = await screen.findByText("WP0 - wp1");
        fireEvent.dragStart(item);
        fireEvent.dragOver(item);
        fireEvent.drop(item);

        expect(screen.queryByTestId("waypoint-list-close-btn")).not.toBeInTheDocument();
    });

    it("should select item", async () => {
        renderWaypointOnRouteList();
        const item = await screen.findByTestId("waypoints-list-show-detail-0-btn");
        userEvent.click(item);
        expect(mockSetSelectedRouteSequenceIndex).toHaveBeenCalledTimes(1);
    });
});
