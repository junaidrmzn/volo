import { QueryClient, QueryClientProvider } from "react-query";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedTileUrl } from "../../../testing/url";
import { VfrList } from "../VfrList";
import { mockedVfrList } from "../__mocks__/vfrlist";
import type { VfrLayer } from "../types";

const mockCloseSidebar = jest.fn();

const mockhandleVfrLayerSelection = jest.fn();

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({ flightId: 1 }),
    useOutletContext: () => ({
        closeRightSidebar: mockCloseSidebar,
    }),
}));

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

const VfrListTestComponent = () => {
    const queryClient = new QueryClient();
    return (
        <ServiceProvider baseUrl={mockedTileUrl}>
            <QueryClientProvider client={queryClient}>
                <VfrList
                    selectedVfrLayers={[]}
                    handleVfrLayerSelection={mockhandleVfrLayerSelection}
                    vfrLayersList={mockedVfrList}
                    closeRightSidebar={mockCloseSidebar}
                />
            </QueryClientProvider>
        </ServiceProvider>
    );
};

describe("VfrLayer tests", () => {
    test("should show 'No Entries' message when no maps are available", () => {
        const emptyVfrList: VfrLayer[] = [];
        const queryClient = new QueryClient();
        render(
            <ServiceProvider baseUrl={mockedTileUrl}>
                <QueryClientProvider client={queryClient}>
                    <VfrList
                        selectedVfrLayers={[]}
                        handleVfrLayerSelection={mockhandleVfrLayerSelection}
                        vfrLayersList={emptyVfrList}
                        closeRightSidebar={mockCloseSidebar}
                    />
                </QueryClientProvider>
            </ServiceProvider>
        );
        expect(
            screen.getByText("No VfrMap entries were found. Please use the upload function below to add a new entry.")
        ).toBeVisible();
    });

    test("should show heading", () => {
        render(<VfrListTestComponent />);
        expect(screen.getByText("Aeronautical maps")).toBeVisible();
    });

    test("should show mocked map entries, checkboxes and selectmenu", () => {
        render(<VfrListTestComponent />);
        const uploadButton = screen.getByRole("button", { name: "Select file" });
        const checkBoxes = screen.getAllByRole("checkbox");
        const selectMenu = screen.getByRole("combobox");
        expect(selectMenu).toBeVisible();
        expect(uploadButton).toBeVisible();
        expect(checkBoxes).toHaveLength(2);
        expect(screen.getByText("LF AD 2 LFFE VAC en MaptilerDesktopRendering")).toBeVisible();
        expect(screen.getByText("LF AD 2 LFFE VAC en untransparent")).toBeVisible();
    });

    test("checkbox click should change selected map", async () => {
        render(<VfrListTestComponent />);
        const checkboxes = screen.getAllByRole("checkbox", { checked: false });
        expect(checkboxes[0]).not.toHaveProperty("checked", true);
        if (checkboxes[0]) {
            await userEvent.click(checkboxes[0]);
            expect(mockhandleVfrLayerSelection).toHaveBeenCalled();
        }
    });

    test("should show delete modal", async () => {
        render(<VfrListTestComponent />);
        const deleteButton = screen.getByLabelText("vfr-map-delete-button-17a20536-d38a-4bb7-b94d-25edd3963518");
        userEvent.click(deleteButton);
        const deleteModalText = screen.getByText("Are you sure that you want to delete this map");
        expect(deleteModalText).toBeInTheDocument();
        const modalDeleteModal = screen.getByRole("button", { name: "Delete" });
        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        expect(cancelButton).toBeInTheDocument();
        expect(modalDeleteModal).toBeInTheDocument();
    });

    test("close button should fire click close event", () => {
        render(<VfrListTestComponent />);
        const closeButton = screen.getByRole("button", { name: "close" });
        userEvent.click(closeButton);
        expect(mockCloseSidebar).toHaveBeenCalled();
    });
});
