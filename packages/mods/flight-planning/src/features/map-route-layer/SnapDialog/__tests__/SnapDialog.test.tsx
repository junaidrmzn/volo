import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { render, screen, userEvent } from "@voloiq/testing";
import { SnapDialog } from "../SnapDialog";

const handleCancel = jest.fn();
const handleBranchOff = jest.fn();
const handleJoinOnwards = jest.fn();

describe("Snap Dialog test", () => {
    it("should render", () => {
        render(
            <SnapDialog
                isOpen
                onCancel={handleCancel}
                onBranchOff={handleBranchOff}
                onJoinOnwards={handleJoinOnwards}
                routeToJoin={anyRoute()}
            />
        );

        expect(screen.getByText("Snap Waypoint")).toBeInTheDocument();
    });

    it("should handle cancel", () => {
        render(
            <SnapDialog
                isOpen
                onCancel={handleCancel}
                onBranchOff={handleBranchOff}
                onJoinOnwards={handleJoinOnwards}
                routeToJoin={anyRoute()}
            />
        );

        const button = screen.getByTestId("snap-dialog-cancel");
        userEvent.click(button);

        expect(handleCancel).toHaveBeenCalled();
    });

    it("should handle branch off", () => {
        render(
            <SnapDialog
                isOpen
                onCancel={handleCancel}
                onBranchOff={handleBranchOff}
                onJoinOnwards={handleJoinOnwards}
                routeToJoin={anyRoute()}
            />
        );

        const button = screen.getByTestId("snap-dialog-branchOff");
        userEvent.click(button);

        expect(handleBranchOff).toHaveBeenCalled();
    });

    it("should handle join onwards", () => {
        render(
            <SnapDialog
                isOpen
                onCancel={handleCancel}
                onBranchOff={handleBranchOff}
                onJoinOnwards={handleJoinOnwards}
                routeToJoin={anyRoute()}
            />
        );

        const button = screen.getByTestId("snap-dialog-joinOnwards");
        userEvent.click(button);

        expect(handleJoinOnwards).toHaveBeenCalled();
    });
});
