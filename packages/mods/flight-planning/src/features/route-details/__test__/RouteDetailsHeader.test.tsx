import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { RouteDetailsHeader } from "../components";

const queryClient = new QueryClient();
const mockRoute = anyRoute();

const mockUnselectRoute = jest.fn();
jest.mock("../../selected-route", () => ({
    ...jest.requireActual("../../selected-route"),
    useSelectedRoute: () => ({
        unselectRoute: mockUnselectRoute,
    }),
}));

const mockCreateRouteTemplate = jest.fn();
const mockDeleteRoute = jest.fn();
const mockEditRouteAsync = jest.fn();
jest.mock("../../../api-hooks", () => ({
    ...jest.requireActual("../../../api-hooks"),
    useCreateRouteTemplate: () => ({
        createRouteTemplate: mockCreateRouteTemplate,
    }),
    useDeleteRoute: () => ({
        deleteRoute: mockDeleteRoute,
    }),
    useEditRoute: () => ({
        editRouteAsync: mockEditRouteAsync,
    }),
}));

const mockOnOpen = jest.fn();
jest.mock("@volocopter/design-library-react", () => ({
    ...jest.requireActual("@volocopter/design-library-react"),
    useDisclosure: () => ({
        isOpen: false,
        onOpen: mockOnOpen,
    }),
}));

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("Route Details Header Test", () => {
    const RouteDetailsHeaderTestComponent = () => {
        return (
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <RouteDetailsHeader route={mockRoute} />
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("RouteDetailsHeader should render", async () => {
        render(<RouteDetailsHeaderTestComponent />);
        const routeNameHeader = await screen.findByText(mockRoute.name);
        expect(routeNameHeader).toBeVisible();
    });

    test("Clicking back should call mockUnselectRoute", async () => {
        render(<RouteDetailsHeaderTestComponent />);
        const backButton = await screen.findByTestId("route-details-back-button");
        userEvent.click(backButton);
        expect(mockUnselectRoute).toHaveBeenCalledTimes(1);
    });

    test("Clicking menu button should open menu", async () => {
        render(<RouteDetailsHeaderTestComponent />);
        expect(await screen.findByTestId("menu-edit-route-name-button")).not.toBeVisible();
        expect(await screen.findByTestId("menu-save-route-as-template-button")).not.toBeVisible();
        expect(await screen.findByTestId("menu-delete-route-button")).not.toBeVisible();

        const menuButton = await screen.findByTestId("route-details-menu-button");
        userEvent.click(menuButton);

        expect(await screen.findByTestId("menu-edit-route-name-button")).toBeVisible();
        expect(await screen.findByTestId("menu-save-route-as-template-button")).toBeVisible();
        expect(await screen.findByTestId("menu-delete-route-button")).toBeVisible();
    });

    test("Clicking edit name button should call mockOnOpen", async () => {
        render(<RouteDetailsHeaderTestComponent />);
        const menuButton = await screen.findByTestId("route-details-menu-button");
        userEvent.click(menuButton);

        const editNameButton = await screen.findByTestId("menu-edit-route-name-button");
        userEvent.click(editNameButton);

        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    test("Clicking save as template button should call mockOnOpen", async () => {
        render(<RouteDetailsHeaderTestComponent />);
        const menuButton = await screen.findByTestId("route-details-menu-button");
        userEvent.click(menuButton);

        const saveAsTemplateButton = await screen.findByTestId("menu-save-route-as-template-button");
        userEvent.click(saveAsTemplateButton);

        expect(mockOnOpen).toHaveBeenCalledTimes(2);
    });

    test("Clicking delete route button should call mockDeleteRoute", async () => {
        render(<RouteDetailsHeaderTestComponent />);
        const menuButton = await screen.findByTestId("route-details-menu-button");
        userEvent.click(menuButton);

        const deleteRouteButton = await screen.findByTestId("menu-delete-route-button");
        userEvent.click(deleteRouteButton);

        expect(mockDeleteRoute).toHaveBeenCalledTimes(1);
    });
});
