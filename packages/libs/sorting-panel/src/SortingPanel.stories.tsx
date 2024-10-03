import type { Meta, StoryFn } from "@storybook/react";
import type { SortingOption } from ".";
import { SortingPanel } from ".";

const meta: Meta = {
    title: "Sorting Panel/Sorting Panel",
    component: SortingPanel,
};
export default meta;

export const Basic: StoryFn = () => {
    const options: SortingOption[] = [
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

    return (
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
        />
    );
};
