import { QueryClient, QueryClientProvider } from "react-query";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mockedBaseUrl } from "../../../testing/url";
import { mockedRouteOption } from "../../__mocks__/routeOption";
import { anyRouteTemplate } from "../../__mocks__/routeTemplates";
import { RouteTemplateList } from "../RouteTemplateList";

const queryClient = new QueryClient();

const mockHandleClose = jest.fn();
const mockOnChangeView = jest.fn();
const mockRouteTemplates = [anyRouteTemplate({ id: 1 }), anyRouteTemplate({ id: 2 }), anyRouteTemplate({ id: 3 })];

const RouteTemplateListTestComponent = () => (
    <ServiceProvider baseUrl={mockedBaseUrl}>
        <QueryClientProvider client={queryClient}>
            <RouteTemplateList
                filterSet={{ filters: [] }}
                handleClose={mockHandleClose}
                handleSetFilter={jest.fn()}
                onChangeView={mockOnChangeView}
                onSelectRouteTemplatePreview={jest.fn()}
                routeTemplatesAtoB={mockRouteTemplates}
                previewedTemplate={mockRouteTemplates[0]}
                routeOption={mockedRouteOption}
            />
        </QueryClientProvider>
    </ServiceProvider>
);

describe("RouteTemplateList", () => {
    test("renders component", () => {
        render(<RouteTemplateListTestComponent />);
        expect(screen.getByText("Route Template List")).toBeVisible();
        expect(screen.getByTestId("route-templates-close-button")).toBeVisible();
        expect(screen.getByTestId("route-templates-sort-button")).toBeVisible();
        expect(screen.getByTestId("route-templates-filter-button")).toBeVisible();
        expect(screen.getAllByTestId("route-template-list-item-", { exact: false })).toHaveLength(3);
    });

    test("clicking filter button triggers mockOnChangeView", () => {
        render(<RouteTemplateListTestComponent />);
        const filterButton = screen.getByTestId("route-templates-filter-button");
        userEvent.click(filterButton);
        expect(mockOnChangeView).toHaveBeenCalledTimes(1);
    });

    test("clicking sort button triggers mockOnChangeView", () => {
        render(<RouteTemplateListTestComponent />);
        const sortButton = screen.getByTestId("route-templates-filter-button");
        userEvent.click(sortButton);
        expect(mockOnChangeView).toHaveBeenCalledTimes(2);
    });

    test("clicking close button triggers mockHandleClose", () => {
        render(<RouteTemplateListTestComponent />);
        const closeButton = screen.getByTestId("route-templates-close-button");
        userEvent.click(closeButton);
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });
});
