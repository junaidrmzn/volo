import { render, screen, userEvent } from "@voloiq/testing";
import { NotamList } from "../NotamList";

const mockCloseSidebar = jest.fn();

const mockedNotam = { features: [{ properties: { externalId: 420, text: "test" } }] };

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({ flightId: 1 }),
    useOutletContext: () => ({
        closeRightSidebar: mockCloseSidebar,
    }),
}));

jest.mock("@voloiq/flight-planning-api/v1", () => ({
    ...jest.requireActual("@voloiq/flight-planning-api/v1"),
    useGetNotamsByLatLng: () => ({
        isError: false,
        isLoading: false,
        data: mockedNotam,
    }),
}));

describe("StateOfChargeSettings test", () => {
    test("should show heading", () => {
        render(<NotamList closeRightSidebar={mockCloseSidebar} latitude={0} longitude={0} />);
        expect(screen.getByText("Notams")).toBeVisible();
    });

    test("notam should be displayed", async () => {
        render(<NotamList closeRightSidebar={mockCloseSidebar} latitude={0} longitude={0} />);
        expect(screen.getByTestId(`notam-list-item-${mockedNotam.features[0]?.properties.externalId}`)).toBeVisible();
        expect(screen.getByText(mockedNotam.features[0]!.properties.text)).toBeVisible();
    });

    test("notam-list-item-420 button should fire click close event", () => {
        render(<NotamList closeRightSidebar={mockCloseSidebar} latitude={0} longitude={0} />);
        const closeButton = screen.getByTestId("notam-list-close-button");
        userEvent.click(closeButton);

        expect(mockCloseSidebar).toHaveBeenCalled();
    });
});
