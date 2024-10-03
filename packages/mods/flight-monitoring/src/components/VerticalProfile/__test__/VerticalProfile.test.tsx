import { render, screen } from "@voloiq/testing";
import { VerticalProfile } from "../VerticalProfile";

describe("VerticalProfile", () => {
    test("render vertical profile", () => {
        render(<VerticalProfile data={[]} />);
        expect(screen.getByTestId("vertical-profile")).toBeVisible();
    });
});
