import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { ReactQueryClientProvider } from "../../../../contexts/queryclient/ReactQueryContext";
import { mswServer } from "../../../../testing/msw-server";
import { mockedBaseUrl } from "../../../../testing/url";
import { AirspaceList } from "../AirspaceList";

// import { mockedAirspaceList } from "../__mocks__/airspacesList";

/*
const mockedSelectedOption = {
    label: "Select Airspace Type...",
};
*/
const mockedAltitudeRange = [0, 10_000];
const mockCloseSidebar = jest.fn();
const mockedSetSelectedAirspaceOptions = jest.fn();

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({ routeOption: 1 }),
    useOutletContext: () => ({
        closeRightSidebar: mockCloseSidebar,
        setSelectedAirspaceOptions: mockedSetSelectedAirspaceOptions,
        altitudeRange: mockedAltitudeRange,
    }),
}));

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

const AirspacesListTestComponent = () => {
    return (
        <ReactQueryClientProvider>
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <AirspaceList closeRightSidebar={mockCloseSidebar} />
            </ServiceProvider>
        </ReactQueryClientProvider>
    );
};

describe("StateOfChargePanelSettings test", () => {
    test("should show heading", () => {
        render(<AirspacesListTestComponent />);
        expect(screen.getByText("Airspaces")).toBeVisible();
    });
});
