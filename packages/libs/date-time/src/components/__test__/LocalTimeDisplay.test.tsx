import { render, screen } from "@testing-library/react";
import { TimeZoneProvider } from "../../context";
import type { LocalTimeDisplayProps } from "../LocalTimeDisplay";
import { LocalTimeDisplay } from "../LocalTimeDisplay";

const TestLocalTimeDisplay = (props: LocalTimeDisplayProps) => {
    return (
        <TimeZoneProvider timeZone="Asia/Karachi">
            <LocalTimeDisplay {...props} />
        </TimeZoneProvider>
    );
};

describe("LocalTimeDisplay", () => {
    test("renders label and formatted local time", () => {
        const date = new Date("2023-05-31T00:00:00Z");
        const label = "Local Time";

        render(<TestLocalTimeDisplay label={label} value={date} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText("05:00")).toBeInTheDocument();
        expect(screen.getByText("[local - UTC+5]")).toBeInTheDocument();
    });

    test("renders no value text when value is not provided", () => {
        const noValueText = "No time available";
        const label = "Local Time";

        render(<TestLocalTimeDisplay label={label} noValueText={noValueText} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(noValueText)).toBeInTheDocument();
    });
});
