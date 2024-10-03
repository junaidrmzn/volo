import { queryHelpers } from "@testing-library/react";

export const getSelectedOptions = (selectInput: HTMLElement) => {
    if (selectInput.getAttribute("role") !== "combobox") {
        throw queryHelpers.getElementError(
            "Could not query select options because the provided element is not a design system select element returned by the getByLabelText API.",
            selectInput
        );
    }
    return [
        ...selectInput.parentNode!.parentNode!.parentNode!.parentNode!.querySelectorAll<HTMLInputElement>(
            "input[type=hidden]"
        ),
    ]
        .map((element) => element.value)
        .filter((element) => element !== "");
};
