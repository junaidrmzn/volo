import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TimeZoneProvider } from "../../context";
import { dateToUtcTimeString, getLocaleDate } from "../../utils";
import type { DateTimeDisplayProps } from "../DateTimeDisplay";
import { DateTimeDisplay } from "../DateTimeDisplay";

const timeZone = "Asia/Karachi";

const TestDateTimeDisplay = (props: DateTimeDisplayProps) => {
    return (
        <TimeZoneProvider timeZone={timeZone}>
            <DateTimeDisplay {...props} />
        </TimeZoneProvider>
    );
};

describe("DateTimeDisplay", () => {
    test("renders label and formatted date time with timeZone", async () => {
        const date = new Date("2023-05-31T00:00:00Z");
        const label = "Date";

        render(<TestDateTimeDisplay mode="datetime" label={label} value={date} />);

        const localDate = getLocaleDate(date, timeZone);
        const utcTime = dateToUtcTimeString(localDate);
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(`2023-05-31 ${utcTime}`)).toBeInTheDocument();
        expect(screen.getByText("[UTC]")).toBeInTheDocument();
        const infoButton = screen.getByLabelText("info");
        expect(infoButton).toBeInTheDocument();
        fireEvent.mouseOver(infoButton);
        await waitFor(() => expect(screen.getByRole("tooltip")).toBeVisible());
        expect(screen.getByText("05:00")).toBeInTheDocument();
        expect(screen.getByText("[local - UTC+5]")).toBeInTheDocument();
    });

    test("renders label and formatted date time", () => {
        const date = new Date("2023-05-31T00:00:00Z");
        const label = "Date";

        render(
            <TestDateTimeDisplay
                mode="datetime"
                label={label}
                value={date}
                withUtcTime={false}
                showTimeZone={false}
                showTooltip={false}
            />
        );

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText("2023-05-31 05:00")).toBeInTheDocument();
    });

    test("renders label and formatted date", () => {
        const date = new Date("2023-05-31T00:00:00Z");
        const label = "Date";

        render(<TestDateTimeDisplay mode="date" label={label} value={date} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText("2023-05-31")).toBeInTheDocument();
    });

    test("renders label and formatted time", () => {
        const date = new Date("2023-05-31T00:00:00Z");
        const label = "Date";

        render(<TestDateTimeDisplay mode="time" label={label} value={date} />);
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText("05:00")).toBeInTheDocument();
    });

    test("renders no value text when value is not provided", () => {
        const noValueText = "No date available";
        const label = "Date";

        render(<TestDateTimeDisplay mode="date" label={label} noValueText={noValueText} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(noValueText)).toBeInTheDocument();
    });
});
