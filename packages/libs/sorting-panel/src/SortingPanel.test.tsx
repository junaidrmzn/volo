import { useState } from "react";
import { expectToHaveNoA11yViolations, render, screen, userEvent, waitFor } from "@voloiq/testing";
import type { SortingOption, SortingPanelProps } from ".";
import { SortingPanel } from ".";

const SortingPanelWrapper = (overriddenProps: Partial<SortingPanelProps>) => {
    const firstOptions: SortingOption[] = [
        {
            label: "Date",
            id: "DATE",
        },
        {
            label: "Pilot",
            id: "PILOT",
        },
        {
            label: "Aircraft",
            id: "AIRCRAFT",
        },
    ];
    const secondOptions: SortingOption[] = [
        {
            label: "Facebook",
            id: "FACEBOOK",
        },
        {
            label: "Google",
            id: "GOOGLE",
        },
    ];
    const [options, setOptions] = useState(firstOptions);

    return (
        <>
            <SortingPanel
                applyButtonLabel="Apply"
                ascendingLabel="Ascending"
                backButtonAriaLabel="Back"
                cancelButtonLabel="Cancel"
                defaultOption={options[0]!.id}
                defaultOrder="DESC"
                descendingLabel="Descending"
                title="SORT"
                options={options}
                onCancel={() => {}}
                onClose={() => {}}
                onChange={() => {}}
                {...overriddenProps}
            />
            <button type="button" onClick={() => setOptions(secondOptions)}>
                Update options
            </button>
        </>
    );
};

describe("SortingPanel", () => {
    it("can be utilized by a user", () => {
        const handleBack = jest.fn();
        const handleChange = jest.fn();
        render(<SortingPanelWrapper onClose={handleBack} onChange={handleChange} />);
        const backButton = screen.getByRole("button", {
            name: "Back",
        });
        const cancelButton = screen.getByRole("button", {
            name: "Cancel",
        });
        const applyButton = screen.getByRole("button", {
            name: "Apply",
        });

        expect(backButton).toBeEnabled();
        expect(cancelButton).toBeEnabled();
        expect(applyButton).toBeEnabled();

        userEvent.click(screen.getByLabelText("Aircraft"));
        userEvent.click(applyButton);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith({
            selectedOption: "AIRCRAFT",
            selectedOrder: "DESC",
        });

        userEvent.click(screen.getByLabelText("Pilot"));
        userEvent.click(screen.getByLabelText("Ascending"));
        userEvent.click(applyButton);

        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenCalledWith({
            selectedOption: "PILOT",
            selectedOrder: "ASC",
        });
    });

    it("resets the sorting panel when the options are changed", async () => {
        const handleChange = jest.fn();
        render(<SortingPanelWrapper onChange={handleChange} />);

        expect(screen.getByLabelText("Date")).toBeChecked();

        userEvent.click(screen.getByRole("button", { name: "Update options" }));

        await waitFor(() => {
            expect(screen.getByLabelText("Facebook")).toBeChecked();
        });
    });

    it("has no a11y violations", async () => {
        const { container } = render(<SortingPanelWrapper />);

        await expectToHaveNoA11yViolations(container);
    });
});
