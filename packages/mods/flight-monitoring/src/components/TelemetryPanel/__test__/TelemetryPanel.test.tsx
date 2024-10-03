import { render, screen } from "@voloiq/testing";
import { TelemetryPanel } from "../TelemetryPanel";

describe("Test TelemetryPanel", () => {
    const renderIt = () => render(<TelemetryPanel data={[]} />);

    it("should render", () => {
        renderIt();
        expect(screen.getByText("Telemetry Data")).toBeInTheDocument();
    });
});
