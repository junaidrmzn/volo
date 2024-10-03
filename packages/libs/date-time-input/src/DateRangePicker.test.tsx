import { fireEvent, render, screen } from "@testing-library/react";
import { I18nProvider } from "@voloiq/i18n";
import { DateRangePicker } from "./DateRangePicker";
import { DateRangePickerLocaleProvider } from "./DateRangePickerLocaleContext";

describe("DateRangePicker", () => {
    it("shows the calendar in german", async () => {
        const onChange = jest.fn();
        render(
            <I18nProvider>
                <DateRangePickerLocaleProvider currentLanguage="de">
                    <DateRangePicker
                        value={[new Date("1997-03-01 00:00"), new Date("1997-03-01 00:00")]}
                        onChange={onChange}
                    />
                </DateRangePickerLocaleProvider>
            </I18nProvider>
        );
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByLabelText("März 1, 1997")).toBeInTheDocument();
    });

    it("shows the calendar in english", async () => {
        const onChange = jest.fn();
        render(
            <I18nProvider>
                <DateRangePickerLocaleProvider currentLanguage="en">
                    <DateRangePicker
                        value={[new Date("1997-03-01 00:00"), new Date("1997-03-01 00:00")]}
                        onChange={onChange}
                    />
                </DateRangePickerLocaleProvider>
            </I18nProvider>
        );
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByLabelText("March 1, 1997")).toBeInTheDocument();
    });

    it("shows the calendar in english when no language is set", async () => {
        const onChange = jest.fn();
        render(
            <I18nProvider>
                <DateRangePickerLocaleProvider>
                    <DateRangePicker
                        value={[new Date("1997-03-01 00:00"), new Date("1997-03-01 00:00")]}
                        onChange={onChange}
                    />
                </DateRangePickerLocaleProvider>
            </I18nProvider>
        );
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByLabelText("March 1, 1997")).toBeInTheDocument();
    });
});
