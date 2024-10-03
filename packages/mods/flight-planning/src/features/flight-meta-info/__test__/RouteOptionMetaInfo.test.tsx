import { QueryClient, QueryClientProvider } from "react-query";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { createMockedRouteOption } from "../../__mocks__/routeOption";
import { RouteOptionMetaInfo } from "../RouteOptionMetaInfo";

const queryClient = new QueryClient();

const mockNavigate = jest.fn();
jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        routeOptionId: 1,
    }),
    useNavigate: () => {
        return mockNavigate;
    },
}));

const mockNewRouteOption = createMockedRouteOption({ id: 2 });
const mockEditRouteOptionAsync = jest.fn(() => Promise.resolve(mockNewRouteOption));
jest.mock("../../../api-hooks", () => ({
    ...jest.requireActual("../../../api-hooks"),
    useEditRouteOption: () => ({
        editRouteOptionAsync: mockEditRouteOptionAsync,
    }),
}));

const RouteOptionMetaInfoTestComponent = () => (
    <ServiceProvider baseUrl={mockedBaseUrl}>
        <QueryClientProvider client={queryClient}>
            <RouteOptionMetaInfo />
        </QueryClientProvider>
    </ServiceProvider>
);

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("FlightMetaInfo", () => {
    it("check whether header exists", async () => {
        render(<RouteOptionMetaInfoTestComponent />);
        expect(await screen.findByText(mockNewRouteOption.name)).toBeVisible();
    });

    it("clicking back should trigger mockNavigate", () => {
        render(<RouteOptionMetaInfoTestComponent />);
        const backButton = screen.getByTestId("flight-meta-info-back-button");
        userEvent.click(backButton);
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate.mock.calls[0][0]).toEqual("../route-options/1");
    });
});
