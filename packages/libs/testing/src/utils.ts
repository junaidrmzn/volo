import { act, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import { axe } from "jest-axe";
import { toLocalDate } from "@voloiq/utils";

export const actAndGet = async <T extends {} | undefined>(callback: () => Promise<T>) => {
    let result: T | undefined;
    await act(async () => {
        result = await callback();
    });
    return result;
};

export const expectToHaveNoA11yViolations = async (container: HTMLElement) => {
    const results = await actAndGet(() => axe(container));
    expect(results).toHaveNoViolations();
};

export const selectDate = (
    datePickerInputElement: HTMLElement,
    date: Date,
    customDateAriaLabelFormatter?: (date: Date) => string
) => {
    const finalDate = toLocalDate(date);
    const dateAriaLabel = customDateAriaLabelFormatter
        ? customDateAriaLabelFormatter(finalDate)
        : format(finalDate, "LLLL d, yyyy");

    userEvent.click(datePickerInputElement);

    const datePickerElement = document.body.querySelector<HTMLElement>(".flatpickr-calendar.open");

    const monthDropdown = within(datePickerElement!).getByRole<HTMLSelectElement>("combobox", { name: "Month" });
    const monthValue = String(date.getMonth());

    const yearInput = within(datePickerElement!).getByRole("spinbutton", { name: "Year" });
    const yearValue = String(finalDate.getFullYear());

    fireEvent.change(yearInput, { target: { value: yearValue } });

    userEvent.selectOptions(monthDropdown, monthValue);

    const dateElement = within(datePickerElement!).getByLabelText(dateAriaLabel, {
        exact: false,
    });

    userEvent.click(dateElement);
};

export const selectDateTime = (
    datePickerInputElement: HTMLElement,
    date: Date,
    customDateAriaLabelFormatter?: (date: Date) => string
) => {
    selectDate(datePickerInputElement, date, customDateAriaLabelFormatter);

    const datePickerElement = document.body.querySelector<HTMLElement>(".flatpickr-calendar.open");
    const hourElement = within(datePickerElement!).getByLabelText("Hour");
    const minuteElement = within(datePickerElement!).getByLabelText("Minute");

    const finalDate = toLocalDate(date);
    userEvent.type(hourElement, String(finalDate.getHours()).padStart(2, "0"));
    userEvent.type(minuteElement, String(finalDate.getMinutes()).padStart(2, "0"));
};
