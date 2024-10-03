import { render } from "@voloiq/testing";
import { BirdMarker } from "../BirdMarker";

describe("Bird Marker Test", () => {
    it("should render flying Bird Marker without crashing", () => {
        render(<BirdMarker coords={[0, 0]} type="flying" />);
    });
    it("should render standing Bird Marker without crashing", () => {
        render(<BirdMarker coords={[0, 0]} type="standing" />);
    });
});
