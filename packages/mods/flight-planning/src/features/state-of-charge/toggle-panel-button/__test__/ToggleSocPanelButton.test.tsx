import { render, screen, userEvent } from "@voloiq/testing";
import { ToggleSocPanelButton } from "../ToggleSocPanelButton";

const handleClick = jest.fn();
describe("ToggleSocPanelButton test", () => {
    test("should show ToggleSocPanelButton", () => {
        render(<ToggleSocPanelButton handleClick={handleClick} isActive disabled={false} />);
        expect(screen.getByTestId("toggle-state-of-charge-panel")).toBeVisible();
    });

    test("should fire click event", () => {
        render(<ToggleSocPanelButton handleClick={handleClick} isActive disabled={false} />);
        const button = screen.getByTestId("toggle-state-of-charge-panel");
        userEvent.click(button);

        expect(handleClick).toHaveBeenCalled();
    });
});
