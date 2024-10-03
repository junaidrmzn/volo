import { Table, Tbody } from "@volocopter/design-library-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mockedBaseUrl } from "../../../testing/url";
import { mockedRouteOption } from "../../__mocks__/routeOption";
import { anyRouteTemplate } from "../../__mocks__/routeTemplates";
import { RouteTemplateListItem } from "../RouteTemplateListItem";

const queryClient = new QueryClient();

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

const mockRoute = anyRoute();
const mockCreateRouteAsync = jest.fn(() => Promise.resolve({ data: mockRoute }));
const mockDeleteRouteTemplate = jest.fn();
jest.mock("../../../api-hooks", () => ({
    ...jest.requireActual("../../../api-hooks"),
    useCreateRoute: () => ({
        createRouteAsync: mockCreateRouteAsync,
    }),
}));

jest.mock("@voloiq/flight-planning-api/v1", () => ({
    ...jest.requireActual("@voloiq/flight-planning-api/v1"),
    useDeleteRouteTemplate: () => ({
        deleteRouteTemplate: mockDeleteRouteTemplate,
    }),
}));

const mockOnSelectRouteTemplatePreview = jest.fn();
const mockRouteTemplate = anyRouteTemplate();

const RouteTemplateListItemTestComponent = () => (
    <ServiceProvider baseUrl={mockedBaseUrl}>
        <QueryClientProvider client={queryClient}>
            <Table variant="striped" size="xs">
                <Tbody>
                    <RouteTemplateListItem
                        onSelectRouteTemplatePreview={mockOnSelectRouteTemplatePreview}
                        routeTemplate={mockRouteTemplate}
                        isSelected={false}
                        routeOption={mockedRouteOption}
                    />
                </Tbody>
            </Table>
        </QueryClientProvider>
    </ServiceProvider>
);

describe("RouteTemplateListItem", () => {
    test("renders component", () => {
        render(<RouteTemplateListItemTestComponent />);
        expect(screen.getByText(mockRouteTemplate.name)).toBeVisible();
    });

    test("clicking component triggers mockOnSelectRouteTemplatePreview", () => {
        render(<RouteTemplateListItemTestComponent />);
        const routeTemplateButton = screen.getByTestId(`route-template-list-item-${mockRouteTemplate.id}`);
        userEvent.click(routeTemplateButton);
        expect(mockOnSelectRouteTemplatePreview).toHaveBeenCalledTimes(1);
    });

    test("clicking add button triggers mockCreateRouteAsync", () => {
        render(<RouteTemplateListItemTestComponent />);
        const addButton = screen.getByTestId(`add-route-template-to-flight-${mockRouteTemplate.id}`);
        userEvent.click(addButton);
        expect(mockCreateRouteAsync).toHaveBeenCalledTimes(1);
    });

    test("clicking delete button triggers mockDeleteRouteTemplate", () => {
        render(<RouteTemplateListItemTestComponent />);
        const menuButton = screen.getByTestId(`toggle-route-template-item-menu${mockRouteTemplate.id}`);
        userEvent.click(menuButton);

        const deleteRouteButton = screen.getByTestId("route-template-item-menu-delete");
        userEvent.click(deleteRouteButton);

        expect(mockDeleteRouteTemplate).toHaveBeenCalledTimes(1);
    });
});
