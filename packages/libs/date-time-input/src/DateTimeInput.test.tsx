import { render, screen } from "@testing-library/react";
import { I18nProvider } from "@voloiq/i18n";
import { DateTimeInput } from "./DateTimeInput";
import { DateTimeInputLocaleProvider } from "./DateTimeInputLocaleContext";

describe("DateTimeInput", () => {
    it("shows the calendar in german", async () => {
        const onChange = jest.fn();
        render(
            <I18nProvider>
                <DateTimeInputLocaleProvider currentLanguage="de">
                    <DateTimeInput value={new Date("1997-03-01 00:00")} onChange={onChange} mode="date" />
                </DateTimeInputLocaleProvider>
            </I18nProvider>
        );
        expect(screen.getByLabelText("März 1, 1997")).toBeInTheDocument();
    });

    it("shows the calendar in english", async () => {
        const onChange = jest.fn();
        render(
            <I18nProvider>
                <DateTimeInputLocaleProvider currentLanguage="en">
                    <DateTimeInput value={new Date("1997-03-01 00:00")} onChange={onChange} mode="date" />
                </DateTimeInputLocaleProvider>
            </I18nProvider>
        );
        expect(screen.getByLabelText("March 1, 1997")).toBeInTheDocument();
    });

    it("shows the calendar in english when no language is set", async () => {
        const onChange = jest.fn();
        render(
            <I18nProvider>
                <DateTimeInputLocaleProvider>
                    <DateTimeInput value={new Date("1997-03-01 00:00")} onChange={onChange} mode="date" />
                </DateTimeInputLocaleProvider>
            </I18nProvider>
        );
        expect(screen.getByLabelText("March 1, 1997")).toBeInTheDocument();
    });
});
