import { render, screen, userEvent } from "@voloiq/testing";
import { AlertsList } from "../AlertsList";

const mockCloseSidebar = jest.fn();

const mockedAlerts = [
    {
        id: 165,
        message:
            "Max climbrate exceeded between wps departure and Unnamed (3.31m/s climb needed for 40.0kts at departure, but max climb is 2.1m/s). Adjust speed to max 25.37kts or change coordinates/altitude on either wp.",
        type: "ttoResult",
        routeId: 15,
    },
    {
        id: 166,
        message:
            "Max climbrate exceeded between wps Unnamed and Unnamed (8.17m/s climb needed for 40.0kts at Unnamed, but max climb is 2.1m/s). Adjust speed to max 10.28kts or change coordinates/altitude on either wp.",
        type: "ttoResult",
        routeId: 15,
    },
];

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({ routeOption: 1 }),
    useOutletContext: () => ({
        closeRightSidebar: mockCloseSidebar,
    }),
}));

describe("Alerts-list test", () => {
    test("should show heading 'No Alerts' without mockdata", () => {
        render(<AlertsList closeRightSidebar={mockCloseSidebar} alerts={[]} />);
        expect(screen.getByText("No Alerts")).toBeVisible();
    });

    test("should show no alert without mockdata", () => {
        render(<AlertsList closeRightSidebar={mockCloseSidebar} alerts={[]} />);
        expect(screen.queryByText(`${mockedAlerts[0]?.message}`)).not.toBeInTheDocument();
        expect(screen.getByText("No Alerts")).toBeVisible();
    });

    test("should show heading 'Alerts' with mockdata", () => {
        render(<AlertsList closeRightSidebar={mockCloseSidebar} alerts={mockedAlerts} />);
        expect(screen.getByText("Alerts")).toBeVisible();
    });

    test("alert should be displayed", () => {
        render(<AlertsList closeRightSidebar={mockCloseSidebar} alerts={mockedAlerts} />);
        expect(screen.getByTestId(`alerts-list-item-${mockedAlerts[0]?.id}`)).toBeVisible();
        expect(screen.getByText(`${mockedAlerts[0]?.message}`)).toBeVisible();
    });

    test("alert-list-item button should fire click close event", () => {
        render(<AlertsList closeRightSidebar={mockCloseSidebar} alerts={mockedAlerts} />);
        const closeButton = screen.getByTestId("alerts-list-close-button");
        userEvent.click(closeButton);
        expect(mockCloseSidebar).toHaveBeenCalled();
    });
});
