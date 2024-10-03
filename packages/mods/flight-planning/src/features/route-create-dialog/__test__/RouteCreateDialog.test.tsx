import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { RouteCreateDialog } from "../components";

const queryClient = new QueryClient();

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

const mockSelectRoute = jest.fn();
jest.mock("../../selected-route", () => ({
    ...jest.requireActual("../../selected-route"),
    useSelectedRoute: () => ({
        selectRoute: mockSelectRoute,
    }),
}));

const mockRoute = anyRoute();
const mockHandleRefocusCallback = jest.fn();
const mockCreateRouteAsync = jest.fn(() => {
    mockHandleRefocusCallback();
    return Promise.resolve({ data: mockRoute });
});

jest.mock("../../../api-hooks", () => ({
    ...jest.requireActual("../../../api-hooks"),
    useCreateRoute: () => ({
        createRouteAsync: mockCreateRouteAsync,
    }),
}));

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

const mockRoutes = [anyRoute(), anyRoute()];
const mockHandleCloseCreateDialog = jest.fn();
const mockToggleRouteTemplateList = jest.fn();

describe("Route Create Dialog Test", () => {
    const RouteCreateDialogTestComponent = () => {
        return (
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <RouteCreateDialog
                        routes={mockRoutes}
                        resetRouteTemplatePreview={jest.fn()}
                        handleCloseCreateDialog={mockHandleCloseCreateDialog}
                        toggleRouteTemplateList={mockToggleRouteTemplateList}
                        handleRefocusCallback={mockHandleRefocusCallback}
                    />
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("clicking back should trigger mockHandleCloseCreateDialog", async () => {
        render(<RouteCreateDialogTestComponent />);
        const backButton = await screen.findByTestId("route-create-dialog-back-button");
        userEvent.click(backButton);
        expect(mockHandleCloseCreateDialog).toHaveBeenCalledTimes(1);
    });

    test("clicking create route should trigger mockCreateRouteAsync", async () => {
        render(<RouteCreateDialogTestComponent />);
        const createRouteButton = await screen.findByTestId("route-create-button");
        userEvent.click(createRouteButton);
        expect(mockCreateRouteAsync).toHaveBeenCalledTimes(1);
        expect(mockHandleRefocusCallback).toHaveBeenCalledTimes(1);
    });

    test("clicking from template should trigger mockToggleRouteTemplateList", async () => {
        render(<RouteCreateDialogTestComponent />);
        const fromTemplateButton = await screen.findByTestId("route-create-from-template-button");
        userEvent.click(fromTemplateButton);
        expect(mockToggleRouteTemplateList).toHaveBeenCalledTimes(1);
    });
});
