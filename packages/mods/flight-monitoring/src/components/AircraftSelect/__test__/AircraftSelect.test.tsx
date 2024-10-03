import { fireEvent, render, screen, userEvent } from "@voloiq/testing";
import { AircraftSelect } from "../AircraftSelect";

jest.mock("../hooks", () => {
    const originalModule = jest.requireActual("../hooks");
    return {
        ...originalModule,
        vtolOptions: [
            { value: "TestId1", label: "TestId1" },
            { value: "TestId2", label: "TestId2" },
            { value: "TestId3", label: "TestId3" },
        ],
    };
});

describe("Aircraft Select Test", () => {
    const mockSetSelectedAircraftId = jest.fn();
    it("should render Aircraft Select without crashing", () => {
        render(<AircraftSelect selectedAircraftId={null} setSelectedAircraftId={mockSetSelectedAircraftId} />);
        expect(screen.getByTestId("aircraft-select")).toBeVisible();
        expect(screen.getByText("Select Aircraft...")).toBeVisible();
    });
    it("should display correct selected options", () => {
        render(<AircraftSelect selectedAircraftId="TestId1" setSelectedAircraftId={mockSetSelectedAircraftId} />);
        const selectComponent = screen.getByTestId("aircraft-select");
        expect(selectComponent).toBeVisible();
        expect(screen.getByText("TestId1")).toBeVisible();
    });
    it("should correctly reset selected aircraft Id", async () => {
        render(<AircraftSelect selectedAircraftId="TestId1" setSelectedAircraftId={mockSetSelectedAircraftId} />);
        const selectComponent = screen.getByTestId("aircraft-select");
        expect(selectComponent).toBeDefined();

        fireEvent.click(screen.getByText("TestId1"));
        userEvent.click(screen.getByText("TestId1"));
        await screen.findByText("Deselect");
        fireEvent.click(screen.getByText("Deselect"));
        expect(mockSetSelectedAircraftId).toHaveBeenCalledWith(null);
    });
});
