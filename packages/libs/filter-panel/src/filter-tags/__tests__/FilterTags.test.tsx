import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import type { FilterSet } from "../../filter-panel";
import { FilterTags } from "../FilterTags";

type Log = {
    id: string;
    date: string;
    fcSoftware: string;
    remarks?: string;
    isBenchTest: boolean;
    createdOn: string;
    modifiedOn: string;
};

const filterSet: FilterSet<Log> = {
    filters: [
        {
            type: "select",
            propertyName: "fcSoftware",
            value: {
                label: "VC",
                value: "VC",
            },
            isActive: true,
            displayName: "FC Software",
        },
    ],
};

test("User can see and delete filter tags", async () => {
    const onFilterDelete = jest.fn();

    render(
        <FilterTags allowDelete filterSet={filterSet} onFilterDelete={onFilterDelete} listAriaLabel="Filter Tag List" />
    );

    const filterTagList = screen.getByRole("list", { name: "Filter Tag List" });
    expect(within(filterTagList).getByText(/fc software: vc/i)).toBeVisible();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    userEvent.click(within(filterTagList).getAllByRole("button", { name: "close" })[0] as HTMLButtonElement);

    expect(onFilterDelete).toHaveBeenCalledWith(
        { filters: filterSet.filters.filter((filter) => filter.propertyName !== "fcSoftware") },
        filterSet.filters.find((filter) => filter.propertyName === "fcSoftware")
    );
});

test("Filter tags have no a11y violations", async () => {
    const { container } = render(
        <FilterTags allowDelete filterSet={filterSet} onFilterDelete={() => {}} listAriaLabel="Filter Tag List" />
    );

    const filterTagList = await screen.findByRole("list", { name: "Filter Tag List" });
    expect(within(filterTagList).getByText(/fc software: vc/i)).toBeVisible();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
